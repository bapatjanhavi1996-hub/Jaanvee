import { useMemo, useState } from 'react'
import type { Company, Sector } from '../types'

interface CompanyTableProps {
  sector: Sector
  companies: Company[]
}

const TIER_STYLES: Record<Company['mcapTier'], string> = {
  Large: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  Mid: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Small: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
}

export function CompanyTable({ sector, companies }: CompanyTableProps) {
  const [subSectorFilter, setSubSectorFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (subSectorFilter !== 'all' && c.subSectorId !== subSectorFilter) return false
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.ticker.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      return true
    })
  }, [companies, subSectorFilter, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search company or ticker…"
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
              <th className="px-4 py-2 font-medium">Ticker</th>
              <th className="px-4 py-2 font-medium">Sub-sector</th>
              <th className="px-4 py-2 font-medium">Mcap tier</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">{c.name}</td>
                <td className="px-4 py-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">{c.ticker}</td>
                <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                  {sector.subSectors.find((s) => s.id === c.subSectorId)?.name}
                </td>
                <td className="px-4 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${TIER_STYLES[c.mcapTier]}`}>
                    {c.mcapTier}
                  </span>
                  {c.verifyMcap && (
                    <span
                      title="Borderline vs the >1,000 Cr threshold — verify current market cap"
                      className="ml-1.5 text-xs text-amber-600 dark:text-amber-400"
                    >
                      ⚠
                    </span>
                  )}
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
