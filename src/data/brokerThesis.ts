import type { BrokerThesis } from '../types'

// The per-company "story" layer -- why people are buying each name, crisp and
// terse, anchored on the real numbers in brokerFinancials.ts / brokerMetrics.ts.
// This is editorial synthesis (research date 2026-10-03), not a sourced
// datapoint: the bull case, the one stat that anchors it, and the bear case.
// Written so you can read any name in ~15 seconds and know the pitch.
export const brokerThesis: BrokerThesis[] = [
  // ---------------- DISCOUNT / DIGITAL-FIRST ----------------
  {
    companyId: 'angel-one-ltd',
    tagline: 'The discount broker racing to become a fintech.',
    pitch:
      'Built a top-3 retail franchise on flat-fee trading, and is now converting 30m+ clients into a lending + AMC + distribution machine before SEBI\'s F&O curbs hollow out pure broking. Interest income on the margin-funding book is already ~1/3 of revenue; an AMC, wealth and credit distribution are being bolted on. The buy case is optionality: own the pivot to recurring revenue at a broking-cycle-trough valuation.',
    numbers:
      'FY26 revenue ₹5,138 Cr, PAT ₹915 Cr (down from ₹1,172 Cr as volumes fell); funding book ₹7,150 Cr (Jun-26); interest income 32.6% of gross revenue (from ~21% two years earlier); ROE 16% (vs 25% 3-yr avg).',
    risk:
      'Still losing active-client share to Groww, and PAT nearly halved when F&O volumes dropped — the pivot is a race against its own core shrinking. Borrowings jumped to ₹7,951 Cr to fund the MTF book, so it is now carrying credit risk too.',
  },
  {
    companyId: 'billionbrains-garage-ventures-ltd',
    tagline: 'The default investing app for first-time India.',
    pitch:
      'Won #1 by active clients by making investing feel like a consumer app — simplest UX, strongest pull with young, tier-2/3, mobile-first first-timers. Rare combination of hyper-growth AND ~60% operating margins on a bootstrapped-to-profitable base. Now extending into MF manufacturing, margin funding, wealth and credit to lift ARPU off a huge, cheaply-acquired base.',
    numbers:
      'FY26 revenue ₹4,645 Cr, PAT ₹2,083 Cr, OPM 59%, ROE 29%; 13.3m NSE active clients / ~29% share (Aug-26) — #1 and still gaining. FY24 loss was a one-time domicile-shift tax, not operating.',
    risk:
      'Priced for perfection post-IPO. Most users are small-ticket with thin ARPU, and the same F&O regulation that hit peers hits its engine too — monetisation must deepen fast to justify the multiple.',
  },
  {
    companyId: '5paisa-capital-ltd',
    tagline: 'The deep-discount challenger, sub-scale.',
    pitch:
      'Cheapest flat-fee model, tech-led; the bull case is pure operating leverage if it can scale clients and cross-sell. Cheap optionality on a broking recovery.',
    numbers: 'Smallest of the listed discount names (~₹1,500 Cr mcap); thin profitability.',
    risk:
      'Sub-scale against the big four and hit hardest by the F&O curbs — without a clear acquisition or monetisation edge, it risks being squeezed between the giants and the bank brokers.',
  },

  // ---------------- FULL-SERVICE / TRADITIONAL ----------------
  {
    companyId: 'motilal-oswal-financial-services-ltd',
    tagline: 'Three businesses in one, levered to the bull market.',
    pitch:
      'Broking + a fast-growing AMC/PMS/AIF + wealth management, sitting on a large proprietary equity/treasury book that turns the whole group into a leveraged bet on Indian equities compounding. The recurring asset-&-wealth engine is now ~60% of net revenue — the quality part — while the prop book supplies the upside (and the volatility).',
    numbers:
      'FY26 revenue ₹9,381 Cr, PAT ₹1,872 Cr (down 25% as the prop book marked down), net worth ₹12,888 Cr, ROE 15.5% (23% 3-yr avg); group AUA ~₹6.6 lakh cr.',
    risk:
      'That equity book cuts both ways — headline PAT is volatile BY DESIGN, so a market drawdown hits earnings hard. You are underwriting management\'s investing skill as much as the operating businesses.',
  },
  {
    companyId: 'iifl-capital-services-ltd',
    tagline: 'The rebuilt full-service house.',
    pitch:
      'Broking + institutional equities + investment banking + distribution after the IIFL group restructure; a geared play on capital-market activity (IPOs, blocks, institutional flow) with a recognised brand.',
    numbers: '~₹10,700 Cr mcap; earnings swing with primary-market and institutional cycles.',
    risk: 'Smaller scale, cyclical IB revenue, and lingering brand/regulatory baggage from the old IIFL structure.',
  },
  {
    companyId: 'anand-rathi-share-stock-brokers-ltd',
    tagline: 'The Anand Rathi broking arm, freshly listed.',
    pitch:
      'A mid-tier full-service retail + HNI broker with a distribution tail, listed in 2025 to ride the retail-participation wave. Distinct from the group\'s larger wealth business.',
    numbers: '~₹3,000 Cr mcap; small, bull-market-geared.',
    risk: 'Sub-scale and cyclical; competes for the same clients as both discount brokers and its own group\'s wealth arm.',
  },
  {
    companyId: 'geojit-financial-services-ltd',
    tagline: "South India's sticky retail broker.",
    pitch:
      'A conservative, research/advisory-led regional franchise with a loyal base and BNP Paribas as a large shareholder; steady distribution income and a low-expectations valuation.',
    numbers: '~₹2,000 Cr mcap; slow-and-steady.',
    risk: 'A structural share-loser to the digital brokers; low growth and limited pricing power.',
  },
  {
    companyId: 'smc-global-securities-ltd',
    tagline: 'Old-school diversified broker, cheap.',
    pitch:
      'Equity/commodity broking + a sizeable insurance-broking arm + distribution + NBFC — diversified cash flows at a modest valuation. The insurance-broking piece is the more interesting, less cyclical engine.',
    numbers: '~₹2,100 Cr mcap (Oct-26).',
    risk: 'Legacy model, modest growth and ROE; broking is a share-loser and the parts may not re-rate together.',
  },
  {
    companyId: 'share-india-securities-ltd',
    tagline: "A prop desk wearing a broker's clothes.",
    pitch:
      'Tech/algo-first house with a large proprietary-trading book alongside a retail broking and API business — a way to own quant trading-desk P&L in listed form, which has compounded fast.',
    numbers: '~₹4,500 Cr mcap; revenue skews to proprietary trading gains.',
    risk:
      'Prop-trading income is volatile and opaque, and the SEBI algo/HFT and F&O regime is tightening — not a clean, predictable client-franchise story.',
  },
  {
    companyId: 'choice-international-ltd',
    tagline: 'Broking-plus-advisory roll-up.',
    pitch:
      'A multi-engine small-cap: retail broking + government/consulting advisory + NBFC + insurance distribution. The government-advisory arm is the differentiated, sticky piece the bulls pay for.',
    numbers: '~₹1,100 Cr mcap (Sep-26) — figure conflicts with historically higher prints; verify.',
    risk: 'Valuation has been volatile and promoter/accounting scrutiny has surfaced in the past — quality is the question.',
  },
  {
    companyId: 'monarch-networth-capital-ltd',
    tagline: 'Small-cap broker + IB on a bull-market tear.',
    pitch:
      'Rapid growth in broking + merchant banking + wealth/distribution through the bull market; a high-beta way to play rising retail and primary-market activity.',
    numbers: '~₹3,000 Cr mcap (Sep-26).',
    risk: 'Pure bull-market beta — tiny, illiquid, and earnings would fall sharply in a downturn.',
  },
  {
    companyId: 'arihant-capital-markets-ltd',
    tagline: 'Deep-value micro-cap retail broker.',
    pitch:
      'An old retail franchise with distribution and a small IB arm, trading at a low base — cheap optionality on retail participation.',
    numbers: '~₹1,020 Cr mcap (Sep-26) — borderline vs the ₹1,000 Cr floor.',
    risk: 'Micro-cap, thin liquidity, and a share-loser to digital brokers; execution-dependent.',
  },
  {
    companyId: 'dolat-algotech-ltd',
    tagline: 'A listed quant fund, basically.',
    pitch:
      'Proprietary high-frequency/algo trading — effectively a way to own a trading desk\'s P&L in listed form. When markets are volatile and liquid, it prints money.',
    numbers: '~₹1,200 Cr mcap (Sep-26); earnings ARE trading gains.',
    risk:
      'Not a franchise and not predictable — earnings are literally proprietary trading results, exposed to volatility regimes and the tightening algo/F&O rules. Does not fit the client/ARPU framework at all.',
  },
  {
    companyId: 'jm-financial-ltd',
    tagline: 'A financial conglomerate; broking is a sliver.',
    pitch:
      'Investment banking (a top domestic franchise) + lending/mortgage + asset management + wealth + broking. You buy it for the IB + credit businesses and a cheap sum-of-parts, not for broking.',
    numbers: '~₹14,000 Cr mcap (approx — verify); broking is a small share of the group.',
    risk: 'Credit-cycle exposure and RBI regulatory overhangs on the lending arm have hit it before; do not mistake it for a pure broker.',
  },
  {
    companyId: 'emkay-global-financial-services-ltd',
    tagline: 'Research-led boutique broker.',
    pitch:
      'A respected institutional-research house with retail + IB + wealth attached; a cheap, niche play on institutional broking and advisory.',
    numbers: 'Market cap not confirmed and possibly below the ₹1,000 Cr floor — verify before relying on inclusion.',
    risk: 'Sub-scale, cyclical, and squeezed by shrinking institutional commission pools.',
  },

  // ---------------- WEALTH MANAGEMENT ----------------
  {
    companyId: '360-one-wam-ltd',
    tagline: 'The compounder of the rich.',
    pitch:
      'Pure UHNI wealth + asset management — sticky, fee-based, recurring (ARR) revenue that barely notices the F&O rules. AUM compounds structurally as India mints millionaires, and the annuity ARR book is the part the market pays a premium for. The cleanest "financialization of Indian wealth" play.',
    numbers:
      'FY26 revenue ₹4,470 Cr, PAT ₹1,216 Cr (+21%), OPM 63%; total AUM ₹6.74 lakh cr, ARR AUM ₹3.12 lakh cr (+26%), ARR net flows ₹55,875 Cr, 8,500+ families.',
    risk:
      'A premium multiple on markets-linked AUM: a prolonged equity drawdown hits fees AND flows together. Reported ROE (14%) looks modest because of a leveraged lending/treasury book sitting under the asset-light core.',
  },
  {
    companyId: 'nuvama-wealth-management-ltd',
    tagline: 'The institutional-grade wealth platform.',
    pitch:
      'Post-Edelweiss, a clean wealth + asset-services + asset-management + capital-markets play for the affluent/HNI tier, PAG-backed, scaling recurring revenue fast. Higher ROE than 360 ONE and a somewhat cheaper multiple — the "GARP" way to own the wealth theme.',
    numbers: 'FY26 revenue ₹4,638 Cr, PAT ₹1,040 Cr, OPM 53%, ROE 27%.',
    risk:
      'The capital-markets/IB and asset-services lines are cyclical, so it is less "pure annuity" than 360 ONE; competes head-on with 360 ONE and the bank wealth arms for the same clients.',
  },
  {
    companyId: 'anand-rathi-wealth-ltd',
    tagline: 'Mutual funds + structured products for the mass-affluent.',
    pitch:
      'A focused, very-high-ROE wealth manager serving the tier just below UHNI, riding the financialization of India\'s mass-affluent with a simple model and strong, consistent net flows.',
    numbers: 'High ROE (30%+), rapid AUM and PAT growth; ~₹20,000 Cr mcap (approx — verify).',
    risk:
      'Revenue is concentrated in market-linked debentures/structured products — a product-mix and regulatory concentration risk if that category falls out of favour.',
  },

  // ---------------- MF & PRODUCT DISTRIBUTION ----------------
  {
    companyId: 'prudent-corporate-advisory-services-ltd',
    tagline: 'A toll on every SIP.',
    pitch:
      'A B2B2C mutual-fund distribution network whose revenue is trail commission on a compounding equity AUM book — it rises with SIP flows regardless of trading volumes. The purest listed play on India\'s structural shift from fixed deposits to SIPs, with high ROE and almost no balance-sheet risk.',
    numbers: 'FY26 revenue ₹1,341 Cr (+18%), PAT ₹222 Cr (+13%), ROE ~25% (3-yr avg ~32%); AUM ₹1.19 lakh cr (+15%), ~95%+ equity-oriented.',
    risk:
      'The perennial sword is TER/commission regulation (SEBI periodically squeezes distributor economics); NJ India Invest and direct/zero-commission platforms compete for the same distributors and clients.',
  },

  // ---------------- MARKET INFRASTRUCTURE (PICKS & SHOVELS) ----------------
  {
    companyId: 'central-depository-services-ltd',
    tagline: 'The toll booth on every demat account.',
    pitch:
      'A regulated duopoly depository with ~80% of all demat accounts — asset-light, ~50% operating margins, revenue that scales with the NUMBER of investors and corporate actions rather than with how much they trade. The cleanest pick-and-shovel on India\'s rising investor count, almost debt-free.',
    numbers: 'FY26 revenue ₹1,145 Cr, PAT ₹455 Cr, OPM 51%, ROE 25%; ~80% demat market share, near-zero debt.',
    risk:
      'Tariffs are SEBI-regulated (capped upside), and FY26 PAT actually DIPPED ~13% when market/IPO activity cooled — it is more cyclical than the "toll booth" story implies. Richly valued.',
  },
  {
    companyId: 'bse-ltd',
    tagline: 'The exchange that WON the F&O rule change.',
    pitch:
      'The one name that gained from SEBI\'s expiry-day rationalisation — it grabbed index-options share from NSE via Sensex/Bankex weekly contracts, igniting explosive operating leverage on a near-monopoly cost base. Also owns a big CDSL stake and the StAR MF platform. A rare "regulation created a winner" story.',
    numbers: 'FY26 revenue ₹5,124 Cr (+60%), PAT ₹2,487 Cr (+88%), OPM 68%, ROE 46%, zero debt.',
    risk:
      'The valuation prices in continued options dominance — another SEBI tweak (longer tenures, position limits) could reverse the gift, and NSE\'s eventual listing will intensify competition for the same pool.',
  },
  {
    companyId: 'multi-commodity-exchange-of-india-ltd',
    tagline: 'The commodity-derivatives monopoly.',
    pitch:
      'A near-monopoly in commodity F&O (gold, silver, crude, natural gas), far less exposed to the EQUITY-F&O curbs that hit everyone else. A new tech platform plus booming options-on-futures volumes drove a profit explosion. Monopoly economics with a different regulatory weather system.',
    numbers: 'FY26 revenue ₹2,302 Cr (+107%), PAT ₹1,332 Cr (+138%), OPM 71%, ROE 56%.',
    risk:
      'Highly concentrated in a handful of contracts; one bad regulatory change or a tech/clearing disruption hurts disproportionately, and the stock is priced for the growth to continue.',
  },
  {
    companyId: 'computer-age-management-services-ltd',
    tagline: 'The record-keeper for ₹ trillions of mutual funds.',
    pitch:
      'The dominant MF registrar (~70% of industry AUM serviced) — annuity revenue that scales with MF AUM, folios and SIPs, not with trading. Asset-light, ~36-40% ROE, and diversifying into account aggregation, insurance and payments for a second growth leg.',
    numbers: 'FY26 revenue ₹1,516 Cr, PAT ₹472 Cr, OPM 45%, ROE 36%.',
    risk:
      'AMCs periodically push for lower RTA fees (pricing pressure), growth is tied to the MF industry, and the non-MF diversification is still unproven at scale. Premium multiple.',
  },
  {
    companyId: 'kfin-technologies-ltd',
    tagline: "CAMS's challenger, with an international leg.",
    pitch:
      'The #2 MF registrar plus issuer-solutions (corporate registry) and an international/non-MF business — the same SIP/AUM annuity logic as CAMS but with a longer growth runway (it is winning new AMC mandates and expanding abroad).',
    numbers: 'FY26 revenue ₹1,301 Cr (+19%), PAT ₹344 Cr, OPM 41%, ROE 22%.',
    risk:
      'Structurally #2 to CAMS in Indian MF; growth leans on winning mandates and on acquisition/integration execution; premium multiple with lower margins than CAMS.',
  },
]
