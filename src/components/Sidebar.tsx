import type { Sector } from '../types'

interface SidebarProps {
  sectors: Sector[]
  selectedSectorId: string
  onSelectSector: (id: string) => void
}

export function Sidebar({ sectors, selectedSectorId, onSelectSector }: SidebarProps) {
  return (
    <nav className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 p-4">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          India Markets
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Trigger Dashboard</p>
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
        Sectors
      </p>
      <ul className="space-y-1">
        {sectors.map((sector) => (
          <li key={sector.id}>
            <button
              type="button"
              onClick={() => onSelectSector(sector.id)}
              disabled={sector.status === 'planned'}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedSectorId === sector.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : sector.status === 'planned'
                    ? 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {sector.name}
              {sector.status === 'planned' && (
                <span className="ml-2 text-xs">(planned)</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 p-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Universe filter: listed companies with market cap &gt; ₹1,000 Cr. Add
          the next sector in{' '}
          <code className="text-[11px]">src/data/sectors.ts</code>.
        </p>
      </div>
    </nav>
  )
}
