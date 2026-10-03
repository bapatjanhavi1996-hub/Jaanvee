import type { BankMetricQuarter, BrokerFinancialYear, BrokerKpi, BrokerMetricQuarter, BrokerThesis, CementMetricQuarter, Company, ManagementCommentary, QuarterlyFinancial, SteelMetricQuarter } from '../types'
import { heatColor, heatTextColor } from '../lib/heatmap'

interface CompanyDetailProps {
  company: Company
  subSectorName: string
  quarters: QuarterlyFinancial[]
  bankQuarters: BankMetricQuarter[]
  steelQuarters: SteelMetricQuarter[]
  cementQuarters: CementMetricQuarter[]
  brokerQuarters: BrokerMetricQuarter[]
  brokerYears: BrokerFinancialYear[]
  thesis: BrokerThesis | null
  brokerKpis: BrokerKpi[]
  commentary: ManagementCommentary[]
  onBack: () => void
}

function formatCr(v: number | null) {
  if (v == null) return '—'
  return v.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

function formatPct(v: number | null) {
  if (v == null) return '—'
  return `${v.toFixed(1)}%`
}

interface Row {
  label: string
  values: (number | null)[]
  higherIsBetter: boolean
  format: (v: number | null) => string
}

function HeatRow({ row }: { row: Row }) {
  return (
    <tr className="border-t border-zinc-100 dark:border-zinc-800">
      <td className="px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap sticky left-0 bg-white dark:bg-zinc-950">
        {row.label}
      </td>
      {row.values.map((v, i) => (
        <td
          key={i}
          className="px-3 py-1.5 text-sm text-right tabular-nums"
          style={{
            backgroundColor: heatColor(v, row.values, row.higherIsBetter),
            color: v != null ? heatTextColor() : undefined,
          }}
        >
          <span className="text-zinc-600 dark:text-zinc-400" style={v != null ? { color: heatTextColor() } : undefined}>
            {row.format(v)}
          </span>
        </td>
      ))}
    </tr>
  )
}

function toAscending(periods: string[], rows: Row[]): { periods: string[]; rows: Row[] } {
  return {
    periods: periods.slice().reverse(),
    rows: rows.map((row) => ({ ...row, values: row.values.slice().reverse() })),
  }
}

export function CompanyDetail({ company, subSectorName, quarters, bankQuarters, steelQuarters, cementQuarters, brokerQuarters, brokerYears, thesis, brokerKpis, commentary, onBack }: CompanyDetailProps) {
  // All source data (quarters/bankQuarters/steelQuarters) is newest-first --
  // QoQ math below depends on that order. Columns are flipped to oldest-first
  // (left to right) only at the very end, via toAscending(), for display.
  const periods = quarters.map((q) => q.period)

  const totalIncome = quarters.map((q) => q.totalIncome)
  const opProfit = quarters.map((q) => q.operatingProfit)
  const pat = quarters.map((q) => q.pat)
  const opMargin = quarters.map((q) => (q.operatingProfit != null ? (q.operatingProfit / q.totalIncome) * 100 : null))
  const patMargin = quarters.map((q) => (q.pat != null ? (q.pat / q.totalIncome) * 100 : null))
  const qoqGrowth = quarters.map((q, i) => {
    const next = quarters[i + 1]
    if (!next) return null
    return ((q.totalIncome - next.totalIncome) / next.totalIncome) * 100
  })

  const { periods: periodsAsc, rows: trendRows } = toAscending(periods, [
    { label: 'Total Income (₹ Cr)', values: totalIncome, higherIsBetter: true, format: formatCr },
    { label: 'QoQ Growth (%)', values: qoqGrowth, higherIsBetter: true, format: formatPct },
    { label: 'Operating Profit (₹ Cr)', values: opProfit, higherIsBetter: true, format: formatCr },
    { label: 'Operating Margin (%)', values: opMargin, higherIsBetter: true, format: formatPct },
    { label: 'PAT (₹ Cr)', values: pat, higherIsBetter: true, format: formatCr },
    { label: 'Net Margin (%)', values: patMargin, higherIsBetter: true, format: formatPct },
  ])

  const hasCasa = bankQuarters.some((q) => q.casa != null)
  const { periods: bankPeriodsAsc, rows: bankRows } = toAscending(
    bankQuarters.map((q) => q.period),
    bankQuarters.length
      ? [
          { label: 'Deposits (₹ Cr)', values: bankQuarters.map((q) => q.deposits), higherIsBetter: true, format: formatCr },
          { label: 'Advances / AUM (₹ Cr)', values: bankQuarters.map((q) => q.advancesOrAum), higherIsBetter: true, format: formatCr },
          { label: 'NIM (%)', values: bankQuarters.map((q) => q.nim), higherIsBetter: true, format: formatPct },
          ...(hasCasa
            ? [{ label: 'CASA (%)', values: bankQuarters.map((q) => q.casa), higherIsBetter: true, format: formatPct }]
            : []),
          { label: 'Cost of Funds (%)', values: bankQuarters.map((q) => q.costOfFunds), higherIsBetter: false, format: formatPct },
          { label: 'GNPA (%)', values: bankQuarters.map((q) => q.gnpa), higherIsBetter: false, format: formatPct },
          { label: 'NNPA (%)', values: bankQuarters.map((q) => q.nnpa), higherIsBetter: false, format: formatPct },
          { label: 'Cost-to-Income (%)', values: bankQuarters.map((q) => q.costToIncome), higherIsBetter: false, format: formatPct },
        ]
      : [],
  )

  const bankSources = Array.from(new Set(bankQuarters.map((q) => q.source).filter(Boolean)))

  const { periods: steelPeriodsAsc, rows: steelRows } = toAscending(
    steelQuarters.map((q) => q.period),
    steelQuarters.length
      ? [
          { label: 'Sales Volume (tonnes)', values: steelQuarters.map((q) => q.salesVolumeTonnes), higherIsBetter: true, format: formatCr },
          { label: 'Realization (₹/tonne)', values: steelQuarters.map((q) => q.realizationPerTonne), higherIsBetter: true, format: formatCr },
          { label: 'EBITDA/tonne (₹)', values: steelQuarters.map((q) => q.ebitdaPerTonne), higherIsBetter: true, format: formatCr },
          { label: 'Capacity Utilization (%)', values: steelQuarters.map((q) => q.capacityUtilization), higherIsBetter: true, format: formatPct },
          { label: 'Net Debt/EBITDA (x)', values: steelQuarters.map((q) => q.netDebtToEbitda), higherIsBetter: false, format: (v) => (v != null ? `${v.toFixed(1)}x` : '—') },
        ]
      : [],
  )

  const steelSources = Array.from(new Set(steelQuarters.map((q) => q.source).filter(Boolean)))

  const { periods: cementPeriodsAsc, rows: cementRows } = toAscending(
    cementQuarters.map((q) => q.period),
    cementQuarters.length
      ? [
          { label: 'Capacity (MTPA)', values: cementQuarters.map((q) => q.capacityMtpa), higherIsBetter: true, format: (v) => (v != null ? `${v} MTPA` : '—') },
          { label: 'Production (Mt)', values: cementQuarters.map((q) => q.productionMt), higherIsBetter: true, format: (v) => (v != null ? `${v} Mt` : '—') },
          { label: 'Capacity Utilization (%)', values: cementQuarters.map((q) => q.capacityUtilization), higherIsBetter: true, format: formatPct },
          { label: 'Sales Volume (tonnes)', values: cementQuarters.map((q) => q.salesVolumeTonnes), higherIsBetter: true, format: formatCr },
          { label: 'Realization (₹/tonne)', values: cementQuarters.map((q) => q.realizationPerTonne), higherIsBetter: true, format: formatCr },
          { label: 'Production Cost (₹/tonne)', values: cementQuarters.map((q) => q.productionCostPerTonne), higherIsBetter: false, format: formatCr },
          { label: 'EBITDA/tonne (₹)', values: cementQuarters.map((q) => q.ebitdaPerTonne), higherIsBetter: true, format: formatCr },
          { label: 'Net Debt/EBITDA (x)', values: cementQuarters.map((q) => q.netDebtToEbitda), higherIsBetter: false, format: (v) => (v != null ? `${v.toFixed(1)}x` : '—') },
        ]
      : [],
  )

  const cementSources = Array.from(new Set(cementQuarters.map((q) => q.source).filter(Boolean)))

  const { periods: brokerPeriodsAsc, rows: brokerRows } = toAscending(
    brokerQuarters.map((q) => q.period),
    brokerQuarters.length
      ? [
          { label: 'Total Clients (m)', values: brokerQuarters.map((q) => q.totalClientsMn), higherIsBetter: true, format: (v) => (v != null ? `${v.toFixed(2)}m` : '—') },
          { label: 'NSE Active Clients (m)', values: brokerQuarters.map((q) => q.nseActiveClientsMn), higherIsBetter: true, format: (v) => (v != null ? `${v.toFixed(2)}m` : '—') },
          { label: 'Active-Client Share (%)', values: brokerQuarters.map((q) => q.activeClientShare), higherIsBetter: true, format: formatPct },
          { label: 'Gross Broking Revenue (₹ Cr)', values: brokerQuarters.map((q) => q.grossBrokingRevenueCr), higherIsBetter: true, format: formatCr },
          { label: 'Interest Income (₹ Cr)', values: brokerQuarters.map((q) => q.interestIncomeCr), higherIsBetter: true, format: formatCr },
          { label: 'Interest Income Share (%)', values: brokerQuarters.map((q) => q.interestIncomeShare), higherIsBetter: true, format: formatPct },
          { label: 'Client Funding Book / MTF (₹ Cr)', values: brokerQuarters.map((q) => q.clientFundingBookCr), higherIsBetter: true, format: formatCr },
        ]
      : [],
  )

  const brokerSources = Array.from(new Set(brokerQuarters.map((q) => q.source).filter(Boolean)))

  const { periods: finPeriodsAsc, rows: finRows } = toAscending(
    brokerYears.map((y) => y.fy),
    brokerYears.length
      ? [
          { label: 'Revenue (₹ Cr)', values: brokerYears.map((y) => y.salesCr), higherIsBetter: true, format: formatCr },
          { label: 'Operating Profit (₹ Cr)', values: brokerYears.map((y) => y.operatingProfitCr), higherIsBetter: true, format: formatCr },
          { label: 'Operating Margin (%)', values: brokerYears.map((y) => y.opmPct), higherIsBetter: true, format: formatPct },
          { label: 'Net Profit (₹ Cr)', values: brokerYears.map((y) => y.netProfitCr), higherIsBetter: true, format: formatCr },
          {
            label: 'Net Margin (%)',
            values: brokerYears.map((y) => (y.netProfitCr != null && y.salesCr ? (y.netProfitCr / y.salesCr) * 100 : null)),
            higherIsBetter: true,
            format: formatPct,
          },
          { label: 'ROE (%)', values: brokerYears.map((y) => y.roePct), higherIsBetter: true, format: formatPct },
          { label: 'Net Worth (₹ Cr)', values: brokerYears.map((y) => y.netWorthCr), higherIsBetter: true, format: formatCr },
          { label: 'Borrowings (₹ Cr)', values: brokerYears.map((y) => y.borrowingsCr), higherIsBetter: false, format: formatCr },
        ]
      : [],
  )

  const finSources = Array.from(new Set(brokerYears.map((y) => y.source).filter(Boolean)))
  const latestFin = brokerYears[0] ?? null
  // Valuation is computed off the (flagged, approximate) market cap -- directional only.
  const peApprox = latestFin?.netProfitCr && latestFin.netProfitCr > 0 ? company.marketCapCr / latestFin.netProfitCr : null
  const pbApprox = latestFin?.netWorthCr && latestFin.netWorthCr > 0 ? company.marketCapCr / latestFin.netWorthCr : null

  const themes: ManagementCommentary['theme'][] = [
    'Asset Quality',
    'Growth',
    'CASA / Funding Mix',
    'NIM / Margins',
    'Cost of Borrowings',
    'Opex Efficiency',
    'Realization / Pricing',
    'Raw Material Costs',
    'Capacity Utilization & Expansion',
    'Demand Outlook',
    'Trade Policy Impact',
    'Balance Sheet / Leverage',
    'Active Clients / Market Share',
    'Revenue Diversification',
    'Funding Book / MTF',
    'Regulatory Impact',
    'New Products / Platform',
  ]

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← Back to Company Universe
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{company.name}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">{company.isin}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span>{subSectorName}</span>
          <span>·</span>
          <span>Mcap ₹{(company.marketCapCr / 1000).toFixed(0)}K Cr</span>
          {company.latestPrice != null && (
            <>
              <span>·</span>
              <span>₹{company.latestPrice}</span>
            </>
          )}
          {company.ttmPE != null && (
            <>
              <span>·</span>
              <span>PE {company.ttmPE}x</span>
            </>
          )}
        </div>
        {company.note && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">⚠ {company.note}</p>
        )}
      </div>

      {thesis && (
        <section className="mb-8">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-5">
            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{thesis.tagline}</p>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">The pitch</p>
                <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{thesis.pitch}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">The numbers</p>
                <p className="mt-0.5 text-zinc-700 dark:text-zinc-300 tabular-nums">{thesis.numbers}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-rose-600 dark:text-rose-400">The risk</p>
                <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{thesis.risk}</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500">
              Editorial synthesis for orientation — not advice. Read it against the financials and
              operating metrics below.
            </p>
          </div>
        </section>
      )}

      {company.sectorId === 'brokers' && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            Financials &amp; Ratios (Annual)
          </h3>
          {finRows.length > 0 ? (
            <>
              {(peApprox != null || pbApprox != null) && (
                <div className="mb-3 flex flex-wrap gap-3">
                  {peApprox != null && (
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2">
                      <p className="text-[11px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">P/E ≈</p>
                      <p className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{peApprox.toFixed(1)}x</p>
                    </div>
                  )}
                  {pbApprox != null && (
                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2">
                      <p className="text-[11px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">P/B ≈</p>
                      <p className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{pbApprox.toFixed(1)}x</p>
                    </div>
                  )}
                  <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 px-3 py-2 max-w-xs">
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                      Valuation computed from the latest FY and the (approximate, flagged) market
                      cap — directional only, verify.
                    </p>
                  </div>
                </div>
              )}
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="text-sm border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <th className="px-3 py-2 text-left font-medium sticky left-0 bg-zinc-50 dark:bg-zinc-900/50">Particulars</th>
                      {finPeriodsAsc.map((p) => (
                        <th key={p} className="px-3 py-2 text-right font-medium whitespace-nowrap">
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {finRows.map((row) => (
                      <HeatRow key={row.label} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
              {finSources.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">Sources: {finSources.join(' · ')}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
              Annual financials not yet loaded for this company. Coverage is the 11 core,
              well-disclosed names; the smaller full-service names need per-company pulls from
              screener.in / filings.
            </p>
          )}
        </section>
      )}

      {company.sectorId === 'brokers' && brokerKpis.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            Operating KPIs (latest)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {brokerKpis.map((k) => (
              <div key={k.label} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{k.label}</p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{k.asOf}</p>
                </div>
                <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">{k.value}</p>
                {k.note && <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400">{k.note}</p>}
                <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">{k.source}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {quarters.length > 0 && (
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
          Quarterly Trend
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          Consolidated, oldest quarter first (left to right). This is the context layer — read the
          tracking-log triggers against this trend, not in isolation.
        </p>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <th className="px-3 py-2 text-left font-medium sticky left-0 bg-zinc-50 dark:bg-zinc-900/50">Particulars</th>
                {periodsAsc.map((p) => (
                  <th key={p} className="px-3 py-2 text-right font-medium whitespace-nowrap">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trendRows.map((row) => (
                <HeatRow key={row.label} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}

      {(company.sectorId === 'banks' || company.sectorId === 'nbfc') && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            Bank / NBFC Metrics
          </h3>
          {bankRows.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="text-sm border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <th className="px-3 py-2 text-left font-medium sticky left-0 bg-zinc-50 dark:bg-zinc-900/50">Particulars</th>
                      {bankPeriodsAsc.map((p) => (
                        <th key={p} className="px-3 py-2 text-right font-medium whitespace-nowrap">
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bankRows.map((row) => (
                      <HeatRow key={row.label} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
              {bankSources.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                  Sources: {bankSources.join(' · ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
              Not yet researched for this company — Deposits/AUM, NIM, CASA, cost of funds and
              asset-quality trend aren't in the bulk data export and need per-company research.
              Currently populated for a pilot set of large-cap names.
            </p>
          )}
        </section>
      )}

      {company.sectorId === 'steel' && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            Steel Operating Metrics
          </h3>
          {steelRows.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="text-sm border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <th className="px-3 py-2 text-left font-medium sticky left-0 bg-zinc-50 dark:bg-zinc-900/50">Particulars</th>
                      {steelPeriodsAsc.map((p) => (
                        <th key={p} className="px-3 py-2 text-right font-medium whitespace-nowrap">
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {steelRows.map((row) => (
                      <HeatRow key={row.label} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
              {steelSources.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                  Sources: {steelSources.join(' · ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
              No sales volume, realization/tonne, EBITDA/tonne or net debt data loaded for this
              company yet — this needs a proper quarterly export, not the bulk screener data.
            </p>
          )}
        </section>
      )}

      {company.sectorId === 'cement' && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            Cement Operating Metrics
          </h3>
          {cementRows.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="text-sm border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <th className="px-3 py-2 text-left font-medium sticky left-0 bg-zinc-50 dark:bg-zinc-900/50">Particulars</th>
                      {cementPeriodsAsc.map((p) => (
                        <th key={p} className="px-3 py-2 text-right font-medium whitespace-nowrap">
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cementRows.map((row) => (
                      <HeatRow key={row.label} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
              {cementSources.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                  Sources: {cementSources.join(' · ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
              No capacity, production, utilization or EBITDA/tonne data loaded for this company yet.
            </p>
          )}
        </section>
      )}

      {company.sectorId === 'brokers' && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            Broker Operating Metrics
          </h3>
          {brokerRows.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="text-sm border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <th className="px-3 py-2 text-left font-medium sticky left-0 bg-zinc-50 dark:bg-zinc-900/50">Particulars</th>
                      {brokerPeriodsAsc.map((p) => (
                        <th key={p} className="px-3 py-2 text-right font-medium whitespace-nowrap">
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {brokerRows.map((row) => (
                      <HeatRow key={row.label} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
              {brokerSources.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                  Sources: {brokerSources.join(' · ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
              No client/market-share, funding-book or revenue-mix data loaded for this company yet.
              Pilot coverage is deepest for Angel One (best disclosure among the listed names); the
              sector-wide active-client league table lives under the Sector Data tab. Many smaller
              full-service and market-infrastructure names disclose little beyond the statutory P&L.
            </p>
          )}
        </section>
      )}

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
          Management Commentary
        </h3>
        {commentary.length > 0 ? (
          <div className="space-y-4">
            {themes.map((theme) => {
              const entries = commentary.filter((c) => c.theme === theme)
              if (entries.length === 0) return null
              return (
                <div key={theme}>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{theme}</p>
                  <div className="space-y-2">
                    {entries.map((c) => (
                      <div key={c.id} className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3 text-sm">
                        <p className="text-zinc-700 dark:text-zinc-300">{c.summary}</p>
                        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                          {c.quarter} · {c.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
            No concall/investor-presentation commentary logged yet for this company. Pilot
            coverage is limited to a handful of large-cap names for now.
          </p>
        )}
      </section>
    </div>
  )
}
