import type { BankMetricQuarter } from '../types'

// Bank/NBFC-specific quarterly metrics (Deposits, Advances/AUM, NIM, CASA, cost of
// funds, GNPA/NNPA, cost-to-income) researched from investor presentations and
// concalls -- not available in the bulk Ace Equity export. Pilot coverage only
// (large-cap names); extend company by company as time allows.
// Every number here is sourced -- see `source` per quarter. NBFCs have no CASA
// (they don't take retail deposits), so `casa` is null for those rows.
export const bankMetrics: Record<string, BankMetricQuarter[]> = {}
