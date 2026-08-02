import type { SteelMetricQuarter } from '../types'

// Company-level steel operating metrics (realization/tonne, EBITDA/tonne,
// capacity utilization, net debt/EBITDA) require a proper quarterly data
// export -- same lesson learned from the Ace Equity file for banks/NBFC.
// Left empty pending the user's own data upload; populate per company as
// `"company-id": [{ period: 'Q1 FY27', ... }, ...]` once available.
export const steelMetrics: Record<string, SteelMetricQuarter[]> = {}
