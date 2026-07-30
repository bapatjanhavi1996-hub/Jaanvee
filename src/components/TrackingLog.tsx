import { useMemo, useState } from 'react'
import type { Company, TrackingLogEntry, Trigger, TriggerImpact } from '../types'

interface TrackingLogProps {
  entries: TrackingLogEntry[]
  triggers: Trigger[]
  companies: Company[]
}

const IMPACT_STYLES: Record<TriggerImpact, string> = {
  Positive: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  Negative: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  Neutral: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  Watch: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
}

export function TrackingLog({ entries, triggers, companies }: TrackingLogProps) {
  const [impactFilter, setImpactFilter] = useState<TriggerImpact | 'all'>('all')

  const sorted = useMemo(() => {
    return [...entries]
      .filter((e) => impactFilter === 'all' || e.impact === impactFilter)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [entries, impactFilter])

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Filter:</span>
        {(['all', 'Positive', 'Negative', 'Neutral', 'Watch'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setImpactFilter(v)}
            className={`rounded-full px-3 py-1 text-xs border transition-colors ${
              impactFilter === v
                ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sorted.map((entry) => {
          const trigger = triggers.find((t) => t.id === entry.triggerId)
          const relatedCompanies = companies.filter((c) => entry.companyIds.includes(c.id))
          return (
            <div key={entry.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{entry.headline}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {entry.date} · {trigger?.name ?? 'Unknown trigger'}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${IMPACT_STYLES[entry.impact]}`}>
                  {entry.impact}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{entry.detail}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span>Source: {entry.source}</span>
                {relatedCompanies.length > 0 && (
                  <span>
                    · Related:{' '}
                    {relatedCompanies.map((c) => c.ticker).join(', ')}
                  </span>
                )}
              </div>
            </div>
          )
        })}
        {sorted.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No entries match this filter.</p>
        )}
      </div>
    </div>
  )
}
