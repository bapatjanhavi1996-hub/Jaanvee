import type { Company, Sector, Trigger, TrackingLogEntry } from '../types'

interface SectorOverviewProps {
  sector: Sector
  companies: Company[]
  triggers: Trigger[]
  recentLog: TrackingLogEntry[]
}

export function SectorOverview({ sector, companies, triggers, recentLog }: SectorOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{sector.name}</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
          {sector.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Companies tracked" value={companies.length} />
        <StatCard label="Sub-sectors" value={sector.subSectors.length} />
        <StatCard label="Trigger types" value={triggers.length} />
        <StatCard label="Recent log entries" value={recentLog.length} />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
          Sub-sectors
        </p>
        <div className="flex flex-wrap gap-2">
          {sector.subSectors.map((s) => {
            const count = companies.filter((c) => c.subSectorId === s.id).length
            return (
              <span
                key={s.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300"
              >
                {s.name}
                <span className="text-zinc-400 dark:text-zinc-500">{count}</span>
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
          Latest tracked triggers
        </p>
        <div className="space-y-2">
          {recentLog.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3 text-sm"
            >
              <div className="flex justify-between gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-50">{entry.headline}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{entry.date}</span>
              </div>
            </div>
          ))}
          {recentLog.length === 0 && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No entries logged yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
      <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  )
}
