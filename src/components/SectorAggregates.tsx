import { repoRateHistory, systemCreditDeposit, systemAssetQuality, nbfcSectorAggregates } from '../data/sectorAggregates'

interface SectorAggregatesProps {
  sectorId: string
}

export function SectorAggregates({ sectorId }: SectorAggregatesProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Sector Data</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
          System-wide RBI/industry aggregates — the macro backdrop every company-level trigger
          and trend in this dashboard should be read against.
        </p>
      </div>

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
              {repoRateHistory.map((r) => (
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
                  {systemCreditDeposit.map((p) => (
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
                  {systemAssetQuality.map((p) => (
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
              {systemAssetQuality.map((p) => (
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
                {nbfcSectorAggregates.map((p) => (
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
    </div>
  )
}
