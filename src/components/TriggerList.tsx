import type { Trigger } from '../types'

interface TriggerListProps {
  triggers: Trigger[]
}

export function TriggerList({ triggers }: TriggerListProps) {
  const categories = Array.from(new Set(triggers.map((t) => t.category)))

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-3">
            {category}
          </h3>
          <div className="space-y-3">
            {triggers
              .filter((t) => t.category === category)
              .map((trigger) => (
                <TriggerCard key={trigger.id} trigger={trigger} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TriggerCard({ trigger }: { trigger: Trigger }) {
  return (
    <details className="group rounded-lg border border-zinc-200 dark:border-zinc-800 open:shadow-sm">
      <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 list-none">
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-50">{trigger.name}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{trigger.description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
          {trigger.frequency}
        </span>
      </summary>
      <div className="border-t border-zinc-100 dark:border-zinc-800 p-4 space-y-3 text-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-1">
            Why it matters
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">{trigger.whyItMatters}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-1">
            What to watch for
          </p>
          <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 space-y-0.5">
            {trigger.watchFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-1">
            Typical source
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">{trigger.typicalSource}</p>
        </div>
      </div>
    </details>
  )
}
