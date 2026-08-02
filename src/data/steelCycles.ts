import type { SeriesPoint } from '../components/MiniLineChart'

// 20-year cycle history for the Indian steel sector. Research date 2026-08-02.
// Coverage is genuinely uneven across series -- pre-2018 India capacity/demand
// data and coking-coal/steel-price benchmarks have no clean free tier-1 annual
// source that could be retrieved in this environment, so those years are left
// as gaps (null/omitted) rather than estimated. See the per-series notes below,
// surfaced in the UI next to each chart.

export const steelCapacityMt: SeriesPoint[] = [
  { label: 'FY12*', value: 84.46 },
  { label: 'FY19', value: 142.0, gapBefore: true },
  { label: 'FY20', value: 142.3 },
  { label: 'FY21', value: 142.7 },
  { label: 'FY22', value: 154.06 },
  { label: 'FY23', value: 161.3 },
  { label: 'FY24', value: 179.51 },
  { label: 'FY25', value: 198.5 },
  { label: 'FY26P', value: 220.3 },
]
export const steelCapacityNote =
  '*FY12 is an annualized Apr-Dec 2011 partial-year read (JPC), not a clean fiscal-year close -- directional only. No reliable capacity figure found for FY13-FY18. FY25/FY26 are provisional; FY25 conflicts with a second cited figure of 200.3 Mt. Source: JPC / Ministry of Steel Annual Report 2025-26, PIB.'

export const steelDemandMt: SeriesPoint[] = [
  { label: 'FY15', value: 77 },
  { label: 'FY16', value: 80.5 },
  { label: 'FY20', value: 100.17, gapBefore: true },
  { label: 'FY21', value: 101.03 },
  { label: 'FY22', value: 106 },
  { label: 'FY24', value: 136.29, gapBefore: true },
  { label: 'FY25', value: 152 },
  { label: 'FY26P', value: 163.7 },
]
export const steelDemandNote =
  'FY07-FY11 figures exist in sources checked but were excluded: an unexplained ~48% jump between FY10 (46 Mt) and FY11 (68 Mt) suggests a change in series definition/scope, not a genuine one-year demand surge -- including it would mislead rather than inform. FY23 not found. FY25/FY26 provisional. Source: JPC / Ministry of Steel, PIB.'

export const steelCapacityUtilizationPct: SeriesPoint[] = [
  { label: 'FY12', value: 84 },
  { label: 'FY20', value: 78, gapBefore: true },
  { label: 'FY21', value: 70 },
  { label: 'FY22', value: 78.1 },
  { label: 'FY23', value: 78.9 },
  { label: 'FY24', value: 80.4 },
  { label: 'FY25', value: 76.2 },
]
export const steelCapacityUtilizationNote =
  'FY20-21 are directly-reported JPC figures; FY22-25 are derived (production/capacity) since no direct figure was found for those years. FY24 derived figure (80.4%) conflicts with an ICRA-reported 85% -- likely a different utilization concept/denominator. No data found for FY13-19.'

export const ironOreUsdTonne: SeriesPoint[] = [
  { label: '2012', value: 128 },
  { label: '2013', value: 135 },
  { label: '2014', value: 97 },
  { label: '2015', value: 63 },
  { label: '2016', value: 65.9 },
  { label: '2018', value: 93.0, gapBefore: true },
  { label: '2019', value: 93.85 },
  { label: '2021', value: 158.17, gapBefore: true },
  { label: '2022', value: 120.7 },
  { label: '2023', value: 120.32 },
  { label: '2024', value: 111.06 },
  { label: '2025', value: 103.72 },
]
export const ironOreNote =
  '62% Fe CFR China, calendar-year average (World Bank Pink Sheet / FRED PIORECRUSDA). 2006-2011, 2017 and 2020 not found or unit-ambiguous in sources checked. 2015 revised between Pink Sheet vintages (57.5 vs 63 -- 63 shown here). 2019 conflicts with a second cited figure of $112.15/t, likely monthly rather than annual -- $93.85 shown as the more probable annual average.'

export interface ReferencePoint {
  label: string
  value: number
  note: string
}

export const cokingCoalReferencePoints: ReferencePoint[] = [
  { label: '2008', value: 300, note: 'Record annual contract price (widely cited)' },
  { label: '2009', value: 130, note: 'April 2009 annual contract' },
  { label: '2019', value: 180, note: 'Approximate -- conflicting press citations of $176-186' },
  { label: '2021', value: 160, note: 'Approximate -- conflicting press citations of $158-162' },
  { label: '2022', value: 400, note: 'Peak spot price only, not a full-year average (crossed $400+/t at the peak)' },
]
export const cokingCoalCaveat =
  'No clean free tier-1 annual-average source exists for coking coal -- the World Bank Pink Sheet "Coal, Australia" series is thermal coal, not coking/metallurgical coal. These are isolated press-cited reference points, not a continuous index -- directional only. A proper series would need a paid feed (S&P Platts, Fastmarkets, Argus).'

export const steelPriceReferencePoints: ReferencePoint[] = [
  { label: '2006', value: 634, note: 'Low confidence -- source/methodology unverified' },
  { label: '2008', value: 1113, note: 'Pre-GFC peak (28-Jul-2008)' },
  { label: '2009', value: 651, note: 'Post-GFC -- flagged as possibly unreliable, seems high for the well-documented 2009 collapse' },
  { label: '2015-16', value: 283, note: 'Trough (28-Dec-2015)' },
  { label: '2017', value: 516, note: '13-Feb-2017 spot' },
  { label: '2021', value: 1945, note: 'All-time high (Sep-2021 commodity supercycle peak)' },
  { label: '2022', value: 1550, note: 'Russia-Ukraine war shock peak (28-Mar-2022)' },
]
export const steelPriceCaveat =
  'World Export HRC, SteelBenchmarker (WSD/CRU) -- the right free 20-year benchmark (weekly data since Apr-2006), but its full history could not be retrieved in this environment, so what\'s shown is scattered spot/peak quotes from press citations, not clean annual averages. Still useful for the shape of the cycle: 2008 pre-GFC peak, 2009 collapse, 2015-16 anti-dumping-era trough, the 2021 all-time-high supercycle, and the 2022 war-shock spike.'

export const ebitdaPerTonneReferencePoints: (ReferencePoint & { fullYear: boolean })[] = [
  { label: 'FY16 Q4', value: 7959, note: 'Quarterly -- anti-dumping-era trough', fullYear: false },
  { label: 'FY18 Q2', value: 19000, note: 'Quarterly -- described as a 6-year high at the time', fullYear: false },
  { label: 'FY21 Q4', value: 27775, note: 'Quarterly', fullYear: false },
  { label: 'FY22', value: 28863, note: 'Full year, high confidence -- commodity supercycle peak', fullYear: true },
  { label: 'FY25 Q4', value: 12463, note: 'Quarterly', fullYear: false },
  { label: 'FY26', value: 15213, note: 'Full year, high confidence', fullYear: true },
]
export const ebitdaPerTonneCaveat =
  'Tata Steel India standalone/segment EBITDA per tonne, used as a single-company cyclicality proxy -- there is no public industry-wide EBITDA/tonne series. Only two full-year figures (FY22, FY26) were found with high confidence; the rest are quarterly snapshots included for directional context only, not comparable to the full-year figures.'
