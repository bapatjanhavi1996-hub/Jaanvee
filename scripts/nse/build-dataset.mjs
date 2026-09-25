// Parse raw NSE participant CSVs into tidy + aggregated datasets.
// ---------------------------------------------------------------------------
// Reads:  scripts/nse/data/raw/fao_participant_{vol,oi}_DDMMYYYY.csv
// Writes: scripts/nse/data/participant-daily.json   (one row per day/participant)
//         scripts/nse/data/participant-monthly.json (monthly averages + shares)
//
// Each daily source row is Client / DII / FII / Pro / TOTAL with 6 instruments
// (Future Index, Future Stock, Option Index Call/Put, Option Stock Call/Put),
// long & short, measured in NUMBER OF CONTRACTS (volume, not rupee value).
//
// Usage: node scripts/nse/build-dataset.mjs
// ---------------------------------------------------------------------------

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW_DIR = path.join(__dirname, 'data', 'raw')
const OUT_DIR = path.join(__dirname, 'data')

// column index (0-based) after the "Client Type" label column
const INSTRUMENTS = {
  futureIndex: { long: 1, short: 2 },
  futureStock: { long: 3, short: 4 },
  optionIndexCall: { long: 5, short: 7 },
  optionIndexPut: { long: 6, short: 8 },
  optionStockCall: { long: 9, short: 11 },
  optionStockPut: { long: 10, short: 12 },
  total: { long: 13, short: 14 },
}
const PARTICIPANTS = ['Client', 'DII', 'FII', 'Pro']

const num = (s) => {
  const n = Number(String(s ?? '').replace(/[",\s]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function parseCsv(text) {
  // simple splitter — these files have no quoted commas inside data rows
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length)
  const rows = {}
  for (const line of lines) {
    const cells = line.split(',')
    const label = (cells[0] || '').replace(/"/g, '').trim()
    if (PARTICIPANTS.includes(label) || label === 'TOTAL') rows[label] = cells
  }
  return rows
}

// DDMMYYYY -> YYYY-MM-DD
const isoFromTag = (t) => `${t.slice(4, 8)}-${t.slice(2, 4)}-${t.slice(0, 2)}`

function collect(report) {
  const byDate = {}
  const files = fs
    .readdirSync(RAW_DIR)
    .filter((f) => f.startsWith(`fao_participant_${report}_`) && f.endsWith('.csv'))
  for (const f of files) {
    const tag = f.slice(`fao_participant_${report}_`.length, -4)
    const text = fs.readFileSync(path.join(RAW_DIR, f), 'utf8')
    if (/Access Denied/.test(text)) continue
    const rows = parseCsv(text)
    if (!rows.TOTAL) continue
    byDate[isoFromTag(tag)] = rows
  }
  return byDate
}

function toRecord(cells) {
  const rec = {}
  let grossLong = 0
  let grossShort = 0
  for (const [inst, ix] of Object.entries(INSTRUMENTS)) {
    const long = num(cells[ix.long])
    const short = num(cells[ix.short])
    rec[inst] = { long, short }
    if (inst !== 'total') {
      grossLong += long
      grossShort += short
    }
  }
  rec.grossLong = grossLong
  rec.grossShort = grossShort
  return rec
}

function main() {
  if (!fs.existsSync(RAW_DIR)) {
    console.error(`No raw dir at ${RAW_DIR}. Run fetch-participant-data.mjs first.`)
    process.exit(1)
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const vol = collect('vol')
  const oi = collect('oi')
  const dates = [...new Set([...Object.keys(vol), ...Object.keys(oi)])].sort()

  const daily = []
  for (const date of dates) {
    const entry = { date, vol: {}, oi: {} }
    for (const report of ['vol', 'oi']) {
      const src = report === 'vol' ? vol[date] : oi[date]
      if (!src) continue
      const total = toRecord(src.TOTAL).total
      const denom = total.long || 1 // total long == total short in these files
      for (const p of PARTICIPANTS) {
        if (!src[p]) continue
        const rec = toRecord(src[p])
        rec.share = +((rec.total.long / denom) * 100).toFixed(2) // % of day's contracts
        rec.net = rec.total.long - rec.total.short // net long (+) / short (-)
        entry[report][p] = rec
      }
      entry[report].TOTAL = { total }
    }
    daily.push(entry)
  }

  // Monthly aggregation: average daily contracts per participant + avg share.
  const monthly = {}
  for (const d of daily) {
    const ym = d.date.slice(0, 7)
    for (const report of ['vol', 'oi']) {
      for (const p of PARTICIPANTS) {
        const rec = d[report][p]
        if (!rec) continue
        const key = `${ym}|${report}|${p}`
        const m = (monthly[key] ??= {
          month: ym,
          report,
          participant: p,
          days: 0,
          sumContracts: 0,
          sumShare: 0,
          sumNet: 0,
        })
        m.days++
        m.sumContracts += rec.total.long + rec.total.short
        m.sumShare += rec.share
        m.sumNet += rec.net
      }
    }
  }
  const monthlyArr = Object.values(monthly)
    .map((m) => ({
      month: m.month,
      report: m.report,
      participant: m.participant,
      days: m.days,
      avgContracts: Math.round((m.sumContracts / m.days) || 0),
      avgSharePct: +(m.sumShare / m.days).toFixed(2),
      avgNet: Math.round((m.sumNet / m.days) || 0),
    }))
    .sort((a, b) => a.month.localeCompare(b.month) || a.report.localeCompare(b.report))

  fs.writeFileSync(path.join(OUT_DIR, 'participant-daily.json'), JSON.stringify(daily))
  fs.writeFileSync(
    path.join(OUT_DIR, 'participant-monthly.json'),
    JSON.stringify(monthlyArr, null, 0),
  )

  console.log(`Parsed ${daily.length} trading days (${dates[0]} → ${dates.at(-1) ?? 'n/a'}).`)
  console.log(`Wrote participant-daily.json and participant-monthly.json to ${path.relative(process.cwd(), OUT_DIR)}`)
}

main()
