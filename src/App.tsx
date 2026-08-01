import { useMemo, useState } from 'react'
import { sectors } from './data/sectors'
import { companies } from './data/companies'
import { triggers } from './data/triggers'
import { trackingLog } from './data/trackingLog'
import { Sidebar } from './components/Sidebar'
import { TabNav, type ViewId } from './components/TabNav'
import { SectorOverview } from './components/SectorOverview'
import { TriggerList } from './components/TriggerList'
import { CompanyTable } from './components/CompanyTable'
import { TrackingLog } from './components/TrackingLog'

function App() {
  const [selectedSectorId, setSelectedSectorId] = useState(sectors[0].id)
  const [view, setView] = useState<ViewId>('overview')

  const sector = sectors.find((s) => s.id === selectedSectorId) ?? sectors[0]
  const sectorCompanies = useMemo(
    () => companies.filter((c) => c.sectorId === sector.id),
    [sector],
  )
  const sectorTriggers = useMemo(
    () => triggers.filter((t) => t.sectorId === sector.id),
    [sector],
  )
  const sectorLog = useMemo(
    () => trackingLog.filter((l) => l.sectorId === sector.id),
    [sector],
  )

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row">
      <Sidebar
        sectors={sectors}
        selectedSectorId={selectedSectorId}
        onSelectSector={(id) => {
          setSelectedSectorId(id)
          setView('overview')
        }}
      />
      <main className="flex-1 p-4 sm:p-6 max-w-5xl">
        <TabNav active={view} onChange={setView} />

        {view === 'overview' && (
          <SectorOverview
            sector={sector}
            companies={sectorCompanies}
            triggers={sectorTriggers}
            recentLog={[...sectorLog].sort((a, b) => (a.date < b.date ? 1 : -1))}
          />
        )}
        {view === 'triggers' && <TriggerList triggers={sectorTriggers} />}
        {view === 'universe' && <CompanyTable sector={sector} companies={sectorCompanies} />}
        {view === 'log' && (
          <TrackingLog entries={sectorLog} triggers={sectorTriggers} companies={sectorCompanies} />
        )}
      </main>
    </div>
  )
}

export default App
