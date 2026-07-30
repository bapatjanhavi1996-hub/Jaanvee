export type ViewId = 'overview' | 'triggers' | 'universe' | 'log'

const TABS: { id: ViewId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'triggers', label: 'Triggers' },
  { id: 'universe', label: 'Company Universe' },
  { id: 'log', label: 'Tracking Log' },
]

interface TabNavProps {
  active: ViewId
  onChange: (id: ViewId) => void
}

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800 mb-6 overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            active === tab.id
              ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
