// BSE F&O BhavCopy fetcher — for NSE-vs-BSE market-share comparison.
// ---------------------------------------------------------------------------
// BSE serves its derivatives BhavCopy as a plain (uncompressed) .CSV in the same
// UDiFF layout as NSE, on its own origin, so a same-origin in-page fetch works
// (no download/zip needed). UDiFF-format files exist from ~Jul 2024 onward —
// which is also when BSE's index-options share took off, so this window captures
// the market-share story. (BSE index derivatives relaunched May 2023; earlier
// BSE turnover was small and only in a legacy format.)
//
// Writes: scripts/nse/data/raw/bse/bse_YYYYMMDD.csv  (month-end trading day)
//
// Usage:
//   node scripts/nse/fetch-bse-bhavcopy.mjs [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--daily]
//   npm run bse:fetch -- --from 2024-06-01
// ---------------------------------------------------------------------------

import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'data', 'raw', 'bse')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const pad = (n) => String(n).padStart(2, '0')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const resolveChromium = () =>
  process.env.PW_CHROMIUM ||
  (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined)

function parseArgs(a) {
  const o = { daily: false }
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--from') o.from = a[++i]
    else if (a[i] === '--to') o.to = a[++i]
    else if (a[i] === '--daily') o.daily = true
  }
  const to = o.to ? new Date(o.to) : new Date()
  // default: from Jun 2024 (first month with UDiFF BhavCopy)
  const from = o.from ? new Date(o.from) : new Date('2024-06-01')
  return { from, to, daily: o.daily }
}

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
    let last = new Date(d.getFullYear(), d.getMonth() + 1, 0)
    if (last > to) last = new Date(to)
    dates.push(last)
    d.setMonth(d.getMonth() + 1)
  }
  return dates
}

const foUrl = (d) =>
  `https://www.bseindia.com/download/BhavCopy/Derivative/BhavCopy_BSE_FO_0_0_0_${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_F_0000.CSV`

async function main() {
  const { from, to, daily } = parseArgs(process.argv.slice(2))
  fs.mkdirSync(OUT, { recursive: true })
  const dates = targets(from, to, daily)
  console.log(
    `BSE F&O BhavCopy fetch: ${from.toISOString().slice(0, 10)} → ${to.toISOString().slice(0, 10)} ` +
      `(${dates.length} ${daily ? 'weekdays' : 'month-ends'})`,
  )

  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined
  const browser = await chromium.launch({
    executablePath: resolveChromium(),
    proxy,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  })
  const ctx = await browser.newContext({ userAgent: UA, locale: 'en-US' })
  const page = await ctx.newPage()
  const warmup = async () => {
    try {
      await page.goto('https://www.bseindia.com/', { waitUntil: 'domcontentloaded', timeout: 45000 })
      await sleep(2500)
    } catch {}
  }
  await warmup()

  // same-origin in-page fetch returns the CSV text directly
  const getCsv = (url) =>
    page.evaluate(async (u) => {
      try {
        const r = await fetch(u, { headers: { Accept: '*/*' } })
        const t = await r.text()
        return { status: r.status, text: t }
      } catch (e) {
        return { error: String(e) }
      }
    }, url)

  const stats = { ok: 0, cached: 0, miss: 0 }
  for (const target of dates) {
    let got = false
    for (let back = 0; back < 6 && !got; back++) {
      const d = new Date(target)
      d.setDate(d.getDate() - back)
      if (d.getDay() === 0 || d.getDay() === 6) continue
      const dest = path.join(OUT, `bse_${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}.csv`)
      if (fs.existsSync(dest)) { stats.cached++; got = true; break }
      const r = await getCsv(foUrl(d))
      await sleep(500 + Math.random() * 400)
      if (r.text && r.text.startsWith('TradDt')) {
        fs.writeFileSync(dest, r.text)
        stats.ok++
        got = true
      }
    }
    if (!got) stats.miss++
    process.stdout.write(`\r  ok=${stats.ok} cached=${stats.cached} miss=${stats.miss}   `)
  }

  await browser.close()
  console.log(`\nDone. downloaded=${stats.ok} cached=${stats.cached} missed=${stats.miss}`)
  console.log(`CSVs in ${path.relative(process.cwd(), OUT)}. Next: node scripts/nse/build-dataset.mjs`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
