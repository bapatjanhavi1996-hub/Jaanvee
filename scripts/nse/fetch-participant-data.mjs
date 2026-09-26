// NSE participant-wise F&O activity fetcher
// ---------------------------------------------------------------------------
// Downloads NSE's daily "Participant wise Trading Volume" and "Participant wise
// Open Interest" reports (equity derivatives), plus the FII value stats report,
// over a date range (default: last 5 years).
//
// Why a real browser? NSE's archive host (nsearchives.nseindia.com) sits behind
// Akamai bot protection. Plain curl/fetch get "Access Denied". A real Chromium
// session that (a) warms up Akamai cookies and (b) lets the CSV arrive as a file
// *download* gets through. See scripts/nse/README.md for the full story.
//
// Output (raw, git-ignored):
//   scripts/nse/data/raw/fao_participant_vol_DDMMYYYY.csv
//   scripts/nse/data/raw/fao_participant_oi_DDMMYYYY.csv
//   scripts/nse/data/raw/fii_stats_DD-Mon-YYYY.xls   (--with-fii)
//
// Usage:
//   node scripts/nse/fetch-participant-data.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD]
//                                               [--with-fii] [--limit N]
//   npm run nse:fetch -- --from 2020-01-01
//
// Env:
//   PW_CHROMIUM   path to a Chromium executable (defaults to Playwright's own,
//                 or /opt/pw-browsers/chromium if present)
// ---------------------------------------------------------------------------

import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW_DIR = path.join(__dirname, 'data', 'raw')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parseArgs(argv) {
  const args = { withFii: false, limit: Infinity }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--from') args.from = argv[++i]
    else if (a === '--to') args.to = argv[++i]
    else if (a === '--with-fii') args.withFii = true
    else if (a === '--limit') args.limit = Number(argv[++i])
  }
  const to = args.to ? new Date(args.to) : new Date()
  const from = args.from
    ? new Date(args.from)
    : new Date(new Date().setFullYear(to.getFullYear() - 5))
  return { from, to, withFii: args.withFii, limit: args.limit }
}

function resolveChromium() {
  if (process.env.PW_CHROMIUM) return process.env.PW_CHROMIUM
  if (fs.existsSync('/opt/pw-browsers/chromium')) return '/opt/pw-browsers/chromium'
  return undefined // let Playwright resolve its bundled browser
}

// Iterate weekdays (Mon-Fri) from `from` to `to`, inclusive. NSE holidays are
// not enumerated — those days simply 404/deny and are skipped.
function* weekdays(from, to) {
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  const end = new Date(to)
  end.setHours(0, 0, 0, 0)
  while (d <= end) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) yield new Date(d)
    d.setDate(d.getDate() + 1)
  }
}

const ddmmyyyy = (d) =>
  `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}${d.getFullYear()}`
const ddMonYYYY = (d) =>
  `${String(d.getDate()).padStart(2, '0')}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const { from, to, withFii, limit } = parseArgs(process.argv.slice(2))
  fs.mkdirSync(RAW_DIR, { recursive: true })

  const days = [...weekdays(from, to)]
  console.log(
    `NSE participant fetch: ${from.toISOString().slice(0, 10)} → ${to.toISOString().slice(0, 10)} ` +
      `(${days.length} weekdays)${withFii ? ' +FII value' : ''}`,
  )

  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined
  const browser = await chromium.launch({
    executablePath: resolveChromium(),
    proxy,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  })
  const ctx = await browser.newContext({
    userAgent: UA,
    locale: 'en-US',
    viewport: { width: 1366, height: 768 },
    acceptDownloads: true,
  })
  const page = await ctx.newPage()

  const warmup = async () => {
    try {
      await page.goto('https://nsearchives.nseindia.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 40000,
      })
      await sleep(2500)
    } catch {
      /* Akamai serves a 404 shell on the root; cookies still get set. */
    }
  }
  await warmup()

  // Navigate to a file URL and capture it if the server serves a download.
  const grab = async (url, dest) => {
    if (fs.existsSync(dest)) return 'cached'
    const [dl] = await Promise.all([
      page.waitForEvent('download', { timeout: 20000 }).catch(() => null),
      page.goto(url, { timeout: 30000 }).catch(() => null),
    ])
    if (!dl) return 'blocked' // Access Denied / 404 / holiday
    await dl.saveAs(dest)
    return 'ok'
  }

  let done = 0
  let sinceWarmup = 0
  const stats = { ok: 0, cached: 0, blocked: 0 }

  for (const d of days) {
    if (done >= limit) break
    const tag = ddmmyyyy(d)
    const jobs = [
      {
        url: `https://nsearchives.nseindia.com/content/nsccl/fao_participant_vol_${tag}.csv`,
        dest: path.join(RAW_DIR, `fao_participant_vol_${tag}.csv`),
      },
      {
        url: `https://nsearchives.nseindia.com/content/nsccl/fao_participant_oi_${tag}.csv`,
        dest: path.join(RAW_DIR, `fao_participant_oi_${tag}.csv`),
      },
    ]
    if (withFii) {
      const t2 = ddMonYYYY(d)
      jobs.push({
        url: `https://nsearchives.nseindia.com/content/fo/fii_stats_${t2}.xls`,
        dest: path.join(RAW_DIR, `fii_stats_${t2}.xls`),
      })
    }

    let anyBlocked = false
    for (const j of jobs) {
      let res = await grab(j.url, j.dest)
      // One retry with a fresh warmup if the session went stale.
      if (res === 'blocked') {
        await warmup()
        sinceWarmup = 0
        res = await grab(j.url, j.dest)
      }
      stats[res] = (stats[res] || 0) + 1
      if (res === 'blocked') anyBlocked = true
      sinceWarmup++
      await sleep(600 + Math.random() * 600) // be polite / dodge rate limits
      if (sinceWarmup >= 120) {
        await warmup()
        sinceWarmup = 0
      }
    }

    done++
    const mark = anyBlocked ? '·' : '✓'
    if (done % 20 === 0 || anyBlocked) {
      process.stdout.write(
        `\r${mark} ${d.toISOString().slice(0, 10)}  ok=${stats.ok} cached=${stats.cached} blocked=${stats.blocked}   `,
      )
    }
  }

  await browser.close()
  console.log(
    `\nDone. downloaded=${stats.ok} cached=${stats.cached} blocked/holiday=${stats.blocked}`,
  )
  console.log(`Raw files in ${path.relative(process.cwd(), RAW_DIR)}`)
  console.log('Next: node scripts/nse/build-dataset.mjs')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
