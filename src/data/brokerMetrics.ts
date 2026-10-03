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
      totalClientsMn: 38.59,
      nseActiveClientsMn: 6.63,
      activeClientShare: 14.59,
      grossBrokingRevenueCr: 859,
      interestIncomeCr: 467,
      interestIncomeShare: 32.6,
      clientFundingBookCr: 7152,
      source:
        'Q1 FY27 Investor Presentation (15-Jul-2026): total clients 38.59m (+18.8% YoY); NSE active 6.63m / 14.59% share (NSE data via StartupTalky); rev from ops ₹1,429.7 Cr (+25.4%), PAT ₹231 Cr (+102%); revenue mix gross broking 60.1% / interest 32.6% / distribution 3.0%; funding book ₹7,152 Cr period-end; MF AUM ₹20,600 Cr, AMC AUM ₹620 Cr, Wealth AUM ₹13,440 Cr',
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
      period: 'Jun-2026',
      totalClientsMn: 22.4,
      nseActiveClientsMn: 13.05,
      activeClientShare: 28.72,
      grossBrokingRevenueCr: 1059,
      interestIncomeCr: null,
      interestIncomeShare: 19.1,
      clientFundingBookCr: 3775,
      source:
        "Q1 FY27 Shareholders' Letter (15-Jul-2026): 22.4m transacting users (+24% YoY); NSE active 13.05m / 28.72% share (NSE data via StartupTalky); rev from ops ₹1,501 Cr (+66%), PAT ₹735 Cr (+94%, 47.5% margin); income mix equity-derivs 52% / stocks 16.4% / MTF 8.1% / float 8.0% / credit 5.5% — interest+float ≈19.1% (NOT directly comparable to Angel One's interest-income definition); MTF book ₹3,775 Cr (+264% YoY); direct MF AUM ₹1.9 lakh cr; AMC AUM ₹5,491 Cr",
    },
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
