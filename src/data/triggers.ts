import type { Trigger } from '../types'

export const triggers: Trigger[] = [
  // ---------------- BANKS ----------------
  {
    id: 'bank-monetary-policy',
    sectorId: 'banks',
    category: 'Macro / Policy',
    name: 'RBI Monetary Policy (MPC)',
    description:
      'The RBI Monetary Policy Committee meets every two months to set the repo rate and policy stance (accommodative / neutral / hawkish).',
    whyItMatters:
      'Repo rate direction drives banks’ net interest margins (NIM) via deposit re-pricing lag vs loan re-pricing speed. Rate cuts initially squeeze NIM (loans reprice faster than term deposits), then help once deposit costs catch down.',
    watchFor: [
      'Repo rate change (bps) and stance language',
      'Commentary on liquidity (surplus/deficit), CRR/SLR',
      'Bank Nifty reaction on policy day',
    ],
    typicalSource: 'RBI MPC resolution (bi-monthly), RBI press conference',
    frequency: 'Bi-monthly (RBI MPC)',
  },
  {
    id: 'bank-credit-deposit-growth',
    sectorId: 'banks',
    category: 'Macro / Systemic',
    name: 'Systemic Credit & Deposit Growth',
    description:
      'RBI publishes fortnightly/monthly data on bank credit growth, deposit growth, and sectoral credit deployment (retail, industry, services, agri).',
    whyItMatters:
      'A widening gap between credit growth and deposit growth pushes up the credit-deposit ratio, forcing banks to compete harder for deposits (raising cost of funds) or slow loan growth.',
    watchFor: [
      'YoY credit growth vs deposit growth trend',
      'Which segment is driving growth (retail unsecured vs corporate vs MSME)',
      'System-wide credit-deposit (CD) ratio',
    ],
    typicalSource: 'RBI Sectoral Deployment of Bank Credit release (monthly)',
    frequency: 'Monthly',
  },
  {
    id: 'bank-asset-quality',
    sectorId: 'banks',
    category: 'Fundamentals',
    name: 'Asset Quality Cycle (GNPA / NNPA / Slippages)',
    description:
      'Gross and net NPA ratios, slippage ratio, restructured book, and provision coverage ratio (PCR) reported each quarter.',
    whyItMatters:
      'Rising slippages or falling PCR signal future credit cost (provisioning expense) that directly hits profitability, even if reported NPA looks stable this quarter.',
    watchFor: [
      'GNPA/NNPA trend QoQ and YoY',
      'Slippage ratio and where it is coming from (retail/agri/MSME)',
      'Commentary on stress in unsecured retail or MFI-linked books',
    ],
    typicalSource: 'Quarterly results, investor presentations, RBI Financial Stability Report',
    frequency: 'Quarterly',
  },
  {
    id: 'bank-quarterly-results',
    sectorId: 'banks',
    category: 'Fundamentals',
    name: 'Quarterly Results (NII, NIM, Fee Income, PAT)',
    description:
      'Net interest income, NIM trajectory, fee/other income, opex ratio, provisions and PAT reported each quarter.',
    whyItMatters:
      'NIM trend is the single biggest swing factor for bank earnings; fee income growth signals franchise strength beyond pure lending spread.',
    watchFor: [
      'NIM expansion/compression QoQ',
      'Provisioning surprises (one-off vs recurring)',
      'Management commentary/guidance on next 2-3 quarters',
    ],
    typicalSource: 'Company results, earnings call transcripts',
    frequency: 'Quarterly',
  },
  {
    id: 'bank-regulatory-norms',
    sectorId: 'banks',
    category: 'Regulatory',
    name: 'Regulatory & Prudential Norm Changes',
    description:
      'RBI changes to risk weights, LCR/NSFR liquidity norms, priority sector lending (PSL) targets, ECL-based provisioning transition, project finance provisioning.',
    whyItMatters:
      'These directly change capital consumption and provisioning requirements — can swing reported profitability and capital ratios without any change in underlying credit quality.',
    watchFor: [
      'Draft RBI circulars/discussion papers (comment period = early warning)',
      'Final circular effective dates',
      'Bank-specific capital impact disclosed in exchange filings',
    ],
    typicalSource: 'RBI circulars, draft guidelines, exchange filings',
    frequency: 'Event-driven',
  },
  {
    id: 'bank-capital-raising',
    sectorId: 'banks',
    category: 'Corporate Action',
    name: 'Capital Raising & Corporate Actions',
    description:
      'QIPs, AT1/Tier-II bond issuances, rights issues, buybacks, promoter/government stake sales, block deals.',
    whyItMatters:
      'Dilutive raises can pressure near-term EPS/RoE but fund growth; buybacks/stake sales move float and near-term price action.',
    watchFor: [
      'Board approval for fund raise and instrument type',
      'Pricing vs market price (discount/premium)',
      'Government stake sale plans for PSU banks (disinvestment)',
    ],
    typicalSource: 'Exchange filings (BSE/NSE), board meeting outcomes',
    frequency: 'Event-driven',
  },
  {
    id: 'bank-treasury-yields',
    sectorId: 'banks',
    category: 'Macro',
    name: 'Treasury & G-Sec Yield Moves',
    description:
      'Movements in government bond yields affect mark-to-market gains/losses on the AFS/HFT investment book.',
    whyItMatters:
      'Sharp yield spikes can cause treasury losses that dent one quarter’s PAT even when core lending business is healthy — important to separate one-off from core trend.',
    watchFor: [
      '10-year G-Sec yield trend intra-quarter',
      'Treasury gain/loss line in results',
      'Bank’s AFS book duration and size disclosed in presentations',
    ],
    typicalSource: 'Bond market data, quarterly results',
    frequency: 'Continuous / Real-time',
  },
  {
    id: 'bank-management-governance',
    sectorId: 'banks',
    category: 'Governance',
    name: 'Management & Governance Changes',
    description:
      'CEO/MD transitions (require RBI approval for private banks), board changes, whistleblower complaints, fraud disclosures, RBI action on individual banks.',
    whyItMatters:
      'Leadership uncertainty or RBI restrictions (e.g. business restrictions, moratoriums) can cause sharp de-ratings independent of fundamentals.',
    watchFor: [
      'RBI approval/rejection of CEO reappointment',
      'Sudden resignations of CEO/CFO/auditor',
      'RBI supervisory action, penalties, or business restrictions',
    ],
    typicalSource: 'Exchange filings, RBI press releases',
    frequency: 'Event-driven',
  },
  {
    id: 'bank-ma-consolidation',
    sectorId: 'banks',
    category: 'Corporate Action',
    name: 'M&A / Consolidation',
    description: 'Bank mergers, PSU bank consolidation, stake acquisitions, small finance bank universal banking license conversions.',
    whyItMatters:
      'Consolidation changes competitive intensity and can trigger re-rating for both acquirer and target.',
    watchFor: ['Government/RBI signals on PSU consolidation', 'Approved SFB-to-universal-bank conversions', 'Stake acquisition announcements'],
    typicalSource: 'Government/RBI statements, exchange filings',
    frequency: 'Event-driven',
  },
  {
    id: 'bank-budget-policy',
    sectorId: 'banks',
    category: 'Macro / Policy',
    name: 'Union Budget & Government Policy',
    description: 'Annual budget announcements on bank recapitalization, disinvestment targets, financial inclusion schemes, tax changes.',
    whyItMatters: 'Directly affects PSU bank capital position and sector-wide credit growth themes (e.g. infra push, agri credit targets).',
    watchFor: ['Recapitalization allocation for PSU banks', 'Disinvestment/privatization plans', 'Any changes to bank taxation or NPS/insurance-linked banking rules'],
    typicalSource: 'Union Budget documents (February)',
    frequency: 'Annual',
  },
  {
    id: 'bank-fii-flows',
    sectorId: 'banks',
    category: 'Flows',
    name: 'FII/DII Flows & Global Risk Sentiment',
    description: 'Foreign and domestic institutional flows into financials, and global rate-cycle sentiment given banks are the largest weight in Indian indices.',
    whyItMatters: 'Banks are ~35% of Nifty weight — flow-driven moves can dominate over fundamentals in the short run and create tactical opportunities.',
    watchFor: ['Daily FII/DII cash market data', 'Global risk-on/risk-off cues (US rates, dollar index)'],
    typicalSource: 'NSDL/depository data, exchange bulletins',
    frequency: 'Daily',
  },
  {
    id: 'bank-digital-disruption',
    sectorId: 'banks',
    category: 'Structural',
    name: 'Digital & Fintech Disruption',
    description: 'UPI market share shifts, account aggregator adoption, digital lending guidelines, embedded finance/fintech partnerships.',
    whyItMatters: 'Changes customer acquisition cost and cross-sell economics over a multi-year horizon; regulatory tightening on digital lending affects partnership-based NBFC/bank models.',
    watchFor: ['RBI digital lending guideline updates', 'Large bank-fintech partnership announcements or terminations'],
    typicalSource: 'RBI guidelines, company announcements',
    frequency: 'Event-driven',
  },

  // ---------------- NBFCs ----------------
  {
    id: 'nbfc-regulatory-action',
    sectorId: 'nbfc',
    category: 'Regulatory',
    name: 'RBI Regulatory Actions on NBFCs',
    description:
      'Scale-Based Regulation (SBR) tightening, risk weights on unsecured/consumer credit, co-lending arrangement directions, gold-loan LTV/valuation rules.',
    whyItMatters:
      'NBFCs run on regulatory arbitrage vs banks — every tightening cycle (like the 2023-2025 unsecured lending crackdown) directly raises capital requirements or caps growth for specific segments.',
    watchFor: [
      'Draft RBI directions and comment-period feedback',
      'Effective dates and grandfathering clauses',
      'Segment-specific rule changes (gold LTV, MFI qualifying assets, co-lending retention %)',
    ],
    typicalSource: 'RBI circulars/master directions',
    frequency: 'Event-driven',
  },
  {
    id: 'nbfc-cost-of-funds',
    sectorId: 'nbfc',
    category: 'Macro / Liquidity',
    name: 'Cost of Funds & System Liquidity',
    description:
      'Systemic liquidity conditions (surplus/deficit), CP/NCD spreads over G-Sec, bank funding lines to NBFCs, securitization/PTC market activity.',
    whyItMatters:
      'Unlike banks, NBFCs don’t have retail deposits — their margins are hostage to wholesale funding cost. A liquidity squeeze (like 2018 IL&FS or 2019-20) can be existential for weaker names.',
    watchFor: [
      'CP/NCD spreads widening for NBFCs vs AAA corporates',
      'RBI liquidity operations (VRR/VRRR, OMOs)',
      'Bank credit growth to NBFCs (a funding-availability proxy)',
    ],
    typicalSource: 'RBI liquidity data, bond market pricing, CRISIL/ICRA reports',
    frequency: 'Continuous / Real-time',
  },
  {
    id: 'nbfc-rating-actions',
    sectorId: 'nbfc',
    category: 'Fundamentals',
    name: 'Credit Rating Actions',
    description: 'CRISIL/ICRA/CARE/India Ratings upgrades, downgrades, or outlook changes on an NBFC’s long-term debt.',
    whyItMatters:
      'A rating change directly moves an NBFC’s borrowing cost (unlike banks, this flows through almost immediately to margins) and can trigger covenant breaches on existing debt.',
    watchFor: ['Rating outlook change (before an actual rating action)', 'Rationale cited — asset quality, capitalization, or parentage/ownership'],
    typicalSource: 'Rating agency press releases, exchange filings',
    frequency: 'Event-driven',
  },
  {
    id: 'nbfc-aum-disbursement',
    sectorId: 'nbfc',
    category: 'Fundamentals',
    name: 'AUM Growth & Disbursement Trends',
    description: 'Monthly/quarterly AUM growth and disbursement data by segment (vehicle, housing, gold, micro, SME).',
    whyItMatters: 'AUM growth is the primary earnings driver for NBFCs; a slowdown here is usually the first visible sign of either demand weakness or a deliberate risk-off pullback by management.',
    watchFor: ['AUM growth QoQ/YoY vs guidance', 'Disbursement growth vs AUM growth (leading indicator)', 'Segment mix shift'],
    typicalSource: 'Monthly business updates (many NBFCs disclose), quarterly results',
    frequency: 'Monthly',
  },
  {
    id: 'nbfc-asset-quality',
    sectorId: 'nbfc',
    category: 'Fundamentals',
    name: 'Asset Quality & Credit Cost',
    description: 'GNPA/NNPA, Stage 2/Stage 3 asset trends under Ind AS ECL, credit cost as % of AUM, write-offs.',
    whyItMatters: 'NBFC provisioning is more judgment-based (ECL models) than banks’ — credit cost surprises are a recurring source of earnings misses, especially in unsecured/MFI books.',
    watchFor: ['Stage 2 (early stress) trend, not just Stage 3', 'Credit cost guidance vs actual', 'Segment-specific stress (MFI over-leverage, used-CV cycle)'],
    typicalSource: 'Quarterly results, investor presentations',
    frequency: 'Quarterly',
  },
  {
    id: 'nbfc-segment-cycles',
    sectorId: 'nbfc',
    category: 'Structural',
    name: 'Segment-Specific Cycles',
    description:
      'Vehicle finance tracks auto/CV sales; housing finance tracks real estate demand and rate cycle; gold loans track gold prices and LTV rules; microfinance tracks MFIN guardrails and state-level loan-waiver politics.',
    whyItMatters: 'Each NBFC sub-segment has its own demand cycle largely independent of the broader credit cycle — sector-level triggers can mask segment-specific ones.',
    watchFor: [
      'SIAM auto sales data (vehicle finance)',
      'Gold price trend (gold loan LTV headroom)',
      'State election cycles and loan-waiver announcements (microfinance)',
      'Real estate launches/absorption data (housing finance)',
    ],
    typicalSource: 'SIAM, gold price data, state government announcements, real estate consultants (Anarock, JLL)',
    frequency: 'Monthly',
  },
  {
    id: 'nbfc-capital-raising',
    sectorId: 'nbfc',
    category: 'Corporate Action',
    name: 'Capital Adequacy & Fund Raising',
    description: 'Equity/NCD/ECB raises, capital adequacy ratio (CRAR) trends, promoter stake dilution to fund growth.',
    whyItMatters: 'Capital-constrained NBFCs must slow growth or dilute; well-capitalized ones can gain share when weaker peers pull back.',
    watchFor: ['CRAR trend vs regulatory minimum', 'Fund raise announcements and pricing', 'Promoter pledge levels'],
    typicalSource: 'Exchange filings, quarterly results',
    frequency: 'Event-driven',
  },
  {
    id: 'nbfc-colending',
    sectorId: 'nbfc',
    category: 'Structural',
    name: 'Co-lending & Bank Partnerships',
    description: 'New co-lending tie-ups with banks, Default Loss Guarantee (DLG) arrangements, changes to co-lending retention norms.',
    whyItMatters: 'Co-lending is now a major growth lever for well-run NBFCs (cheaper funding via bank participation) — new RBI retention rules (effective Jan 2026) directly affect this model’s economics.',
    watchFor: ['New co-lending partnership announcements', 'RBI Co-Lending Arrangements Directions updates', 'Retention ratio and DLG cap changes'],
    typicalSource: 'RBI directions, company announcements',
    frequency: 'Event-driven',
  },
  {
    id: 'nbfc-promoter-actions',
    sectorId: 'nbfc',
    category: 'Governance',
    name: 'Promoter & Ownership Actions',
    description: 'Promoter stake sales or pledges, RBI “fit and proper” scrutiny of promoters/directors, ownership changes.',
    whyItMatters: 'NBFCs are more promoter-dependent than banks; adverse RBI scrutiny or high promoter pledge levels are red flags for governance risk.',
    watchFor: ['Promoter pledge % trend', 'RBI action on fit-and-proper status', 'Block deals by promoters'],
    typicalSource: 'Exchange filings, shareholding pattern disclosures',
    frequency: 'Quarterly',
  },
  {
    id: 'nbfc-quarterly-results',
    sectorId: 'nbfc',
    category: 'Fundamentals',
    name: 'Quarterly Results Season',
    description: 'NIM, spread, opex ratio, PAT and management guidance reported each quarter.',
    whyItMatters: 'Sets the narrative and estimates revisions for the next quarter; NBFC guidance changes are often an early signal ahead of sector-wide data.',
    watchFor: ['Guidance revisions (up or down)', 'Spread/NIM trend', 'Management commentary on regulatory impact'],
    typicalSource: 'Company results, earnings call transcripts',
    frequency: 'Quarterly',
  },

  // ---------------- STEEL ----------------
  {
    id: 'steel-china-global-prices',
    sectorId: 'steel',
    category: 'Macro / Global',
    name: 'Global Steel Prices & China Exports',
    description:
      'China produces and exports more steel than any other country by a wide margin; its domestic demand weakness pushes surplus tonnage into export markets, setting a floor/ceiling on global HRC/rebar prices that Indian domestic prices trade in relation to.',
    whyItMatters:
      'When China HRC export prices fall, cheap imports pressure Indian domestic realizations even without any change in Indian demand — this is the single biggest swing factor in Indian steel spreads, and it moves faster than company fundamentals.',
    watchFor: [
      'China HRC/rebar export price (FOB, USD/tonne) trend',
      'China property-sector demand data and steel mill utilization',
      'Landed import price into India vs domestic ex-plant price',
    ],
    typicalSource: 'SteelMint, Kallanish, Platts/S&P Global, worldsteel',
    frequency: 'Continuous / Real-time',
  },
  {
    id: 'steel-raw-material-costs',
    sectorId: 'steel',
    category: 'Costs / Inputs',
    name: 'Iron Ore & Coking Coal Costs',
    description:
      'Iron ore (largely domestic in India, but priced off global benchmarks) and coking coal (India imports ~85% of requirement, mostly from Australia) are the two dominant input costs for integrated steelmakers.',
    whyItMatters:
      'Spread (realization minus input cost) drives profitability far more than revenue growth in a commodity business — a rising raw-material basket compresses EBITDA/tonne even if steel prices are flat, and vice versa.',
    watchFor: [
      'Odisha iron ore auction/e-auction premiums and domestic fines price',
      'Australian premium hard coking coal benchmark price (USD/tonne)',
      'Company-level raw material cost/tonne guidance vs realized',
    ],
    typicalSource: 'SteelMint, Odisha Mining Corporation e-auctions, company investor presentations',
    frequency: 'Monthly',
  },
  {
    id: 'steel-trade-policy',
    sectorId: 'steel',
    category: 'Policy / Trade',
    name: 'Safeguard & Anti-dumping Duties',
    description:
      'Government imposes/extends safeguard duty, anti-dumping duty (ADD) or countervailing duty (CVD) on specific steel product categories, typically targeted at China, Vietnam, Japan, Korea and Russia.',
    whyItMatters:
      'A new or extended duty is one of the few triggers that can re-rate the whole domestic sector overnight by removing import competition — conversely, a duty lapsing or being struck down at WTO is a negative catalyst.',
    watchFor: [
      'DGTR (Directorate General of Trade Remedies) investigation outcomes and recommendations',
      'Ministry of Finance notification confirming/rejecting DGTR recommendation',
      'Product scope and rate (%) of any imposed duty, and expiry/review date',
    ],
    typicalSource: 'DGTR notifications, Ministry of Finance/CBIC circulars, business press',
    frequency: 'Event-driven',
  },
  {
    id: 'steel-domestic-demand-cycle',
    sectorId: 'steel',
    category: 'Demand',
    name: 'Domestic Demand Cycle (Infra / Auto / Construction)',
    description:
      'Domestic steel demand is driven by government infra capex (roads, railways, metro), real estate/construction, and auto production — each with a different steel-grade mix (long products for construction, flat/value-added for auto and white goods).',
    whyItMatters:
      'A company\'s product mix determines which demand driver actually moves its volumes — a long-products maker is levered to construction/infra capex, while a flat-products/auto-grade maker tracks auto production and capex cycles instead.',
    watchFor: [
      'Government capex allocation (Union Budget, road/rail ministry spend run-rate)',
      'Auto production volumes (SIAM data) as a proxy for flat/auto-grade steel demand',
      'Real estate launches/absorption data in top cities',
    ],
    typicalSource: 'Union Budget documents, SIAM, JPC demand data, real-estate research (Knight Frank/CBRE)',
    frequency: 'Monthly',
  },
  {
    id: 'steel-capacity-utilization-capex',
    sectorId: 'steel',
    category: 'Fundamentals',
    name: 'Capacity Utilization & Expansion Capex',
    description:
      'Steel is capital-intensive with multi-year capacity-addition cycles; utilization % directly drives operating leverage, and most large Indian producers (Tata Steel, JSW Steel, JSPL) are mid-way through announced brownfield/greenfield expansions.',
    whyItMatters:
      'Because fixed costs are high, a swing in utilization moves EBITDA/tonne much more than a similar swing in realization — new capacity coming online also determines whether a company can capture an upcycle or is still absorbing commissioning costs.',
    watchFor: [
      'Reported capacity utilization % trend QoQ',
      'Capex guidance and commissioning timelines for ongoing expansions',
      'Net debt/EBITDA trend as expansions are funded',
    ],
    typicalSource: 'Company investor presentations, JPC industry capacity data',
    frequency: 'Quarterly',
  },
  {
    id: 'steel-quarterly-results',
    sectorId: 'steel',
    category: 'Fundamentals',
    name: 'Quarterly Results (Realization, Spread, EBITDA/tonne)',
    description:
      'Sales volume, blended realization per tonne, EBITDA/tonne and net debt reported each quarter — the sector\'s standard normalized profitability metrics, since revenue growth alone is a poor signal in a cyclical commodity business.',
    whyItMatters:
      'EBITDA/tonne strips out the effect of price moves that are common to the whole sector and isolates company-specific cost/mix efficiency — a company growing EBITDA/tonne while peers don\'t is a genuine company-specific signal.',
    watchFor: [
      'EBITDA/tonne trend QoQ and vs peers',
      'Volume growth vs realization growth split',
      'Management guidance on spreads for the coming quarter',
    ],
    typicalSource: 'Quarterly results, investor presentations, earnings call transcripts',
    frequency: 'Quarterly',
  },
  {
    id: 'steel-government-capex-budget',
    sectorId: 'steel',
    category: 'Policy / Demand',
    name: 'Government Infra Capex & Budget Allocation',
    description:
      'Union Budget allocations to roads, railways, and infrastructure ministries, plus National Infrastructure Pipeline / PM Gati Shakti execution pace, are a structural demand driver specific to India (distinct from the global price cycle).',
    whyItMatters:
      'Budget capex announcements move long-products and construction-grade steel demand expectations independent of what\'s happening to global steel prices — this is a domestic-only catalyst worth tracking separately from the China/global trigger.',
    watchFor: [
      'Union Budget capex allocation YoY (roads, rail, infra ministries)',
      'Actual capex execution run-rate vs budgeted (often lags announcement)',
      'PM Gati Shakti / National Infrastructure Pipeline project pipeline updates',
    ],
    typicalSource: 'Union Budget documents, Ministry of Road Transport/Railways press releases',
    frequency: 'Annual',
  },
  {
    id: 'steel-working-capital-debt',
    sectorId: 'steel',
    category: 'Balance Sheet',
    name: 'Working Capital & Net Debt Cycle',
    description:
      'Steel companies carry heavy working capital (raw material and finished-goods inventory) that swells when prices rise and unwinds when they fall, on top of debt-funded capacity expansions.',
    whyItMatters:
      'Net debt/EBITDA can deteriorate sharply in a price downcycle even without any operational problem, purely from working capital and inventory revaluation — this is a key risk flag distinct from the P&L trend.',
    watchFor: [
      'Net debt/EBITDA trend QoQ',
      'Inventory days and working-capital cycle length',
      'Free cash flow generation vs capex commitments',
    ],
    typicalSource: 'Quarterly results, credit-rating agency reports (CRISIL, ICRA, CARE)',
    frequency: 'Quarterly',
  },
  {
    id: 'steel-pli-specialty',
    sectorId: 'steel',
    category: 'Policy',
    name: 'PLI Scheme for Specialty Steel',
    description:
      'The Production Linked Incentive (PLI) scheme for specialty steel covers coated/plated steel, high-strength/wear-resistant steel, alloy steel, and electrical steel — incentivizing import substitution in higher-value grades.',
    whyItMatters:
      'Companies executing PLI-linked capacity for value-added/specialty grades get a structural margin and demand tailwind (import substitution + incentive payout) distinct from commodity steel economics.',
    watchFor: [
      'PLI scheme investment/production milestones met by individual companies',
      'Incentive disbursement status and scheme extensions',
      'Import substitution progress in coated/electrical/alloy steel categories',
    ],
    typicalSource: 'Ministry of Steel notifications, company PLI investment updates',
    frequency: 'Event-driven',
  },
  {
    id: 'cement-capacity-utilization-glut',
    sectorId: 'cement',
    category: 'Fundamentals',
    name: 'National Capacity Utilization & Supply Glut',
    description:
      'Cement is capital-intensive with a multi-year brownfield capacity-addition cycle; India added 160-170 MT of new capacity FY26-28 against 30-40 MT/yr incremental demand, creating an estimated 50-70 MT surplus that pan-India utilization (65-70% vs an 80-85% optimal) has to absorb.',
    whyItMatters:
      'Because the surplus is genuinely new brownfield capacity (not idled/reactivated latent capacity), it will run rather than be mothballed -- utilization and EBITDA/tonne stay structurally pressured until demand growth (30-40 MT/yr) closes the gap, likely around FY29, not on any single dateable event.',
    watchFor: [
      'Pan-India capacity utilization % crossing 70-75% (CareEdge\'s threshold for sustained price hikes)',
      'Quarterly EBITDA/tonne across the cluster vs the Rs 1,005/tonne floor reference (Q1 FY27)',
      'Any capex deferral announcements -- the first real sign the cycle is turning',
    ],
    typicalSource: 'CRISIL Ratings, CareEdge, Axis Securities, Jefferies sector notes; company investor presentations',
    frequency: 'Quarterly',
  },
  {
    id: 'cement-consolidation-ma',
    sectorId: 'cement',
    category: 'Corporate Action',
    name: 'M&A / Consolidation & Capacity Targets',
    description:
      'Large players (UltraTech, Ambuja/Adani, Dalmia Bharat) are acquiring capacity from mid/small-cap peers (Kesoram, India Cements, Penna, Orient, Sanghi, Jaiprakash Associates) on top of organic brownfield expansion -- company-level capacity targets sum to more than the national addition because of this double-count.',
    whyItMatters:
      'Consolidation did not create pricing discipline -- it triggered a capacity arms race; treat named acquisitions as ownership transfer against the national CRISIL capacity figure, not as incremental national tonnes, when assessing whether a company target implies sector-wide oversupply easing.',
    watchFor: [
      'New acquisition announcements and completion/amalgamation dates (e.g. ACC into Ambuja, NCLT meeting 29-Sep-2026)',
      'Utilization of recently acquired assets specifically (lags group average -- e.g. Sanghi 57%, Penna 46% at FY26-end)',
      'Company capacity-target revisions vs the CRISIL national reconciliation',
    ],
    typicalSource: 'Company merger/amalgamation filings, NCLT/CCI/SEBI approvals, investor presentations',
    frequency: 'Event-driven',
  },
  {
    id: 'cement-raw-material-costs',
    sectorId: 'cement',
    category: 'Costs / Inputs',
    name: 'Petcoke, Coal & Power-Fuel Costs',
    description:
      'Petcoke and coal are the dominant fuel cost for clinkerization; production cost/tonne rose 11% QoQ in Q1 FY27 even as realization improved, squeezing EBITDA/tonne despite firmer prices.',
    whyItMatters:
      'In a supply-glut environment, cost inflation cannot be passed through as easily as in a tight market -- rising fuel costs compress margins directly rather than being absorbed by pricing power, which is the mechanism behind the "EBITDA/tonne down even as realization is up" diagnostic.',
    watchFor: [
      'Petcoke price trend (moderated slightly Jun-2026; further relief if West Asia tensions ease)',
      'Company-level production cost/tonne guidance vs realized',
      'Alternative fuel and green-power substitution progress (structural cost lever, not a quarter-to-quarter one)',
    ],
    typicalSource: 'Company investor presentations, petcoke/coal price trackers',
    frequency: 'Quarterly',
  },
  {
    id: 'cement-regional-pricing',
    sectorId: 'cement',
    category: 'Demand',
    name: 'Regional Pricing & Rural Housing Demand',
    description:
      'Cement pricing power is regional, not national -- new-player capacity ramp-up depresses specific regions (Central India weakest, from new entrants plus Dalmia scaling the acquired Jaiprakash assets) independent of the pan-India average; rural housing demand is separately exposed to monsoon/farm-income cycles.',
    whyItMatters:
      'A pan-India realization average can mask a much worse regional reality (or vice versa) -- and a below-average monsoon hurting rural incomes is a demand-side headwind layered on top of the supply-side glut, the same mechanism flagged for cotton spinning and agrochemicals.',
    watchFor: [
      'Region-wise price hike announcements and their actual realization (vs announced)',
      'Monsoon/El Nino progress and its read-through to rural housing starts',
      'Central-region pricing specifically, as the current weak point',
    ],
    typicalSource: 'Company/analyst regional pricing trackers, IMD monsoon updates',
    frequency: 'Monthly',
  },
  {
    id: 'cement-quarterly-results',
    sectorId: 'cement',
    category: 'Fundamentals',
    name: 'Quarterly Results (Volumes, Realization, EBITDA/tonne)',
    description:
      'Sales volume, blended realization per tonne, production cost per tonne and EBITDA/tonne reported each quarter -- the sector\'s normalized profitability metrics, since revenue growth alone can mask a volumes-up-margins-down glut dynamic.',
    whyItMatters:
      'EBITDA/tonne isolates company-specific cost/mix efficiency from sector-wide price moves -- Q1 FY27\'s combination of +8% volumes, +5% QoQ realization and still -7% QoQ EBITDA/tonne is the clearest evidence this is a supply problem, not a demand or valuation problem.',
    watchFor: [
      'EBITDA/tonne trend QoQ and vs the sector floor reference (Rs 1,005/tonne, Q1 FY27)',
      'Volume growth vs realization growth split',
      'Capacity utilization % reported alongside results',
    ],
    typicalSource: 'Company investor presentations, quarterly results, concall transcripts',
    frequency: 'Quarterly',
  },
]
