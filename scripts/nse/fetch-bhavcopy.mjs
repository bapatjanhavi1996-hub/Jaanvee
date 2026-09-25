// NSE F&O BhavCopy fetcher — for product-level turnover VALUE (and volume).
// ---------------------------------------------------------------------------
// The participant reports give contracts only. To get rupee turnover by product
// (index/stock futures & options) we use the daily F&O BhavCopy, which lists
// every contract's traded volume and value. By default we fetch the LAST trading
// day of each month over the range (a light ~60-file monthly snapshot); pass
// --daily to fetch every weekday instead (heavy, for true monthly totals).
//
// Two archive formats, picked by date:
//   UDiFF (2024-07-08 onward): content/fo/BhavCopy_NSE_FO_0_0_0_YYYYMMDD_F_0000.csv.zip
//   Legacy (before):           content/historical/DERIVATIVES/YYYY/MON/foDDMONyyyybhav.csv.zip
//
// Usage:
//   node scripts/nse/fetch-bhavcopy.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--daily]
//   npm run nse:bhav -- --from 2020-09-01
// ---------------------------------------------------------------------------

import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'data', 'raw', 'bhav')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const UDIFF_FROM = new Date('2024-07-08') // NSE cutover to UDiFF BhavCopy

function parseArgs(a) {
  const o = { daily: false }
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--from') o.from = a[++i]
    else if (a[i] === '--to') o.to = a[++i]
    else if (a[i] === '--daily') o.daily = true
  }
  const to = o.to ? new Date(o.to) : new Date()
  const from = o.from ? new Date(o.from) : new Date(new Date().setFullYear(to.getFullYear() - 5))
  return { from, to, daily: o.daily }
}
const resolveChromium = () =>
  process.env.PW_CHROMIUM ||
  (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const pad = (n) => String(n).padStart(2, '0')

// URLs to try for a given date (both formats; caller steps back on miss).
function urlsFor(d) {
  const yyyy = d.getFullYear()
  const out = []
  if (d >= UDIFF_FROM) {
    out.push({
      url: `https://nsearchives.nseindia.com/content/fo/BhavCopy_NSE_FO_0_0_0_${yyyy}${pad(d.getMonth() + 1)}${pad(d.getDate())}_F_0000.csv.zip`,
      dest: `udiff_${yyyy}${pad(d.getMonth() + 1)}${pad(d.getDate())}.csv.zip`,
    })
  } else {
    out.push({
      url: `https://nsearchives.nseindia.com/content/historical/DERIVATIVES/${yyyy}/${MON[d.getMonth()]}/fo${pad(d.getDate())}${MON[d.getMonth()]}${yyyy}bhav.csv.zip`,
      dest: `legacy_${yyyy}${pad(d.getMonth() + 1)}${pad(d.getDate())}.csv.zip`,
    })
  }
  return out
}

// Target dates: last trading day of each month, or every weekday with --daily.
function targets(from, to, daily) {
  const dates = []
  if (daily) {
    const d = new Date(from)
    while (d <= to) {
      if (d.getDay() !== 0 && d.getDay() !== 6) dates.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    return dates
  }
  const d = new Date(from.getFullYear(), from.getMonth(), 1)
  while (d <= to) {
    // last day of this month, clamped to `to`
    let last = new Date(d.getFullYear(), d.getMonth() + 1, 0)
    if (last > to) last = new Date(to)
    dates.push(last)
    d.setMonth(d.getMonth() + 1)
  }
  return dates
}

async function main() {
  const { from, to, daily } = parseArgs(process.argv.slice(2))
  fs.mkdirSync(OUT, { recursive: true })
  const dates = targets(from, to, daily)
  console.log(
    `BhavCopy fetch: ${from.toISOString().slice(0, 10)} → ${to.toISOString().slice(0, 10)} ` +
      `(${dates.length} ${daily ? 'weekdays' : 'month-ends'})`,
  )

  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined
  const browser = await chromium.launch({
    executablePath: resolveChromium(),
    proxy,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  })
  const ctx = await browser.newContext({ userAgent: UA, locale: 'en-US', acceptDownloads: true })
  const page = await ctx.newPage()
  const warmup = async () => {
    try {
      await page.goto('https://nsearchives.nseindia.com/', { waitUntil: 'domcontentloaded', timeout: 40000 })
      await sleep(2500)
    } catch {}
  }
  await warmup()

  const grab = async (url, dest) => {
    if (fs.existsSync(dest)) return 'cached'
    const [dl] = await Promise.all([
      page.waitForEvent('download', { timeout: 20000 }).catch(() => null),
      page.goto(url, { timeout: 30000 }).catch(() => null),
    ])
    if (!dl) return 'miss'
    await dl.saveAs(dest)
    return 'ok'
  }

  const stats = { ok: 0, cached: 0, miss: 0 }
  let sinceWarmup = 0
  for (const target of dates) {
    // step back up to 6 days to skip holidays until a file is found
    let got = false
    for (let back = 0; back < 6 && !got; back++) {
      const d = new Date(target)
      d.setDate(d.getDate() - back)
      if (d.getDay() === 0 || d.getDay() === 6) continue
      for (const { url, dest } of urlsFor(d)) {
        const full = path.join(OUT, dest)
        let r = await grab(url, full)
        if (r === 'miss') {
          await warmup()
          sinceWarmup = 0
          r = await grab(url, full)
        }
        sinceWarmup++
        await sleep(500 + Math.random() * 500)
        if (r === 'ok' || r === 'cached') {
          stats[r]++
          got = true
          break
        }
      }
      if (sinceWarmup >= 100) {
        await warmup()
        sinceWarmup = 0
      }
    }
    if (!got) stats.miss++
    process.stdout.write(`\r  ok=${stats.ok} cached=${stats.cached} miss=${stats.miss}   `)
  }

  await browser.close()
  console.log(`\nDone. downloaded=${stats.ok} cached=${stats.cached} missed=${stats.miss}`)
  console.log(`Zips in ${path.relative(process.cwd(), OUT)}. Next: node scripts/nse/build-dataset.mjs`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
