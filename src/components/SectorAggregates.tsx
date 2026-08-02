import { repoRateHistory, systemCreditDeposit, systemAssetQuality, nbfcSectorAggregates } from '../data/sectorAggregates'
import { steelProduction, steelH1Fy26ProductionNote, steelPriceBenchmarks, steelTradePolicy } from '../data/steelSectorAggregates'
import {
  steelCapacityMt,
  steelCapacityNote,
  steelDemandMt,
  steelDemandNote,
  steelCapacityUtilizationPct,
  steelCapacityUtilizationNote,
  ironOreUsdTonne,
  ironOreNote,
  cokingCoalReferencePoints,
  cokingCoalCaveat,
  steelPriceReferencePoints,
  steelPriceCaveat,
  ebitdaPerTonneReferencePoints,
  ebitdaPerTonneCaveat,
} from '../data/steelCycles'
import { MiniLineChart } from './MiniLineChart'

interface SectorAggregatesProps {
  sectorId: string
}

export function SectorAggregates({ sectorId }: SectorAggregatesProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Sector Data</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
          {sectorId === 'steel'
            ? 'System-wide steel production, pricing and trade-policy data — the macro backdrop every company-level trigger and trend in this dashboard should be read against.'
            : 'System-wide RBI/industry aggregates — the macro backdrop every company-level trigger and trend in this dashboard should be read against.'}
        </p>
      </div>

      {sectorId !== 'steel' && (
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
          RBI Repo Rate
        </h3>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium text-right">Repo Rate</th>
                <th className="px-4 py-2 font-medium">Action</th>
                <th className="px-4 py-2 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {repoRateHistory.slice().reverse().map((r) => (
                <tr key={r.date} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">{r.rate}%</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        r.action === 'Cut'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : r.action === 'Hike'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                            : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {r.action}
                      {r.changeBps !== 0 ? ` ${r.changeBps} bps` : ''}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Cumulative cut since Feb-2025 is 125 bps (6.50% → 5.25%) per RBI/press coverage; only 75
          bps of that is individually dated above — the remaining ~50 bps was cut across one or
          more mid-2025 meetings not individually confirmed in sources checked.
        </p>
      </section>
      )}

      {sectorId === 'banks' && (
        <>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
              System Credit &amp; Deposit Growth (Scheduled Commercial Banks)
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">As of</th>
                    <th className="px-4 py-2 font-medium text-right">Credit Growth YoY</th>
                    <th className="px-4 py-2 font-medium text-right">Deposit Growth YoY</th>
                    <th className="px-4 py-2 font-medium text-right">CD Ratio</th>
                    <th className="px-4 py-2 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {systemCreditDeposit.slice().reverse().map((p) => (
                    <tr key={p.asOf} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{p.asOf}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.creditGrowthYoy != null ? `${p.creditGrowthYoy}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.depositGrowthYoy != null ? `${p.depositGrowthYoy}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.cdRatio != null ? `${p.cdRatio}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">{p.note ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Sources: {Array.from(new Set(systemCreditDeposit.map((p) => p.source))).join(' · ')}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
              System Asset Quality &amp; Capitalisation
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              GNPA/NNPA/CRAR/CET1 come from the RBI Financial Stability Report, published
              semi-annually (as of end-March and end-September) — that is genuinely the finest
              cadence these are disclosed at. CASA and CD ratio are sourced separately at whatever
              date has the nearest available reading; where that date doesn't line up exactly with
              the FSR date, the actual reading date is shown in parentheses.
            </p>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">As of</th>
                    <th className="px-4 py-2 font-medium text-right">GNPA</th>
                    <th className="px-4 py-2 font-medium text-right">NNPA</th>
                    <th className="px-4 py-2 font-medium text-right">CRAR</th>
                    <th className="px-4 py-2 font-medium text-right">CET1</th>
                    <th className="px-4 py-2 font-medium text-right">CASA</th>
                    <th className="px-4 py-2 font-medium text-right">CD Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {systemAssetQuality.slice().reverse().map((p) => (
                    <tr key={p.asOf} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{p.asOf}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.gnpa != null ? `${p.gnpa}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.nnpa != null ? `${p.nnpa}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.crar != null ? `${p.crar}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.cet1 != null ? `${p.cet1}%` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.casa != null ? (
                          <>
                            {p.casa}%
                            {p.casaAsOf && p.casaAsOf !== p.asOf && (
                              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">({p.casaAsOf})</span>
                            )}
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.cdRatio != null ? (
                          <>
                            {p.cdRatio}%
                            {p.cdRatioAsOf && p.cdRatioAsOf !== p.asOf && (
                              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">({p.cdRatioAsOf})</span>
                            )}
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 space-y-1">
              {systemAssetQuality.slice().reverse().map((p) => (
                <p key={p.asOf} className="text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium">{p.asOf}:</span> {p.source}
                </p>
              ))}
            </div>
          </section>
        </>
      )}

      {sectorId === 'nbfc' && (
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
            NBFC Sector Aggregates
          </h3>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="px-4 py-2 font-medium">As of</th>
                  <th className="px-4 py-2 font-medium text-right">Sector AUM</th>
                  <th className="px-4 py-2 font-medium">Credit Growth Guidance</th>
                  <th className="px-4 py-2 font-medium text-right">Microfinance GNPA</th>
                </tr>
              </thead>
              <tbody>
                {nbfcSectorAggregates.slice().reverse().map((p) => (
                  <tr key={p.asOf} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{p.asOf}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                      {p.aumRsLakhCr != null ? `₹${p.aumRsLakhCr}L Cr` : '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">{p.creditGrowthGuidance ?? '—'}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                      {p.microfinanceGnpa != null ? `${p.microfinanceGnpa}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {nbfcSectorAggregates[0]?.source}
          </p>
        </section>
      )}

      {sectorId === 'steel' && (
        <>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
              India Crude Steel Production
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Month</th>
                    <th className="px-4 py-2 font-medium text-right">Crude Steel Production</th>
                    <th className="px-4 py-2 font-medium text-right">YoY Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {steelProduction.slice().reverse().map((p) => (
                    <tr key={p.month} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{p.month}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.crudeSteelProductionMt != null ? `${p.crudeSteelProductionMt} Mt` : '—'}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100">
                        {p.productionGrowthYoyPct != null ? `${p.productionGrowthYoyPct}%` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{steelH1Fy26ProductionNote}</p>
            <div className="mt-1 space-y-0.5">
              {Array.from(new Set(steelProduction.map((p) => p.source))).map((s) => (
                <p key={s} className="text-xs text-zinc-400 dark:text-zinc-500">{s}</p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
              Price &amp; Cost Benchmarks
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              Unlike RBI banking data, there is no single free authoritative index for Indian steel
              prices — SteelMint/BigMint/Kallanish are the industry-standard sources and are
              paywalled. Each figure below is a separately-sourced spot reading with its own as-of
              date; domestic HRC/rebar are directional ranges from commercial listings, not
              benchmark index prints.
            </p>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Metric</th>
                    <th className="px-4 py-2 font-medium text-right">Reading</th>
                    <th className="px-4 py-2 font-medium">As of</th>
                    <th className="px-4 py-2 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">Domestic HRC (ex-plant)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {steelPriceBenchmarks.domesticHrcPriceRange ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {steelPriceBenchmarks.domesticHrcAsOf ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">{steelPriceBenchmarks.domesticHrcNote}</td>
                  </tr>
                  <tr className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">Domestic Rebar / TMT (12mm Fe500D)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {steelPriceBenchmarks.domesticRebarPriceRange ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {steelPriceBenchmarks.domesticRebarAsOf ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">{steelPriceBenchmarks.domesticRebarNote}</td>
                  </tr>
                  <tr className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">China HRC Export (FOB Tianjin)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {steelPriceBenchmarks.chinaHrcFobUsdTonne != null ? `$${steelPriceBenchmarks.chinaHrcFobUsdTonne}/t` : '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {steelPriceBenchmarks.chinaHrcFobAsOf ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">
                      The key global benchmark/floor Indian domestic prices are compared against.
                    </td>
                  </tr>
                  <tr className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">Iron Ore (domestic fines, 58-60% Fe)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {steelPriceBenchmarks.ironOreDomesticRsTonne != null ? `₹${steelPriceBenchmarks.ironOreDomesticRsTonne.toLocaleString('en-IN')}/t` : '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {steelPriceBenchmarks.ironOreAsOf ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">{steelPriceBenchmarks.ironOreNote}</td>
                  </tr>
                  <tr className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">Coking Coal (Australian premium HCC, FOB)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {steelPriceBenchmarks.cokingCoalUsdTonne != null ? `$${steelPriceBenchmarks.cokingCoalUsdTonne}/t` : '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                      {steelPriceBenchmarks.cokingCoalAsOf ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">
                      Single bid observation, not a weekly index — India imports ~85% of coking coal requirement.
                    </td>
                  </tr>
                  <tr className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">Industry Capacity Utilization</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {steelPriceBenchmarks.capacityUtilizationPct != null ? `${steelPriceBenchmarks.capacityUtilizationPct}%` : '—'}
                    </td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">—</td>
                    <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">{steelPriceBenchmarks.capacityUtilizationNote}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
              Trade Policy
            </h3>
            <div className="space-y-3">
              {steelTradePolicy.map((e) => (
                <div key={`${e.date}-${e.product}`} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{e.measure}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{e.date} · {e.product}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${
                        e.status === 'Imposed' || e.status === 'Extended'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : e.status === 'Expired'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{e.detail}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Source: {e.source}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2">
              20-Year Cycle History
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              Steel is deeply cyclical -- this is meant to help you recognize where in the cycle
              you are by seeing it against the last two decades, not just the last few quarters.
              Coverage is genuinely uneven: recent years (roughly FY19 onward, and iron ore since
              2012) have solid sourced data; older years and two series in particular (coking coal,
              steel price benchmark) have no clean free long-run index available, so those are
              shown as scattered reference points rather than a continuous chart. Gaps are gaps,
              not zeros -- read each chart's caption before drawing conclusions from it.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <MiniLineChart title="India Steel Capacity" unit="Mt (installed)" points={steelCapacityMt} format={(v) => `${v} Mt`} />
                <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">{steelCapacityNote}</p>
              </div>
              <div>
                <MiniLineChart title="India Steel Demand" unit="Mt (finished steel)" points={steelDemandMt} format={(v) => `${v} Mt`} />
                <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">{steelDemandNote}</p>
              </div>
              <div>
                <MiniLineChart title="India Capacity Utilization" unit="%" points={steelCapacityUtilizationPct} format={(v) => `${v}%`} />
                <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">{steelCapacityUtilizationNote}</p>
              </div>
              <div>
                <MiniLineChart title="Iron Ore Price" unit="USD/tonne, 62% Fe CFR China" points={ironOreUsdTonne} format={(v) => `$${v}/t`} />
                <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">{ironOreNote}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ReferencePointPanel title="Coking Coal (reference points, USD/tonne)" points={cokingCoalReferencePoints} caveat={cokingCoalCaveat} format={(v) => `$${v}/t`} />
              <ReferencePointPanel title="Steel Price Benchmark (reference points, World Export HRC USD/tonne)" points={steelPriceReferencePoints} caveat={steelPriceCaveat} format={(v) => `$${v}/t`} />
              <ReferencePointPanel
                title="EBITDA/tonne (Tata Steel proxy, ₹/tonne)"
                points={ebitdaPerTonneReferencePoints}
                caveat={ebitdaPerTonneCaveat}
                format={(v) => `₹${v.toLocaleString('en-IN')}/t`}
              />
            </div>
          </section>
        </>
      )}
    </div>
  )
}

interface ReferencePointPanelProps {
  title: string
  points: { label: string; value: number; note: string }[]
  caveat: string
  format: (v: number) => string
}

function ReferencePointPanel({ title, points, caveat, format }: ReferencePointPanelProps) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">{title}</p>
      <div className="space-y-2">
        {points.map((p) => (
          <div key={p.label}>
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{p.label}</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-medium tabular-nums whitespace-nowrap">{format(p.value)}</span>
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-snug">{p.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">{caveat}</p>
    </div>
  )
}
