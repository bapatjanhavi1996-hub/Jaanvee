import { useMemo, useState } from 'react'
import type { BrokerFinancialYear, BrokerMetricQuarter, Company, Sector } from '../types'

interface BrokerCompareTableProps {
  sector: Sector
  companies: Company[]
  financials: Record<string, BrokerFinancialYear[]>
  metrics: Record<string, BrokerMetricQuarter[]>
  onSelectCompany: (id: string) => void
}

type Align = 'left' | 'right'

interface Row {
  id: string
  name: string
  subSector: string
  verifyMcap: boolean
  mcap: number
  fy: string | null
  revenue: number | null
  pat: number | null
  netMargin: number | null
  roe: number | null
  pe: number | null
  pb: number | null
  activeShare: number | null
}

type SortKey = keyof Omit<Row, 'id' | 'verifyMcap' | 'fy'>

interface Col {
  key: SortKey
  label: string
  align: Align
  format: (r: Row) => string
  numeric: boolean
}

function fmtCr(v: number | null) {
  if (v == null) return '—'
  if (Math.abs(v) >= 100000) return `${(v / 100000).toFixed(2)}L`
  return v.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}
function fmtPct(v: number | null) {
  return v == null ? '—' : `${v.toFixed(1)}%`
}
function fmtX(v: number | null) {
  return v == null ? '—' : `${v.toFixed(1)}x`
}

const COLS: Col[] = [
  { key: 'name', label: 'Company', align: 'left', numeric: false, format: (r) => r.name },
  { key: 'subSector', label: 'Sub-sector', align: 'left', numeric: false, format: (r) => r.subSector },
  { key: 'mcap', label: 'Mkt Cap (₹Cr)', align: 'right', numeric: true, format: (r) => fmtCr(r.mcap) },
  { key: 'revenue', label: 'Revenue FY26 (₹Cr)', align: 'right', numeric: true, format: (r) => fmtCr(r.revenue) },
  { key: 'pat', label: 'PAT FY26 (₹Cr)', align: 'right', numeric: true, format: (r) => fmtCr(r.pat) },
  { key: 'netMargin', label: 'Net Margin', align: 'right', numeric: true, format: (r) => fmtPct(r.netMargin) },
  { key: 'roe', label: 'ROE', align: 'right', numeric: true, format: (r) => fmtPct(r.roe) },
  { key: 'pe', label: 'P/E ≈', align: 'right', numeric: true, format: (r) => fmtX(r.pe) },
  { key: 'pb', label: 'P/B ≈', align: 'right', numeric: true, format: (r) => fmtX(r.pb) },
  { key: 'activeShare', label: 'NSE Active Share', align: 'right', numeric: true, format: (r) => fmtPct(r.activeShare) },
]

export function BrokerCompareTable({ sector, companies, financials, metrics, onSelectCompany }: BrokerCompareTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('mcap')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [subSectorFilter, setSubSectorFilter] = useState<string>('all')

  const subSectorName = useMemo(() => {
    const m: Record<string, string> = {}
    for (const s of sector.subSectors) m[s.id] = s.name
    return m
  }, [sector])

  const rows: Row[] = useMemo(() => {
    return companies.map((c) => {
      const fin = financials[c.id]?.[0] ?? null
      const latestMetric = metrics[c.id]?.[0] ?? null
      const revenue = fin?.salesCr ?? null
      const pat = fin?.netProfitCr ?? null
      const netWorth = fin?.netWorthCr ?? null
      const netMargin = pat != null && revenue ? (pat / revenue) * 100 : null
      const pe = pat != null && pat > 0 ? c.marketCapCr / pat : null
      const pb = netWorth != null && netWorth > 0 ? c.marketCapCr / netWorth : null
      return {
        id: c.id,
        name: c.name,
        subSector: subSectorName[c.subSectorId] ?? '',
        verifyMcap: c.verifyMcap ?? false,
        mcap: c.marketCapCr,
        fy: fin?.fy ?? null,
        revenue,
        pat,
        netMargin,
        roe: fin?.roePct ?? null,
        pe,
        pb,
        activeShare: latestMetric?.activeClientShare ?? null,
      }
    })
  }, [companies, financials, metrics, subSectorName])

  const sorted = useMemo(() => {
    const filtered = rows.filter((r) => subSectorFilter === 'all' || companyMatches(r, companies, subSectorFilter))
    const col = COLS.find((c) => c.key === sortKey)!
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      // Nulls always sort to the bottom regardless of direction.
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (col.numeric) return ((av as number) - (bv as number)) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }, [rows, sortKey, sortDir, subSectorFilter, companies])

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      // Text columns default A→Z; numeric columns default high→low.
      setSortDir(COLS.find((c) => c.key === key)?.numeric ? 'desc' : 'asc')
    }
  }

  return (
    <div>
      <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Compare — All Brokers</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Click any column header to sort; click a row to open the company. FY26 financials from
            screener.in; P/E and P/B are approximate (computed off the flagged market cap). Blank =
            not in the deep-dive coverage set.
          </p>
        </div>
        <select
          value={subSectorFilter}
          onChange={(e) => setSubSectorFilter(e.target.value)}
          className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
        >
          <option value="all">All sub-sectors</option>
          {sector.subSectors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {COLS.map((c) => {
                const active = c.key === sortKey
                return (
                  <th
                    key={c.key}
                    className={`px-3 py-2 font-medium whitespace-nowrap cursor-pointer select-none hover:text-zinc-800 dark:hover:text-zinc-200 ${
                      c.align === 'right' ? 'text-right' : 'text-left'
                    } ${c.key === 'name' ? 'sticky left-0 bg-zinc-50 dark:bg-zinc-900/50' : ''}`}
                    onClick={() => toggleSort(c.key)}
                    aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    {c.label}
                    <span className="ml-1 inline-block w-2 text-zinc-400 dark:text-zinc-500">
                      {active ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr
                key={r.id}
                onClick={() => onSelectCompany(r.id)}
                className="border-t border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                {COLS.map((c) => (
                  <td
                    key={c.key}
                    className={`px-3 py-2 ${c.align === 'right' ? 'text-right tabular-nums' : 'text-left'} ${
                      c.key === 'name'
                        ? 'sticky left-0 bg-white dark:bg-zinc-950 font-medium text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {c.format(r)}
                    {c.key === 'mcap' && r.verifyMcap && (
                      <span className="ml-1 text-amber-500" title="Market cap approximate — verify">⚠</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
        {sorted.length} companies · ⚠ market cap approximate/unverified · sorted by{' '}
        {COLS.find((c) => c.key === sortKey)?.label} ({sortDir === 'asc' ? 'ascending' : 'descending'}).
        Nulls always sort last.
      </p>
    </div>
  )
}

// Kept separate so the sort memo stays readable; matches a row to a sub-sector filter.
function companyMatches(row: Row, companies: Company[], subSectorId: string): boolean {
  const c = companies.find((x) => x.id === row.id)
  return c?.subSectorId === subSectorId
}
