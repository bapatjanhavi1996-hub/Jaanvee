import type { BrokerMetricQuarter } from '../types'

// Broker-specific per-quarter operating metrics, researched from business
// updates, investor presentations and concall coverage (research date
// 2026-10-03). Pilot coverage only -- Angel One is deepest because its
// disclosure is best among the listed names; Groww has one point from its
// IPO offer document. Everything else is intentionally empty for now: the
// smaller full-service names disclose little beyond the statutory P&L, and
// the real competitive read for the whole sector lives in the active-client
// league table in brokerSectorAggregates.ts, not here.
//
// Every number is sourced per row. Null means not reliably sourced for that
// quarter -- not zero, and not estimated. Note the headline P&L (income /
// PAT) lives in quarterlyFinancials.ts; this table is the operating layer
// (clients, market share, funding book, interest-income mix).
export const brokerMetrics: Record<string, BrokerMetricQuarter[]> = {
  'angel-one-ltd': [
    {
      period: 'Jun-2026',
      totalClientsMn: null,
      nseActiveClientsMn: null,
      activeClientShare: null,
      grossBrokingRevenueCr: null,
      interestIncomeCr: null,
      interestIncomeShare: 32.6,
      clientFundingBookCr: 7150,
      source:
        'Q1 FY27 business update & slides (Jul-2026): consolidated revenue ₹1,430 Cr (+25.4% YoY), PAT ₹231 Cr (+102% YoY, -27.8% QoQ); funding book ₹71.5bn period-end (avg ₹61.4bn); interest income 32.6% of gross revenue (vs ~21% in Q1 FY25) — Investing.com, FreePressJournal, ScanX',
    },
    {
      period: 'Mar-2026',
      totalClientsMn: null,
      nseActiveClientsMn: null,
      activeClientShare: null,
      grossBrokingRevenueCr: null,
      interestIncomeCr: null,
      interestIncomeShare: null,
      clientFundingBookCr: null,
      source:
        'FY26 full year: total income ₹5,152 Cr, PAT ₹915 Cr, 6.9m clients added (full-year figures, not a clean Q4 quarterly split) — Whalesbook',
    },
    {
      period: 'Sep-2025',
      totalClientsMn: 34.08,
      nseActiveClientsMn: 7.3,
      activeClientShare: null,
      grossBrokingRevenueCr: null,
      interestIncomeCr: null,
      interestIncomeShare: null,
      clientFundingBookCr: 5310,
      source:
        'Q2 FY26 (Sep-2025): revenue ₹1,202 Cr (-20.7% YoY), PAT ₹212 Cr (-49.9% YoY); client base 34.08m (+24% YoY), ~7.3m NSE active; avg funding book ₹5,310 Cr (all-time high at the time) — AlphaStreet, Ebharat',
    },
    {
      period: 'Mar-2025',
      totalClientsMn: null,
      nseActiveClientsMn: 7.58,
      activeClientShare: null,
      grossBrokingRevenueCr: null,
      interestIncomeCr: null,
      interestIncomeShare: null,
      clientFundingBookCr: null,
      source:
        'FY25 close: NSE active clients 7.58m (+24% YoY) — Planify/Business Standard (11-Apr-2026 coverage)',
    },
  ],
  'billionbrains-garage-ventures-ltd': [
    {
      period: 'Jun-2025',
      totalClientsMn: 14.0,
      nseActiveClientsMn: 12.6,
      activeClientShare: null,
      grossBrokingRevenueCr: null,
      interestIncomeCr: null,
      interestIncomeShare: null,
      clientFundingBookCr: null,
      source:
        'IPO offer document (RHP): >14m active users, >12.6m NSE active clients as of June. FY25 revenue from ops ₹3,901.7 Cr, PAT ₹1,824.4 Cr (turnaround from a ₹805 Cr FY24 loss driven by a one-time tax charge on the domicile shift to India) — TechCrunch, chittorgarh',
    },
  ],
}
