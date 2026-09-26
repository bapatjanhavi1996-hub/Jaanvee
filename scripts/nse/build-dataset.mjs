// Build the consolidated dashboard dataset from all raw NSE sources.
// ---------------------------------------------------------------------------
// Sources (fetched by fetch-participant-data.mjs, fetch-bhavcopy.mjs, and
// parsed by parse-fii-stats.py):
//   1. Participant vol/oi CSVs  -> contracts by participant (Client/FII/DII/Pro)
//      and by product (from the TOTAL row). VOLUME + OI for all four.
//   2. F&O BhavCopy zips         -> product-level turnover VALUE (₹ cr) + volume.
//   3. fii-value-daily.json      -> FII rupee VALUE (₹ cr) by product.
//
// Writes:
//   data/participant-daily.json   (latest-day detail; unchanged shape)
//   data/dashboard-data.json      (monthly series the dashboard loads)
//
// Usage: node scripts/nse/build-dataset.mjs
// ---------------------------------------------------------------------------

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW = path.join(__dirname, 'data', 'raw')
const BHAV = path.join(RAW, 'bhav')
const OUT = path.join(__dirname, 'data')

const PARTS = ['Client', 'FII', 'DII', 'Pro']
const PRODUCTS = ['indexFut', 'stockFut', 'indexOpt', 'stockOpt']
const num = (s) => {
  const n = Number(String(s ?? '').replace(/[",\s]/g, ''))
  return Number.isFinite(n) ? n : 0
}
const ym = (iso) => iso.slice(0, 7)
const isoFromTag = (t) => `${t.slice(4, 8)}-${t.slice(2, 4)}-${t.slice(0, 2)}` // DDMMYYYY

// per-instrument column indices in the participant CSV (after Client Type col)
const INST = {
  indexFut: { long: 1, short: 2 },
  stockFut: { long: 3, short: 4 },
  indexOpt: { long: 5, short: 7, long2: 6, short2: 8 }, // call + put
  stockOpt: { long: 9, short: 11, long2: 10, short2: 12 },
  total: { long: 13, short: 14 },
}

// ---- 1. participant CSVs ---------------------------------------------------
function parsePart(text) {
  const rows = {}
  for (const line of text.split(/\r?\n/)) {
    const cells = line.split(',')
    const label = (cells[0] || '').replace(/"/g, '').trim()
    if (PARTS.includes(label) || label === 'TOTAL') rows[label] = cells
  }
  return rows
}
function prodContracts(cells) {
  // total traded contracts per product for a row = long + short (call+put for options)
  const g = (i) => num(cells[i])
  return {
    indexFut: g(1) + g(2),
    stockFut: g(3) + g(4),
    indexOpt: g(5) + g(6) + g(7) + g(8),
    stockOpt: g(9) + g(10) + g(11) + g(12),
    total: g(13) + g(14),
  }
}
function collectPart(report) {
  const byDate = {}
  if (!fs.existsSync(RAW)) return byDate
  for (const f of fs.readdirSync(RAW)) {
    if (!f.startsWith(`fao_participant_${report}_`) || !f.endsWith('.csv')) continue
    const text = fs.readFileSync(path.join(RAW, f), 'utf8')
    if (/Access Denied/.test(text)) continue
    const rows = parsePart(text)
    if (!rows.TOTAL) continue
    byDate[isoFromTag(f.slice(`fao_participant_${report}_`.length, -4))] = rows
  }
  return byDate
}

// ---- 2. BhavCopy zips (product value + volume) -----------------------------
function parseBhav(csv, format) {
  const acc = { indexFut: { c: 0, v: 0, oi: 0 }, stockFut: { c: 0, v: 0, oi: 0 }, indexOpt: { c: 0, v: 0, oi: 0 }, stockOpt: { c: 0, v: 0, oi: 0 } }
  const lines = csv.split(/\r?\n/)
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue
    const c = lines[i].split(',')
    let prod, contracts, valueCr, oi
    if (format === 'legacy') {
      const map = { FUTIDX: 'indexFut', FUTSTK: 'stockFut', OPTIDX: 'indexOpt', OPTSTK: 'stockOpt' }
      prod = map[c[0]]
      contracts = num(c[10]) // CONTRACTS
      valueCr = num(c[11]) / 100 // VAL_INLAKH (lakh) -> crore
      oi = num(c[12]) // OPEN_INT
    } else {
      const map = { IDF: 'indexFut', STF: 'stockFut', IDO: 'indexOpt', STO: 'stockOpt' }
      prod = map[c[4]]
      contracts = num(c[24]) // TtlTradgVol
      valueCr = num(c[25]) / 1e7 // TtlTrfVal (rupees) -> crore (notional for options)
      oi = num(c[22]) // OpnIntrst
    }
    if (prod) {
      acc[prod].c += contracts
      acc[prod].v += valueCr
      acc[prod].oi += oi
    }
  }
  return acc
}
// NOTE: premium turnover is deliberately NOT derived here. The bhavcopy has no
// per-trade premium field, and on expiry days ClsPric is set to the underlying
// index level for every strike, so a contracts*lot*close proxy explodes. Real
// premium turnover must come from the exchanges' own published figures.

// BSE F&O bhavcopy: plain .csv (UDiFF), one per month-end
function collectBSE() {
  const dir = path.join(RAW, 'bse')
  const byDate = {}
  if (!fs.existsSync(dir)) return byDate
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^bse_(\d{4})(\d{2})(\d{2})\.csv$/)
    if (!m) continue
    const csv = fs.readFileSync(path.join(dir, f), 'utf8')
    if (!csv.startsWith('TradDt')) continue
    byDate[`${m[1]}-${m[2]}-${m[3]}`] = parseBhav(csv, 'udiff')
  }
  return byDate
}
function collectBhav() {
  const byDate = {}
  if (!fs.existsSync(BHAV)) return byDate
  for (const f of fs.readdirSync(BHAV)) {
    const m = f.match(/^(udiff|legacy)_(\d{4})(\d{2})(\d{2})\.csv\.zip$/)
    if (!m) continue
    let csv
    try {
      csv = execFileSync('unzip', ['-p', path.join(BHAV, f)], { maxBuffer: 1 << 28 }).toString('utf8')
    } catch {
      continue
    }
    if (/Access Denied/.test(csv.slice(0, 200))) continue
    byDate[`${m[2]}-${m[3]}-${m[4]}`] = parseBhav(csv, m[1] === 'udiff' ? 'udiff' : 'legacy')
  }
  return byDate
}

// ---- helpers ---------------------------------------------------------------
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0)
function monthKeys(...maps) {
  const s = new Set()
  for (const m of maps) for (const d of Object.keys(m)) s.add(ym(d))
  return [...s].sort()
}

function main() {
  const vol = collectPart('vol')
  const oi = collectPart('oi')
  const bhav = collectBhav()
  const bse = collectBSE()
  let fiiDaily = []
  const fiiPath = path.join(OUT, 'fii-value-daily.json')
  if (fs.existsSync(fiiPath)) fiiDaily = JSON.parse(fs.readFileSync(fiiPath, 'utf8'))

  // latest-day participant detail (for the snapshot table)
  const volDates = Object.keys(vol).sort()
  const latestDate = volDates.at(-1)

  // ---- participant monthly (avg daily contracts + share), vol & oi ----
  const partMonthly = {} // key ym -> {vol:{part:[contracts]}, oi:{...}, shareVol, shareOi}
  const pushPart = (src, report) => {
    for (const [date, rows] of Object.entries(src)) {
      const k = ym(date)
      const m = (partMonthly[k] ??= { vol: {}, oi: {}, shareVol: {}, shareOi: {} })
      const totalContracts = prodContracts(rows.TOTAL).total || 1
      for (const p of PARTS) {
        if (!rows[p]) continue
        const c = prodContracts(rows[p]).total
        ;(m[report][p] ??= []).push(c)
        ;(m[report === 'vol' ? 'shareVol' : 'shareOi'][p] ??= []).push((c / totalContracts) * 100)
      }
    }
  }
  pushPart(vol, 'vol')
  pushPart(oi, 'oi')

  // ---- product monthly from participant TOTAL (volume, monthly avg) ----
  const prodVolMonthly = {} // ym -> {product:[dailyContracts]}
  for (const [date, rows] of Object.entries(vol)) {
    const k = ym(date)
    const pc = prodContracts(rows.TOTAL)
    const m = (prodVolMonthly[k] ??= {})
    for (const p of PRODUCTS) (m[p] ??= []).push(pc[p])
  }

  // ---- participant volume by product (monthly avg daily contracts) ----
  const partProdVol = {} // ym -> {participant:{product:[dailyContracts]}}
  for (const [date, rows] of Object.entries(vol)) {
    const k = ym(date)
    const m = (partProdVol[k] ??= {})
    for (const p of PARTS) {
      if (!rows[p]) continue
      const pc = prodContracts(rows[p])
      const mp = (m[p] ??= {})
      for (const prod of PRODUCTS) (mp[prod] ??= []).push(pc[prod])
    }
  }

  // ---- product monthly from bhavcopy (value + volume, month-end snapshot) ----
  const prodBhavMonthly = {} // ym -> {product:{c,v,oi}} (last snapshot in month) — NSE
  for (const date of Object.keys(bhav).sort()) {
    prodBhavMonthly[ym(date)] = bhav[date] // later dates overwrite -> month-end
  }

  // ---- FII value monthly (avg daily buy+sell ₹cr, and OI ₹cr) ----
  const fiiMonthly = {} // ym -> {product:{traded:[], oi:[]}}
  for (const r of fiiDaily) {
    const k = ym(r.date)
    const m = (fiiMonthly[k] ??= {})
    const p = (m[r.product] ??= { traded: [], oi: [] })
    p.traded.push((r.buyCr + r.sellCr) / 2) // avg of buy & sell = one-side traded value
    p.oi.push(r.oiCr)
  }

  const months = monthKeys(partMonthly, prodVolMonthly, prodBhavMonthly, fiiMonthly)

  const series = (obj, month, fn) => fn(obj[month])
  const round = (n) => Math.round(n)

  // ---- participant VALUE (₹cr) ----
  // FII: real disclosed (sum of its per-product traded value).
  // Client/DII/Pro: ESTIMATED — allocate each product's turnover value to a
  //   participant by that participant's share of the product's volume:
  //   estValue[p] = Σ_product  productValueCr[product] × (partProdVol[p] / totalProdVol)
  const valueFii = months.map((m) => round(PRODUCTS.reduce((s, prod) => s + avg(fiiMonthly[m]?.[prod]?.traded || []), 0)))
  const valueEst = Object.fromEntries(
    PARTS.map((p) => [
      p,
      months.map((m) => {
        let tot = 0
        for (const prod of PRODUCTS) {
          const pv = avg(partProdVol[m]?.[p]?.[prod] || [])
          const tv = avg(prodVolMonthly[m]?.[prod] || [])
          const val = prodBhavMonthly[m]?.[prod]?.v || 0
          if (tv > 0) tot += val * (pv / tv)
        }
        return round(tot)
      }),
    ]),
  )
  const participantValue = { ...valueEst, FII: valueFii } // FII overridden with disclosed figure

  // ---- NSE vs BSE market share ----
  // Cross-exchange comparison needs FULL-MONTH aggregation, not a month-end
  // snapshot: NSE and BSE expire on different weekdays, so any single day is
  // skewed by whose expiry it is. Turnover & volume are summed over all trading
  // days in the month; open interest (a stock, not a flow) is averaged.
  const monthlyAgg = (byDate) => {
    const tmp = {}
    for (const [date, rec] of Object.entries(byDate)) {
      const k = ym(date)
      const m = (tmp[k] ??= {})
      for (const p of PRODUCTS) {
        const mp = (m[p] ??= { c: 0, v: 0, oi: [] })
        mp.c += rec[p].c
        mp.v += rec[p].v
        mp.oi.push(rec[p].oi)
      }
    }
    const out = {}
    for (const k in tmp) {
      out[k] = {}
      for (const p of PRODUCTS) {
        const x = tmp[k][p]
        out[k][p] = { c: x.c, v: x.v, oi: avg(x.oi) }
      }
    }
    return out
  }
  const nseAgg = monthlyAgg(bhav)
  const bseAgg = monthlyAgg(bse)
  const bseFrom = Object.keys(bseAgg).sort()[0] || null
  const inWin = (m) => bseFrom && m >= bseFrom // only months where both have daily data
  const exField = (agg, m, field, seg) =>
    seg === 'total'
      ? PRODUCTS.reduce((s, p) => s + (agg[m]?.[p]?.[field] || 0), 0)
      : agg[m]?.[seg]?.[field] || 0
  const buildEx = (field) => {
    const o = {}
    for (const seg of [...PRODUCTS, 'total'])
      o[seg] = {
        nse: months.map((m) => (inWin(m) ? round(exField(nseAgg, m, field, seg)) : null)),
        bse: months.map((m) => (inWin(m) ? round(exField(bseAgg, m, field, seg)) : null)),
      }
    return o
  }

  const out = {
    generatedAt: new Date().toISOString(),
    months,
    coverage: {
      participantDays: volDates.length,
      bhavMonths: Object.keys(prodBhavMonthly).length,
      fiiDays: new Set(fiiDaily.map((r) => r.date)).size,
    },
    // participant evolution (contracts, monthly avg/day) + share
    participant: {
      vol: Object.fromEntries(PARTS.map((p) => [p, months.map((m) => round(avg(partMonthly[m]?.vol[p] || [])))])),
      oi: Object.fromEntries(PARTS.map((p) => [p, months.map((m) => round(avg(partMonthly[m]?.oi[p] || [])))])),
      shareVol: Object.fromEntries(PARTS.map((p) => [p, months.map((m) => +avg(partMonthly[m]?.shareVol[p] || []).toFixed(2))])),
      shareOi: Object.fromEntries(PARTS.map((p) => [p, months.map((m) => +avg(partMonthly[m]?.shareOi[p] || []).toFixed(2))])),
      valueFiiCr: Object.fromEntries(PRODUCTS.map((p) => [p, months.map((m) => round(avg(fiiMonthly[m]?.[p]?.traded || [])))])),
      value: participantValue, // ₹cr total per participant; Client/DII/Pro estimated
      valueEstimated: ['Client', 'DII', 'Pro'],
    },
    // product evolution: MONTHLY TOTALS from bhavcopy (summed over all trading
    // days) so options value/volume aren't skewed by which day is sampled.
    product: {
      vol: Object.fromEntries(PRODUCTS.map((p) => [p, months.map((m) => round(nseAgg[m]?.[p]?.c || 0))])),
      valueCr: Object.fromEntries(PRODUCTS.map((p) => [p, months.map((m) => round(nseAgg[m]?.[p]?.v || 0))])),
    },
    // NSE vs BSE by product + total; combined & share computed client-side
    exchange: {
      valueCr: buildEx('v'),
      vol: buildEx('c'),
      oi: buildEx('oi'),
      bseFrom,
    },
    latest: latestDate ? buildLatest(vol[latestDate], oi[latestDate], latestDate) : null,
  }

  fs.mkdirSync(OUT, { recursive: true })
  fs.writeFileSync(path.join(OUT, 'dashboard-data.json'), JSON.stringify(out))

  // keep a compact latest-day daily file too
  if (latestDate) fs.writeFileSync(path.join(OUT, 'participant-daily.json'), JSON.stringify(out.latest))

  console.log(`Months: ${months[0] ?? 'n/a'} → ${months.at(-1) ?? 'n/a'} (${months.length})`)
  console.log(`Coverage: participant ${out.coverage.participantDays} days, bhav ${out.coverage.bhavMonths} months, FII ${out.coverage.fiiDays} days`)
  // calibration sanity print
  const lastBhavMonth = Object.keys(prodBhavMonthly).sort().at(-1)
  if (lastBhavMonth) {
    const b = prodBhavMonthly[lastBhavMonth]
    console.log(`Sanity (${lastBhavMonth} month-end ₹cr): indexOpt=${round(b.indexOpt?.v)}, stockOpt=${round(b.stockOpt?.v)}, indexFut=${round(b.indexFut?.v)}, stockFut=${round(b.stockFut?.v)}`)
  }
  console.log(`Wrote dashboard-data.json`)
}

function buildLatest(volRows, oiRows, date) {
  const rec = (cells) => {
    const g = (i) => num(cells[i])
    return {
      indexFut: [g(1), g(2)], stockFut: [g(3), g(4)],
      indexOpt: [g(5) + g(6), g(7) + g(8)], stockOpt: [g(9) + g(10), g(11) + g(12)],
      total: [g(13), g(14)],
    }
  }
  const build = (rows) => {
    if (!rows) return null
    const totL = num(rows.TOTAL[13]) || 1
    const o = {}
    for (const p of PARTS) if (rows[p]) {
      const r = rec(rows[p])
      o[p] = { ...r, share: +((r.total[0] / totL) * 100).toFixed(1), net: r.total[0] - r.total[1] }
    }
    return o
  }
  return { date, vol: build(volRows), oi: build(oiRows) }
}

main()
