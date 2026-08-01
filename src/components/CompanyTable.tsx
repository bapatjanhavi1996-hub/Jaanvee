import { useMemo, useState } from 'react'
import type { Company, Sector } from '../types'

interface CompanyTableProps {
  sector: Sector
  companies: Company[]
}

function formatMcap(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(2)} L Cr`
  return `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr`
}

export function CompanyTable({ sector, companies }: CompanyTableProps) {
  const [subSectorFilter, setSubSectorFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return companies
      .filter((c) => {
        if (subSectorFilter !== 'all' && c.subSectorId !== subSectorFilter) return false
        if (
          search &&
          !c.name.toLowerCase().includes(search.toLowerCase()) &&
          !c.isin.toLowerCase().includes(search.toLowerCase())
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => b.marketCapCr - a.marketCapCr)
  }, [companies, subSectorFilter, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search company or ISIN…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
        />
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
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-2 font-medium">Company</th>
              <th className="px-4 py-2 font-medium">Sub-sector</th>
              <th className="px-4 py-2 font-medium text-right">Market cap</th>
              <th className="px-4 py-2 font-medium text-right">Price</th>
              <th className="px-4 py-2 font-medium text-right">P/BV</th>
              <th className="px-4 py-2 font-medium text-right">TTM PE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
                  {c.name}
                  {c.note && (
                    <span title={c.note} className="ml-1.5 text-xs text-amber-600 dark:text-amber-400">
                      ⚠
                    </span>
                  )}
                  <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{c.isin}</div>
                </td>
                <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                  {sector.subSectors.find((s) => s.id === c.subSectorId)?.name}
                </td>
                <td className="px-4 py-2 text-right text-zinc-900 dark:text-zinc-100 tabular-nums">
                  {formatMcap(c.marketCapCr)}
                </td>
                <td className="px-4 py-2 text-right text-zinc-600 dark:text-zinc-400 tabular-nums">
                  {c.latestPrice != null ? `₹${c.latestPrice.toLocaleString('en-IN')}` : '—'}
                </td>
                <td className="px-4 py-2 text-right text-zinc-600 dark:text-zinc-400 tabular-nums">
                  {c.priceToBV != null ? `${c.priceToBV}x` : '—'}
                </td>
                <td className="px-4 py-2 text-right text-zinc-600 dark:text-zinc-400 tabular-nums">
                  {c.ttmPE != null ? `${c.ttmPE}x` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">No companies match this filter.</p>
      )}
    </div>
  )
}
