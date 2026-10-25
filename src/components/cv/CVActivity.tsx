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
  summaryFmt?: (v: number | null) => string
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
                    {(r.summaryFmt ?? r.fmt)(v)}
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
          summaryFmt: (v) => (v == null ? '—' : `${v}%`),
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
  return `<td style="border:1px solid #e4e4e7;padding:2px 6px;text-align:right;white-space:nowrap;background:${bg === 'transparent' ? '#fff' : bg}">${text}</td>`
}

function buildFreightEmailTable(): string {
  // Email keeps a trailing 12-month window (rolls forward automatically each month).
  const months = freightMonths.slice(-12)
  const start = freightMonths.length - months.length
  const head =
    `<tr><th style="border:1px solid #e4e4e7;padding:2px 6px;text-align:left;background:#f4f4f5">Round-trip 18T (₹)</th>` +
    months.map((m) => `<th style="border:1px solid #e4e4e7;padding:2px 6px;white-space:nowrap;background:#f4f4f5">${m}</th>`).join('') +
    `</tr>`
  const body = freightLanes
    .map((l) => {
      const abs = l.abs.slice(start)
      return (
        `<tr><td style="border:1px solid #e4e4e7;padding:2px 6px;white-space:nowrap;font-weight:600">${l.route}</td>` +
        abs.map((v) => emailHeatCell(v, abs, v == null ? '—' : nf(v))).join('') +
        `</tr>`
      )
    })
    .join('')
  return `<table style="border-collapse:collapse;font:11px Calibri,Arial,sans-serif">${head}${body}</table>`
}

function buildSalesEmailTable(): string {
  // Absolute units for the last 3 months, FADA YoY (verbatim), computed MoM for Sep,
  // Q2 FY27 totals and QoQ (vs Q1 FY27). Rows: PV/CV/LCV/MCV/HCV + Construction Equipment.
  const n = cvSalesMonths.length
  const th = (t: string, align = 'center') =>
    `<th style="border:1px solid #e4e4e7;padding:2px 6px;white-space:nowrap;text-align:${align};background:#f4f4f5">${t}</th>`
  const td = (t: string, extra = '') =>
    `<td style="border:1px solid #e4e4e7;padding:2px 6px;text-align:right;white-space:nowrap;${extra}">${t}</td>`
  const neg = (v: number) => (v < 0 ? 'color:#dc2626' : '')
  const head =
    `<tr><th style="border:1px solid #e4e4e7;padding:2px 6px;text-align:left;white-space:nowrap;background:#f4f4f5">Category (units)</th>` +
    th(cvSalesMonths[n - 3]) + th(cvSalesMonths[n - 2]) + th(cvSalesMonths[n - 1]) +
    th('Sep YoY%') + th('Sep MoM%') + th('Q2 FY27') + th('QoQ%') +
    `</tr>`
  const body = cvSalesRows
    .map((r) => {
      const jul = r.abs[n - 3] as number
      const aug = r.abs[n - 2] as number
      const sep = r.abs[n - 1] as number
      const yoy = r.yoy[n - 1] as number
      const mom = Math.round((sep / aug - 1) * 100)
      const q1 = (r.abs[n - 6] as number) + (r.abs[n - 5] as number) + (r.abs[n - 4] as number)
      const q2 = jul + aug + sep
      const qoq = Math.round((q2 / q1 - 1) * 100)
      return (
        `<tr><td style="border:1px solid #e4e4e7;padding:2px 6px;white-space:nowrap;font-weight:600">${r.label}</td>` +
        td(nf(jul)) + td(nf(aug)) + td(nf(sep)) +
        td(`${yoy}%`, neg(yoy)) + td(`${mom}%`, neg(mom)) + td(nf(q2)) + td(`${qoq}%`, neg(qoq)) +
        `</tr>`
      )
    })
    .join('')
  // Construction Equipment -- FADA doesn't break this out, so sourced from the Shriram/VAHAN
  // mobility bulletin (Aug/Sep only); Jul and the quarterly figures are left blank.
  const ce =
    `<tr><td style="border:1px solid #e4e4e7;padding:2px 6px;white-space:nowrap;font-weight:600">Construction Equipment*</td>` +
    td('—') + td(nf(489)) + td(nf(640)) + td('25%') + td('31%') + td('—') + td('—') +
    `</tr>`
  return `<table style="border-collapse:collapse;font:11px Calibri,Arial,sans-serif">${head}${body}${ce}</table>`
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
          <ul style={{ margin: '2px 0 6px', paddingLeft: 18 }}>
            <li>
              <strong>PV had its best-ever month</strong> — 4,27,213 units, <strong>+32% YoY</strong> and{' '}
              <strong>+6% MoM</strong>. The large YoY is flattered by a weak Sep-2025 base (purchases deferred
              ahead of GST 2.0), so the record print and the MoM gain are the cleaner read.
            </li>
            <li>
              <strong>CV equally strong</strong> — total CV <strong>+38% YoY to 1,03,557</strong>, led by{' '}
              <strong>HCV +46%</strong> and LCV +34%. Strength in heavy trucks and construction-linked segments
              points to momentum in freight, infrastructure and the core economy.
            </li>
            <li>
              FADA expects pending bookings to convert through <strong>Navratri and Dussehra</strong>; watchpoints
              are elevated PV inventory (<strong>~43-45 days</strong> vs the 21-day norm), OEM supply, October
              price hikes and rain-deficient pockets.
            </li>
            <li>First-half FY27 (Apr-Sep) PV retail is <strong>up ~24% YoY</strong>.</li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: buildSalesEmailTable() }} />
          <p style={{ margin: '2px 0', fontSize: 11, color: '#888' }}>
            *Construction equipment is not broken out in FADA's release — sourced from the Shriram/VAHAN mobility
            bulletin (Aug/Sep only). YoY is as reported; MoM and QoQ are computed from the monthly units.
          </p>

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>B) Freight Rates</p>
          <p style={{ margin: '2px 0' }}>
            Freight rates stayed firm in September. Most 18-tonne round-trip rentals were flat to marginally
            higher over the month, while the year-on-year increases remained strong across the trunk routes.
            Delhi-Kolkata is running at ₹1,82,000, up 13% over last year, and Delhi-Mumbai moved up to ₹1,77,000,
            a 1.1% gain for the month and 9% higher than a year ago. Bengaluru-Mumbai and Kolkata-Guwahati are up
            11% and 10% respectively over the same period.
          </p>
          <p style={{ margin: '2px 0' }}>
            Shriram's COO noted that rentals held firm on the back of festive dispatches, and that the healthy
            sales of heavy-duty trucks and construction equipment point to resilient economic activity with
            continued momentum in infrastructure and the core sectors. The one caution he flagged was that a
            possible interest rate increase during the festive season could dampen sentiment.
          </p>
          <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: buildFreightEmailTable() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>C) Diesel Consumption</p>
          <ul style={{ margin: '2px 0 6px', paddingLeft: 18 }}>
            <li>September consumption was <strong>7,116 '000 MT, up ~5% YoY</strong> and higher than August.</li>
            <li>
              The dip from the May-June peak is <strong>seasonal, not structural</strong> — diesel always troughs
              through the monsoon (August is the annual low) and picks up from October as freight, harvest and
              construction activity rebuild.
            </li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: dieselEmailChart() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>D) Crude Oil Prices</p>
          <ul style={{ margin: '2px 0 6px', paddingLeft: 18 }}>
            <li>
              <strong>WTI ~$103/bbl</strong> (23 Oct); 2026 is averaging <strong>~$86</strong> versus ~$65 in
              2025. Prices have firmed back above $100 on Gulf risk.
            </li>
            <li>
              <strong>Strait of Hormuz:</strong> flows have partly recovered (~12 mn bpd in October) but vessel
              attacks are near record levels and Iran disputes the Oman-coast shuttle route — tensions remain
              elevated since the early-2026 conflict.
            </li>
            <li>
              <strong>India's suppliers (Kpler, Sep-26):</strong> Russia still #1 at <strong>~1.8 mn bpd</strong>,
              followed by Iraq, Saudi Arabia and the UAE; refiners are adding Venezuelan and Angolan barrels amid
              the Gulf uncertainty.
            </li>
            <li>Net: crude stays <strong>elevated and volatile</strong>, with no clear easing while Hormuz risk persists.</li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: crudeDailyEmailChart() }} />

          <p style={{ fontWeight: 700, marginBottom: 2, marginTop: 14 }}>E) FASTag</p>
          <ul style={{ margin: '2px 0 6px', paddingLeft: 18 }}>
            <li>
              September daily average value <strong>₹237 Cr, +11% YoY</strong>; monthly value slipped ~1% MoM
              purely on fewer days in the month.
            </li>
            <li>Toll and mobility activity remains <strong>healthy and rising into the festive season</strong>.</li>
          </ul>
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
