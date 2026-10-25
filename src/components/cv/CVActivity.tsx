import { useMemo, useRef, useState } from 'react'
import { MiniLineChart, type SeriesPoint } from '../MiniLineChart'
import { heatColor } from '../../lib/heatmap'
import { BarChart, DailyLineChart } from './charts'
import {
  cvActivityMeta,
  cvSalesMonths,
  cvSalesGapBefore,
  cvSalesRows,
  cvSalesSummaryCols,
  cvSalesSummary,
  cvSalesSeasonality,
  freightMonths,
  freightLanes,
} from '../../data/cvActivity'
import { dieselSeries, dieselSource, dieselSourceLabel } from '../../data/cvDiesel'
import { crudeDaily, crudeAnnual, crudeSource, crudeSourceLabel } from '../../data/cvCrude'
import { fastagSeries, fastagSource, fastagSourceLabel } from '../../data/cvFastag'
import {
  dieselEmailChart,
  crudeAnnualEmailChart,
  crudeDailyEmailChart,
  fastagEmailChart,
} from './emailCharts'

type CvTab = 'sales' | 'freight' | 'diesel' | 'crude' | 'fastag' | 'email'

const TABS: { id: CvTab; label: string }[] = [
  { id: 'sales', label: 'New Vehicle Sales' },
  { id: 'freight', label: 'Freight Rates' },
  { id: 'diesel', label: 'Diesel Consumption' },
  { id: 'crude', label: 'Crude Oil Prices' },
  { id: 'fastag', label: 'FASTag' },
  { id: 'email', label: 'Email Draft' },
]

const nf = (v: number) => v.toLocaleString('en-IN')
// FADA-style: negatives in parentheses, e.g. (4)%
const pctParen = (v: number | null) => (v == null ? '' : v < 0 ? `(${Math.abs(v)})%` : `${v}%`)
const pct = (v: number | null) => (v == null ? '' : `${v}%`)

// Prominent, consistent source bar shown at the top of every tab.
function SourceBar({ label, href }: { label: string; href: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 px-3 py-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
        Source
      </span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-blue-700 dark:text-blue-300 underline decoration-blue-400 underline-offset-2 break-all hover:text-blue-900 dark:hover:text-blue-200"
      >
        {label}
      </a>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-2">{children}</h3>
}

// ---------------------------------------------------------------- New Vehicle Sales
function SalesTab() {
  const charts: { title: string; key: string; color: string; growth?: boolean }[] = [
    { title: 'Total Commercial Vehicle — units', key: 'cv', color: '#2a78d6' },
    { title: 'Passenger Vehicle — units', key: 'pv', color: '#7c3aed' },
    { title: 'Total CV — YoY growth (FADA)', key: 'cv', color: '#16a34a', growth: true },
    { title: 'Heavy Commercial Vehicle — YoY growth (FADA)', key: 'hcv', color: '#ea580c', growth: true },
  ]
  const pointsFor = (key: string, growth: boolean): SeriesPoint[] =>
    cvSalesMonths.map((m, i) => {
      const row = cvSalesRows.find((r) => r.key === key)!
      return {
        label: m,
        value: growth ? row.yoy[i] : row.abs[i],
        gapBefore: cvSalesGapBefore.includes(m),
      }
    })

  return (
    <div>
      <SourceBar label={cvActivityMeta.salesSource} href="https://www.fada.in/" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        {cvActivityMeta.salesGrowthRule} <br />
        <span className="italic">{cvActivityMeta.salesHistoryNote}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {charts.map((c, i) => (
          <MiniLineChart
            key={i}
            title={c.title}
            unit={c.growth ? 'YoY %' : 'units'}
            points={pointsFor(c.key, !!c.growth)}
            color={c.color}
            format={c.growth ? (v) => `${v}%` : nf}
          />
        ))}
      </div>

      <SectionTitle>All-India vehicle retail — absolute (units)</SectionTitle>
      <WideTable
        months={cvSalesMonths}
        gapCols={cvSalesGapBefore}
        summaryCols={cvSalesSummaryCols}
        rows={cvSalesRows.map((r) => ({
          label: r.label,
          values: r.abs,
          summary: cvSalesSummary.find((s) => s.key === r.key)!.abs,
          fmt: (v) => nf(v as number),
        }))}
      />

      <SectionTitle>YoY growth % — lifted verbatim from FADA press release</SectionTitle>
      <WideTable
        months={cvSalesMonths}
        gapCols={cvSalesGapBefore}
        summaryCols={cvSalesSummaryCols}
        rows={cvSalesRows.map((r) => ({
          label: r.label,
          values: r.yoy,
          summary: cvSalesSummary.find((s) => s.key === r.key)!.yoy,
          fmt: (v) => pctParen(v),
          redNeg: true,
        }))}
      />

      <SectionTitle>Seasonality index (as provided — Feb-23 = 1.00 per row)</SectionTitle>
      <WideTable
        months={cvSalesMonths}
        gapCols={cvSalesGapBefore}
        rows={cvSalesSeasonality.map((r) => ({
          label: r.label,
          values: r.idx,
          fmt: (v) => (v == null ? '—' : (v as number).toFixed(1)),
        }))}
      />
    </div>
  )
}

// A wide, horizontally-scrolling month-columned table with a sticky first column.
interface WideRow {
  label: string
  values: (number | null)[]
  summary?: (number | null)[]
  fmt: (v: number | null) => string
  redNeg?: boolean
  heat?: boolean // row-wise red->green heatmap on the value cells
}
function WideTable({
  months,
  rows,
  summaryCols,
  gapCols = [],
}: {
  months: string[]
  rows: WideRow[]
  summaryCols?: string[]
  gapCols?: string[]
}) {
  return (
    <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <table className="text-[11px] border-collapse whitespace-nowrap">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900">
            <th className="sticky left-0 z-10 bg-zinc-50 dark:bg-zinc-900 text-left px-2 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-800">
              &nbsp;
            </th>
            {months.map((m) => (
              <th
                key={m}
                className={`px-2 py-1.5 text-right font-medium text-zinc-500 dark:text-zinc-400 ${
                  gapCols.includes(m) ? 'border-l-2 border-dashed border-zinc-300 dark:border-zinc-600' : ''
                }`}
              >
                {m}
              </th>
            ))}
            {summaryCols?.map((c) => (
              <th
                key={c}
                className="px-2 py-1.5 text-right font-semibold text-zinc-600 dark:text-zinc-300 border-l-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            return (
              <tr key={r.label} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="sticky left-0 z-10 bg-white dark:bg-zinc-950 text-left px-2 py-1 font-medium text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-800">
                  {r.label}
                </td>
                {r.values.map((v, i) => {
                  const bg = r.heat ? heatColor(v, r.values, true) : undefined
                  const color = r.redNeg && v != null && v < 0 ? '#dc2626' : undefined
                  return (
                    <td
                      key={i}
                      className={`px-2 py-1 text-right text-zinc-800 dark:text-zinc-200 ${
                        gapCols.includes(months[i]) ? 'border-l-2 border-dashed border-zinc-200 dark:border-zinc-700' : ''
                      }`}
                      style={{ backgroundColor: bg, color }}
                    >
                      {r.fmt(v)}
                    </td>
                  )
                })}
                {r.summary?.map((v, i) => (
                  <td
                    key={i}
                    className="px-2 py-1 text-right font-semibold text-zinc-800 dark:text-zinc-200 border-l-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900"
                    style={{ color: r.redNeg && v != null && v < 0 ? '#dc2626' : undefined }}
                  >
                    {r.fmt(v)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------- Freight Rates
// Shared so the Freight tab and the Email tab render byte-identical heatmaps.
function FreightHeatTable({ indexed }: { indexed: boolean }) {
  return (
    <WideTable
      months={freightMonths}
      rows={freightLanes.map((l) => ({
        label: l.route,
        values: indexed ? l.idx : l.abs,
        fmt: (v) => (v == null ? '—' : indexed ? (v as number).toFixed(2) : nf(v as number)),
        heat: true,
      }))}
      summaryCols={indexed ? undefined : ['Aug m-o-m', 'Aug vs Feb']}
    />
  )
}

function FreightTab() {
  return (
    <div>
      <SourceBar label={cvActivityMeta.freightSource} href="https://www.shriramfinance.in/" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        18-tonne round-trip freight rate (₹ per round trip) by lane. {cvActivityMeta.freightIndexNote} Row-wise
        colour scale (red = lane low, green = lane high).
      </p>
      <SectionTitle>Round-trip freight rate (18T) — ₹ per trip</SectionTitle>
      {/* summary columns need the real aug mom / vs-feb numbers, which live on the lane */}
      <WideTable
        months={freightMonths}
        rows={freightLanes.map((l) => ({
          label: l.route,
          values: l.abs,
          summary: [l.augMomPct, l.augVsFebPct],
          fmt: (v) => (v == null ? '—' : nf(v as number)),
          heat: true,
        }))}
        summaryCols={['Aug m-o-m %', 'Aug vs Feb %']}
      />
      <SectionTitle>Indexed to Jan-2024 = 1.00</SectionTitle>
      <FreightHeatTable indexed />
    </div>
  )
}

// ---------------------------------------------------------------- Diesel Consumption
function DieselTab() {
  const consPoints: SeriesPoint[] = dieselSeries.map((d) => ({ label: d.month, value: d.mt }))
  const g1Points: SeriesPoint[] = dieselSeries.map((d) => ({ label: d.month, value: d.g1 }))
  const g1All = dieselSeries.map((d) => d.g1)
  const g2All = dieselSeries.map((d) => d.g2)
  return (
    <div>
      <SourceBar label={dieselSourceLabel} href={dieselSource} />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        High Speed Diesel (HSD) consumption, '000 metric tonnes. Diesel consumption seasonally dips through the
        monsoon and picks up October onwards. Growth columns colour-graded (red low → green high).
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <MiniLineChart title="HSD consumption — '000 MT" unit="'000 MT" points={consPoints} color="#2f5e9e" format={nf} />
        <MiniLineChart title="HSD consumption — YoY growth %" unit="YoY %" points={g1Points} color="#16a34a" format={(v) => `${v}%`} />
      </div>

      <SectionTitle>Monthly HSD consumption ('000 MT) — full history</SectionTitle>
      <div className="overflow-y-auto max-h-[28rem] border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <table className="text-[11px] border-collapse w-full">
          <thead className="sticky top-0">
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              <th className="text-left px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">Month</th>
              <th className="text-right px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">'000 MT</th>
              <th className="text-right px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">Index (Apr-10=1.00)</th>
              <th className="text-right px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">Growth 1 %</th>
              <th className="text-right px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">Growth 2 %</th>
            </tr>
          </thead>
          <tbody>
            {dieselSeries.map((d) => (
              <tr key={d.month} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-3 py-1 text-left font-medium text-zinc-700 dark:text-zinc-300">{d.month}</td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200">{nf(d.mt)}</td>
                <td className="px-3 py-1 text-right text-zinc-600 dark:text-zinc-400">{d.idx.toFixed(2)}</td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200" style={{ backgroundColor: heatColor(d.g1, g1All, true) }}>
                  {pct(d.g1)}
                </td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200" style={{ backgroundColor: heatColor(d.g2, g2All, true) }}>
                  {pct(d.g2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2">
        Growth 1 = YoY %. Growth 2 recorded as-provided (exact definition to confirm). Both lifted from the
        source sheet, not recomputed.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------- Crude Oil Prices
function CrudeTab() {
  const recent = useMemo(() => [...crudeDaily].reverse(), [])
  const fmtDate = (iso: string) => {
    const [y, m, d] = iso.split('-')
    return `${d}/${m}/${y}`
  }
  return (
    <div>
      <SourceBar label={crudeSourceLabel} href={crudeSource} />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        WTI crude, US$/barrel. Charts first (calendar-year average, then the full daily series), prices below.
      </p>
      <div className="grid grid-cols-1 gap-3">
        <BarChart title="$ per barrel — calendar-year average" data={crudeAnnual.map((a) => ({ label: a.year, value: a.avg }))} />
        <DailyLineChart title="$ per barrel — daily (WTI)" points={crudeDaily} />
      </div>

      <SectionTitle>Daily prices (most recent first)</SectionTitle>
      <div className="overflow-y-auto max-h-[28rem] border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <table className="text-[11px] border-collapse w-full">
          <thead className="sticky top-0">
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              <th className="text-left px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">Date</th>
              <th className="text-right px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">$ / barrel</th>
              <th className="text-right px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">CY</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(([iso, v]) => (
              <tr key={iso} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-3 py-1 text-left text-zinc-700 dark:text-zinc-300">{fmtDate(iso)}</td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200">{v}</td>
                <td className="px-3 py-1 text-right text-zinc-500 dark:text-zinc-400">{iso.slice(0, 4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- FASTag
function FastagTab() {
  const dailyAvgPoints: SeriesPoint[] = fastagSeries
    .filter((f) => f.dailyAvg != null)
    .map((f) => ({ label: f.month, value: f.dailyAvg }))
  const momAll = fastagSeries.map((f) => f.mom)
  const annAll = fastagSeries.map((f) => f.annual)
  // newest first so the latest months are visible without scrolling
  const rows = [...fastagSeries].reverse()
  return (
    <div>
      <SourceBar label={fastagSourceLabel} href={fastagSource} />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        NETC (FASTag) monthly statistics. The tracked series is the <strong>Daily Average Value</strong> (₹ Cr),
        which rises seasonally from September/October. Growth columns colour-graded (red low → green high).
      </p>
      <div className="grid grid-cols-1 gap-3">
        <MiniLineChart
          title="Average Daily Value per month — FASTag (₹ Cr)"
          unit="₹ Cr / day"
          points={dailyAvgPoints}
          color="#8c8c8c"
          format={nf}
        />
      </div>

      <SectionTitle>NETC FASTag — monthly (most recent first)</SectionTitle>
      <div className="overflow-y-auto max-h-[28rem] border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <table className="text-[11px] border-collapse w-full whitespace-nowrap">
          <thead className="sticky top-0">
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              {['Month', 'Banks live', 'Tag issuance', 'Volume (Mn)', 'Amount (₹ Cr)', 'Daily avg (₹ Cr)', 'MoM %', 'YoY %'].map((h) => (
                <th key={h} className="px-3 py-1.5 text-right first:text-left font-semibold text-zinc-700 dark:text-zinc-300">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.month} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-3 py-1 text-left font-medium text-zinc-700 dark:text-zinc-300">{f.month}</td>
                <td className="px-3 py-1 text-right text-zinc-600 dark:text-zinc-400">{f.banks ?? '—'}</td>
                <td className="px-3 py-1 text-right text-zinc-600 dark:text-zinc-400">{f.issuance == null ? '—' : nf(f.issuance)}</td>
                <td className="px-3 py-1 text-right text-zinc-600 dark:text-zinc-400">{f.volumeMn ?? '—'}</td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200">{f.amountCr == null ? '—' : nf(f.amountCr)}</td>
                <td className="px-3 py-1 text-right font-semibold text-zinc-900 dark:text-zinc-100">{f.dailyAvg ?? '—'}</td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200" style={{ backgroundColor: heatColor(f.mom, momAll, true) }}>
                  {pct(f.mom)}
                </td>
                <td className="px-3 py-1 text-right text-zinc-800 dark:text-zinc-200" style={{ backgroundColor: heatColor(f.annual, annAll, true) }}>
                  {pct(f.annual)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- Email Draft
// Inline-styled so a copy keeps the colour grading when pasted into Outlook/Gmail,
// and so it reads identically to the dashboard tables above.
function emailHeatCell(v: number | null, values: (number | null)[], text: string) {
  const bg = heatColor(v, values, true)
  return `<td style="border:1px solid #e4e4e7;padding:2px 6px;text-align:right;background:${bg === 'transparent' ? '#fff' : bg}">${text}</td>`
}

function buildFreightEmailTable(): string {
  const head =
    `<tr><th style="border:1px solid #e4e4e7;padding:2px 6px;text-align:left;background:#f4f4f5">Round-trip 18T (₹)</th>` +
    freightMonths.map((m) => `<th style="border:1px solid #e4e4e7;padding:2px 6px;background:#f4f4f5">${m}</th>`).join('') +
    `</tr>`
  const body = freightLanes
    .map(
      (l) =>
        `<tr><td style="border:1px solid #e4e4e7;padding:2px 6px;font-weight:600">${l.route}</td>` +
        l.abs.map((v) => emailHeatCell(v, l.abs, v == null ? '—' : nf(v))).join('') +
        `</tr>`,
    )
    .join('')
  return `<table style="border-collapse:collapse;font:11px Calibri,Arial,sans-serif">${head}${body}</table>`
}

function buildSalesEmailTable(): string {
  const cols = [...cvSalesMonths.slice(-7)] // last 7 months keeps the email readable
  const idxs = cols.map((m) => cvSalesMonths.indexOf(m))
  const head =
    `<tr><th style="border:1px solid #e4e4e7;padding:2px 6px;text-align:left;background:#f4f4f5">YoY growth % (FADA)</th>` +
    cols.map((m) => `<th style="border:1px solid #e4e4e7;padding:2px 6px;background:#f4f4f5">${m}</th>`).join('') +
    `</tr>`
  const body = cvSalesRows
    .map(
      (r) =>
        `<tr><td style="border:1px solid #e4e4e7;padding:2px 6px;font-weight:600">${r.label}</td>` +
        idxs
          .map((i) => {
            const v = r.yoy[i]
            const color = v != null && v < 0 ? 'color:#dc2626' : ''
            return `<td style="border:1px solid #e4e4e7;padding:2px 6px;text-align:right;${color}">${pctParen(v)}</td>`
          })
          .join('') +
        `</tr>`,
    )
    .join('')
  return `<table style="border-collapse:collapse;font:11px Calibri,Arial,sans-serif">${head}${body}</table>`
}

// Rasterize an inline SVG chart to a PNG data URL so the email keeps its charts
// as images when pasted into Outlook/Gmail (which don't render inline SVG).
async function svgToPng(svg: SVGElement): Promise<{ url: string; w: number; h: number } | null> {
  const w = Number(svg.getAttribute('width')) || Math.round(svg.getBoundingClientRect().width) || 680
  const h = Number(svg.getAttribute('height')) || Math.round(svg.getBoundingClientRect().height) || 210
  const xml = new XMLSerializer().serializeToString(svg)
  const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml)))
  const img = new Image()
  const loaded = new Promise<boolean>((res) => {
    img.onload = () => res(true)
    img.onerror = () => res(false)
  })
  img.src = svgUrl
  if (!(await loaded)) return null
  const scale = 2
  const canvas = document.createElement('canvas')
  canvas.width = w * scale
  canvas.height = h * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.scale(scale, scale)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h)
  return { url: canvas.toDataURL('image/png'), w, h }
}

function EmailTab() {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    const src = ref.current
    if (!src) return
    try {
      const clone = src.cloneNode(true) as HTMLElement
      const liveSvgs = Array.from(src.querySelectorAll('svg'))
      const cloneSvgs = Array.from(clone.querySelectorAll('svg'))
      for (let i = 0; i < liveSvgs.length; i++) {
        const png = await svgToPng(liveSvgs[i])
        if (!png) continue
        const img = document.createElement('img')
        img.src = png.url
        img.setAttribute('width', String(png.w))
        img.setAttribute('height', String(png.h))
        img.style.display = 'block'
        cloneSvgs[i].replaceWith(img)
      }
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([clone.innerHTML], { type: 'text/html' }),
          'text/plain': new Blob([src.innerText], { type: 'text/plain' }),
        }),
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const lastSales = cvSalesMonths[cvSalesMonths.length - 1]
  const lastDiesel = dieselSeries[dieselSeries.length - 1]
  const lastCrude = crudeDaily[crudeDaily.length - 1]
  const lastFastag = fastagSeries[fastagSeries.length - 1]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Preview of the monthly email — same tables and colour grading as the dashboard. Click copy, then paste
          straight into Outlook/Gmail (formatting preserved). Commentary blocks are placeholders until you add
          your notes.
        </p>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 text-sm font-medium hover:opacity-90"
        >
          {copied ? 'Copied ✓' : 'Copy email'}
        </button>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
        {/* email body -- inline styles only, so the clipboard copy is portable */}
        <div ref={ref} style={{ font: '14px Calibri, Arial, sans-serif', color: '#111' }}>
          <p>Hi Rohan,</p>
          <p>Please see below update on CV activity.</p>

          <p style={{ fontWeight: 700, marginBottom: 2 }}>A) New Vehicle Sales</p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            [commentary — latest month {lastSales}; FADA growth table below]
          </p>
          <div dangerouslySetInnerHTML={{ __html: buildSalesEmailTable() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>B) Freight Rates</p>
          <p style={{ margin: '2px 0', color: '#666' }}>[commentary — 18T round-trip rates, ₹ per trip]</p>
          <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: buildFreightEmailTable() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>C) Diesel Consumption</p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            [commentary — latest {lastDiesel.month}: {nf(lastDiesel.mt)} '000 MT, {pct(lastDiesel.g1)} YoY]
          </p>
          <div dangerouslySetInnerHTML={{ __html: dieselEmailChart() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>D) Crude Oil Prices</p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            [commentary — WTI last print {lastCrude[1]} $/bbl on {lastCrude[0]}]
          </p>
          <div dangerouslySetInnerHTML={{ __html: crudeAnnualEmailChart() }} />
          <div style={{ marginTop: 8 }} dangerouslySetInnerHTML={{ __html: crudeDailyEmailChart() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>E) FASTag</p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            [commentary — latest {lastFastag.month}: ₹{lastFastag.dailyAvg} Cr daily average value]
          </p>
          <div dangerouslySetInnerHTML={{ __html: fastagEmailChart() }} />

          <p style={{ marginTop: 14 }}>Best,</p>
          <p>Janhavi</p>
        </div>
      </div>
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2">
        Sources — Sales: FADA press release · Freight: Shriram monthly bulletin · Diesel: PPAC · Crude: macrotrends (WTI) · FASTag: NPCI NETC.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------- Shell
export function CVActivity() {
  const [tab, setTab] = useState<CvTab>('sales')
  return (
    <div>
      <div className="mb-1">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">CV Activity Tracker</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Monthly commercial-vehicle activity read — one pillar per tab, feeding the email draft.
        </p>
      </div>
      <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              tab === t.id
                ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sales' && <SalesTab />}
      {tab === 'freight' && <FreightTab />}
      {tab === 'diesel' && <DieselTab />}
      {tab === 'crude' && <CrudeTab />}
      {tab === 'fastag' && <FastagTab />}
      {tab === 'email' && <EmailTab />}
    </div>
  )
}
