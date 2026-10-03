import type {
  BrokerActiveClientRow,
  BrokerIndustryRow,
  BrokerRegulatoryEvent,
} from '../types'

// Broker / capital-market-intermediary sector diagnostic data, assembled from
// web research on 2026-10-03 (NSE member-wise active-client data, CDSL/NSDL
// depository prints, AMFI SIP data, SEBI circulars, company updates, and
// secondary business-news coverage). This is the macro/competitive backdrop
// every company-level trigger and trend in this dashboard should be read
// against -- the broker analogue of the RBI tables (banks) and the
// capacity/trade-policy tables (steel/cement).

// ============================================================================
// THE ACTIVE-CLIENT LEAGUE TABLE IS THE SINGLE MOST-WATCHED COMPETITIVE METRIC.
// NSE publishes member-wise active clients (traded at least once in the last
// 12 months) monthly, so this is the cleanest public read on who is gaining
// and losing share. It INCLUDES the two unlisted giants (Zerodha, Upstox)
// because the listed names' share is meaningless without them -- isListed
// flags what is actually investable.
// ============================================================================
export const brokerActiveClientLeague: BrokerActiveClientRow[] = [
  { broker: 'Groww (Billionbrains)', isListed: true, ticker: 'GROWW', activeClientsMn: 13.35, sharePct: 29.04, yoyGrowthPct: 10.6, asOf: 'Aug-2026' },
  { broker: 'Zerodha', isListed: false, ticker: null, activeClientsMn: 6.8, sharePct: 14.79, yoyGrowthPct: -6.4, asOf: 'Aug-2026' },
  { broker: 'Angel One', isListed: true, ticker: 'ANGELONE', activeClientsMn: 6.72, sharePct: 14.62, yoyGrowthPct: -4.6, asOf: 'Aug-2026' },
  { broker: 'Upstox (RKSV)', isListed: false, ticker: null, activeClientsMn: 2.08, sharePct: 4.64, yoyGrowthPct: null, asOf: 'Dec-2025' },
]

export const brokerActiveClientNote =
  'As of Aug-2026, the top three (Groww, Zerodha, Angel One) are ~58.5% of all NSE active clients; the top four discount brokers run ~63-65%. The story in one line: Groww is taking share from the largest base (26.3% → 29.0% in a year) while Zerodha and Angel One shed active clients in absolute terms -- a share shift, not just a slowdown. Upstox figure is the Dec-2025 reading (4.64%, ~20.8 lakh clients); it was not in the Aug-2026 print checked, so it is shown at its own date rather than forced into the same month.'

export const brokerActiveClientSource =
  'NSE member-wise active-client data via Entrackr, Planify, Business Standard, StartupTalky (FY25 close + Aug-2026 / Dec-2025 reads). Re-pull from NSE "Business Growth of Capital Market" monthly for live figures.'

// Industry-wide backdrop. Each row is a separately-sourced reading at its own
// cadence (NSE monthly, CDSL/NSDL monthly, AMFI monthly, SEBI/exchange).
export const brokerIndustryAggregates: BrokerIndustryRow[] = [
  {
    metric: 'Total demat accounts',
    value: '21.6 crore',
    asOf: 'Dec-2025',
    source: 'CDSL + NSDL monthly data',
    note: 'CDSL ~17.3 cr (~80% share) / NSDL ~4.3 cr. The broadest "how many investors exist" number -- grows almost monotonically, the base case for the whole financialization thesis.',
  },
  {
    metric: 'CDSL demat accounts',
    value: '~17.3 crore',
    asOf: 'Q3 FY26',
    source: 'CDSL Q3 FY26 earnings',
    note: '+~75 lakh added in the quarter. New-account additions are the cleanest leading indicator of future active clients.',
  },
  {
    metric: 'NSE total active clients',
    value: '~4.57 crore',
    asOf: 'FY26',
    source: 'NSE via Angel One market update',
    note: 'DOWN ~7% over FY26 -- the active base actually shrank even as demat accounts grew. The F&O curbs pushed marginal traders out; this gap (accounts up, active down) is the single most important sector fact right now.',
  },
  {
    metric: 'Monthly SIP inflow',
    value: '₹32,297 crore',
    asOf: 'Aug-2026',
    source: 'AMFI',
    note: 'Record high, +14% YoY -- but the SIP stoppage ratio crossed 100% in Mar/Apr-2026 (more SIPs stopped/matured than started). Recurring MF flows are the stable counterweight to volatile broking revenue; this is what CAMS/KFin/Prudent/AMCs ride.',
  },
  {
    metric: 'Combined BSE+NSE equity ADTO',
    value: '~₹1 lakh crore',
    asOf: 'Q2 FY26',
    source: 'Exchange data / broker coverage',
    note: 'About 18% below the Sep-2024 quarter (the pre-curb peak). Turnover is the top line of the entire transaction-revenue pool -- down, and structurally so.',
  },
  {
    metric: 'Turnover fall, Sep-2024 → Mar-2025',
    value: 'Cash -19%, equity derivatives -27%',
    asOf: 'Mar-2025',
    source: 'CRISIL / business-news coverage',
    note: 'The direct, measured impact of the SEBI package below -- this is the hit, not a forecast.',
  },
]

// SEBI / exchange regulatory actions -- for brokers this is the dominant
// exogenous driver, the equivalent of trade policy for steel. The 2024-25
// derivatives + true-to-label package is why transaction revenue is under
// structural (not cyclical) pressure across the whole discount cohort.
export const brokerRegulatoryEvents: BrokerRegulatoryEvent[] = [
  {
    date: '2024-07-01',
    measure: 'True-to-label / uniform MII charges (end of slab-wise rebates)',
    status: 'Effective',
    detail:
      'SEBI directed exchanges/depositories to stop slab-wise (volume-based) fee structures and charge uniformly, with charges passed through "true to label". This removed the hidden margin discount brokers earned on the gap between slab rebates and flat charges billed to clients. Effective 01-Oct-2024. Industry revenue hit estimated ~₹2,000 Cr; discount brokers\' PBT hit ~15-25%.',
    source: 'SEBI circular (01-Jul-2024); Business Standard, ICRA, CRISIL',
  },
  {
    date: '2024-07-23',
    measure: 'STT hike on F&O (Union Budget FY25)',
    status: 'Effective',
    detail:
      'Securities Transaction Tax raised on options (0.0625% → 0.1% of premium on sale) and futures (0.0125% → 0.02%), effective 01-Oct-2024. Raises the all-in cost of F&O trading, directly dampening the most lucrative volume pool.',
    source: 'Union Budget 2024-25',
  },
  {
    date: '2024-09-30',
    measure: 'SEBI study: 91% of individual F&O traders lost money',
    status: 'Effective',
    detail:
      'SEBI\'s study found ~91% of individual equity-derivatives traders made net losses, aggregating ~₹1.8 lakh crore over FY22-24. Not a rule itself, but the political/regulatory justification for the curbs below -- worth tracking because it signals the direction of travel (more curbs, not fewer).',
    source: 'SEBI study (Sep-2024)',
  },
  {
    date: '2024-10-01',
    measure: 'Equity-index derivatives framework (6 measures)',
    status: 'Effective',
    detail:
      'The core F&O curb package, phased Nov-2024 to Apr-2025: (1) weekly index expiries cut to ONE per exchange (benchmark index only), from 20-Nov-2024; (2) minimum contract size raised to ₹15-20 lakh (from ₹5-10 lakh); (3) upfront collection of option premium from buyers; (4) removal of calendar-spread benefit on expiry day; (5) intraday monitoring of position limits (≥4 random snapshots/day) from 01-Apr-2025; (6) higher tail-risk (ELM) margins near expiry. Collectively designed to shrink retail options volume -- which it did (see turnover fall above).',
    source: 'SEBI circular "Measures to strengthen equity index derivatives" (Sep/Oct-2024)',
  },
  {
    date: '2023-10-01',
    measure: 'Upstreaming of client funds',
    status: 'Effective',
    detail:
      'Brokers must upstream idle client funds to clearing corporations daily (parked in overnight MFs/G-secs), rather than retaining float. Cut the float-income line that discount brokers historically earned on clients\' idle cash -- part of why interest income is now sourced increasingly from margin funding (MTF) instead.',
    source: 'SEBI circular (Jun-2023, phased)',
  },
  {
    date: '2025-08-21',
    measure: 'Possible lengthening of F&O expiry tenures / further tweaks',
    status: 'Under review',
    detail:
      'SEBI flagged as considering longer derivative tenures and other structural tweaks; BSE and Angel One slipped on the news. Status is under review -- track it, because expiry structure is the single biggest swing factor for exchange and discount-broker volumes.',
    source: 'Business Standard (21-Aug-2025)',
  },
]

// The written sector thesis -- the "why this does / doesn't pass the investment
// mandate" layer, analogous to cementCycleFinding / cementTrapFlag.
export const brokerSectorFinding =
  'Indian retail broking has moved through three models in a decade: percentage brokerage (full-service) → flat-fee/zero-delivery discount (Zerodha, then Angel One, Upstox, Groww) → and now a pivot BEYOND broking, because SEBI has made pure transaction revenue structurally unreliable. The 2024-25 package (true-to-label, F&O curbs, STT hike, upstreaming) is not a one-off shock -- it is a regime change that shrank the NSE active base ~7% in FY26 and knocked ~15-25% off discount brokers\' PBT. The survivors are diversifying their revenue into things that recur and compound: margin-trading (MTF) interest income, AMC/mutual-fund manufacturing, wealth management, and third-party distribution (loans, insurance, bonds). Angel One is the clearest listed case of this pivot -- interest income is now ~33% of gross revenue (from ~21% two years earlier), it has launched an AMC and is building credit distribution and a super-app. But it is simultaneously LOSING active-client share to Groww, which is out-executing on acquisition from the largest base. That is the central tension in the listed discount names: the market share leader (Groww) and the diversification leader (Angel One) are not the same company.';

export const brokerTrapFlag =
  'The honest risk: listed broker valuations capitalise peak-cycle, F&O-fuelled retail activity that regulators are deliberately trying to cool. Transaction revenue is high-beta to a trading boom that may not repeat; headline PAT comparisons are brutal (Angel One Q2 FY26 PAT -50% YoY). Treat broking revenue as cyclical and discount it; underwrite only the recurring/annuity lines (interest on a growing MTF book, AUM-linked fees, depository/RTA tolls). The cleanest way to own the "more Indians investing" theme without the trading-volume beta is the market-infrastructure names (CDSL, CAMS, KFin, and the exchanges) -- picks-and-shovels whose revenue scales with accounts, AUM and corporate actions rather than with how much retail churns its F&O book.';

export const brokerWatchItems: string[] = [
  'NSE monthly member-wise active clients -- the share league table. Watch Groww\'s share ceiling and whether Angel One/Zerodha\'s absolute declines reverse.',
  'F&O premium turnover and equity ADTO (NSE/BSE monthly) -- the transaction-revenue pool. Still ~18% below the pre-curb peak.',
  'Interest income as a share of gross revenue, and the MTF/funding-book size and yield, per company -- the single best gauge of the pivot away from broking.',
  'Any new SEBI/exchange derivatives rule (expiry tenure, contract size, suitability/eligibility norms) -- the dominant exogenous swing factor.',
  'AMFI monthly SIP inflow + stoppage ratio -- the recurring-flow counterweight that CAMS/KFin/Prudent/AMC arms ride.',
  'New-client additions AND blended ARPU together -- adding cheap tier-2/3 clients while ARPU falls can grow the base and shrink revenue at once.',
  'Demat-account additions (CDSL/NSDL) -- the leading indicator for the future active base, and the toll CDSL itself collects.',
  'BSE index-options market share vs NSE -- the one spot where the regulation created a winner rather than only shrinking the pie.',
]
