import { useMemo, useState } from 'react'
import { sectors } from './data/sectors'
import { companies as bankNbfcCompanies } from './data/companies'
import { steelCompanies } from './data/steelCompanies'
import { triggers } from './data/triggers'
import { trackingLog } from './data/trackingLog'
import { quarterlyFinancials as bankNbfcQuarterlyFinancials } from './data/quarterlyFinancials'
import { steelQuarterlyFinancials } from './data/steelQuarterlyFinancials'
import { bankMetrics } from './data/bankMetrics'
import { steelMetrics } from './data/steelMetrics'
import { managementCommentary } from './data/managementCommentary'
import { Sidebar } from './components/Sidebar'
import { TabNav, type ViewId } from './components/TabNav'
import { SectorOverview } from './components/SectorOverview'
import { TriggerList } from './components/TriggerList'
import { CompanyTable } from './components/CompanyTable'
import { TrackingLog } from './components/TrackingLog'
import { CompanyDetail } from './components/CompanyDetail'
import { SectorAggregates } from './components/SectorAggregates'

const companies = [...bankNbfcCompanies, ...steelCompanies]
const quarterlyFinancials = { ...bankNbfcQuarterlyFinancials, ...steelQuarterlyFinancials }

function App() {
  const [selectedSectorId, setSelectedSectorId] = useState(sectors[0].id)
  const [view, setView] = useState<ViewId>('overview')
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

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

  const selectedCompany = selectedCompanyId
    ? companies.find((c) => c.id === selectedCompanyId)
    : null
  const selectedCompanySector = selectedCompany
    ? sectors.find((s) => s.id === selectedCompany.sectorId)
    : null
  const selectedCompanySubSectorName = selectedCompany
    ? selectedCompanySector?.subSectors.find((s) => s.id === selectedCompany.subSectorId)?.name ?? ''
    : ''

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row">
      <Sidebar
        sectors={sectors}
        selectedSectorId={selectedSectorId}
        onSelectSector={(id) => {
          setSelectedSectorId(id)
          setView('overview')
          setSelectedCompanyId(null)
        }}
      />
      <main className="flex-1 p-4 sm:p-6 max-w-6xl">
        {selectedCompany ? (
          <CompanyDetail
            company={selectedCompany}
            subSectorName={selectedCompanySubSectorName}
            quarters={quarterlyFinancials[selectedCompany.id] ?? []}
            bankQuarters={bankMetrics[selectedCompany.id] ?? []}
            steelQuarters={steelMetrics[selectedCompany.id] ?? []}
            commentary={managementCommentary.filter((c) => c.companyId === selectedCompany.id)}
            onBack={() => setSelectedCompanyId(null)}
          />
        ) : (
          <>
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
            {view === 'sectorData' && <SectorAggregates sectorId={sector.id} />}
            {view === 'universe' && (
              <CompanyTable
                sector={sector}
                companies={sectorCompanies}
                onSelectCompany={setSelectedCompanyId}
              />
            )}
            {view === 'log' && (
              <TrackingLog entries={sectorLog} triggers={sectorTriggers} companies={sectorCompanies} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
