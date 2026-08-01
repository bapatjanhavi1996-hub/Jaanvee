import type { TrackingLogEntry } from '../types'

// Seed entries from initial research (July 2026). This log is meant to grow
// over time — each fired trigger gets a new entry here, newest first.
export const trackingLog: TrackingLogEntry[] = [
  {
    id: 'log-2026-06-mpc',
    date: '2026-06-06',
    sectorId: 'banks',
    triggerId: 'bank-monetary-policy',
    companyIds: [],
    headline: 'RBI MPC holds repo rate at 5.25%, retains neutral stance',
    detail:
      'The Monetary Policy Committee kept the repo rate unchanged at 5.25% in its June 2026 meeting, balancing inflation risk against growth support. RBI projected FY27 GDP growth at 6.9%.',
    source: 'RBI MPC resolution, June 2026',
    impact: 'Neutral',
  },
  {
    id: 'log-2026-03-gnpa',
    date: '2026-03-31',
    sectorId: 'banks',
    triggerId: 'bank-asset-quality',
    companyIds: [],
    headline: 'System-wide GNPA falls to a multi-decadal low of 1.8%',
    detail:
      'RBI’s Financial Stability Report noted gross NPAs across scheduled banks fell to 1.8% as of March 2026 — the lowest in decades — though the report flagged a possible drift up to 1.9% by March 2028 under baseline stress scenarios.',
    source: 'RBI Financial Stability Report',
    impact: 'Positive',
  },
  {
    id: 'log-2026-01-colending',
    date: '2026-01-01',
    sectorId: 'nbfc',
    triggerId: 'nbfc-colending',
    companyIds: [],
    headline: 'RBI’s revised Co-Lending Arrangements Directions take effect',
    detail:
      'New RBI co-lending rules for banks and NBFCs/HFCs came into force. A 10% loan-retention requirement reduces the lending pool available to capital-constrained NBFCs, and operational/IT costs are increasingly being passed to borrowers — raising effective cost of credit for co-lent books.',
    source: 'RBI Co-Lending Arrangements Directions, 2025 (effective Jan 2026)',
    impact: 'Watch',
  },
  {
    id: 'log-2026-nbfc-divide',
    date: '2026-05-15',
    sectorId: 'nbfc',
    triggerId: 'nbfc-regulatory-action',
    companyIds: [],
    headline: 'Tighter RBI lending rules widen the gap between strong and weak NBFCs',
    detail:
      'Continued RBI scrutiny, tighter unsecured-lending rules, and higher risk weights are separating well-managed NBFCs from those that expanded too aggressively. Well-capitalized mid-cap NBFCs are reported to be gaining share from banks and weaker peers, helped by improving liquidity and funding costs.',
    source: 'Market commentary, RBI regulatory filings',
    impact: 'Watch',
  },
]
