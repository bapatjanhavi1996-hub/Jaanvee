import type { BrokerKpi } from '../types'

// Latest-period operating KPIs per company, pulled from each company's own
// Q1 FY27 (quarter ended 30-Jun-2026) investor presentation / shareholders'
// letter / press release, except where a figure is tagged as NSE monthly data
// or a secondary/derived source. Research date 2026-10-03. This is the "what
// the business actually did" layer that sits beside the financials; the fixed
// BrokerMetricQuarter table (clients/funding/interest time series) covers the
// discount brokers, while this flexible list carries the AUM/flows/turnover/
// market-share KPIs that define the wealth and market-infrastructure names.
// Null/omitted = not disclosed; nothing here is estimated.
export const brokerOperatingKpis: Record<string, BrokerKpi[]> = {
  'angel-one-ltd': [
    { label: 'Total clients', value: '38.6m (+18.8% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 Investor Presentation (15-Jul-2026)' },
    { label: 'NSE active clients', value: '6.63m — 14.59% share', asOf: 'Jun-2026', source: 'NSE monthly data via StartupTalky' },
    { label: 'Client funding book (MTF)', value: '₹7,152 Cr (period-end)', asOf: 'Jun-2026', source: 'Q1 FY27 Investor Presentation' },
    { label: 'Interest income / gross revenue', value: '32.6%', asOf: 'Jun-2026', source: 'Q1 FY27 IP revenue-mix (gross broking 60.1% / interest 32.6% / distribution 3.0%)' },
    { label: 'MF AUM (distribution)', value: '₹20,600 Cr', asOf: 'Jun-2026', source: 'Q1 FY27 Investor Presentation' },
    { label: 'AMC AUM (Angel One AMC)', value: '₹620 Cr (+81% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 Investor Presentation' },
    { label: 'Retail F&O turnover share', value: '22.2%', asOf: 'Jun-2026', source: 'Q1 FY27 Investor Presentation' },
  ],
  'billionbrains-garage-ventures-ltd': [
    { label: 'Transacting users', value: '22.4m (+24% YoY)', asOf: 'Jun-2026', source: "Q1 FY27 Shareholders' Letter (15-Jul-2026)" },
    { label: 'NSE active clients', value: '13.05m — 28.72% share (#1)', asOf: 'Jun-2026', source: 'NSE monthly data via StartupTalky' },
    { label: 'MTF book', value: '₹3,775 Cr (+264% YoY)', asOf: 'Jun-2026', source: "Q1 FY27 Shareholders' Letter" },
    { label: 'Direct MF AUM on platform', value: '₹1.9 lakh cr', asOf: 'Jun-2026', source: "Q1 FY27 Shareholders' Letter (largest direct-MF platform)" },
    { label: 'AMC AUM (Groww MF)', value: '₹5,491 Cr (~+140% YoY)', asOf: 'Jun-2026', source: "Q1 FY27 Shareholders' Letter" },
    { label: 'Total customer assets', value: '₹3.6 lakh cr (+38% YoY)', asOf: 'Jun-2026', source: "Q1 FY27 Shareholders' Letter" },
    { label: 'Income mix', value: 'Eq-derivs 52% · Stocks 16% · MTF 8% · Float 8% · Credit 5.5%', asOf: 'Jun-2026', source: "Q1 FY27 Shareholders' Letter" },
  ],
  'motilal-oswal-financial-services-ltd': [
    { label: 'Group Assets Under Advice', value: '₹7.9 lakh cr (+22% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 IP / Press Release (23-Jul-2026)' },
    { label: 'AMC AUM (MF+PMS+AIF)', value: '₹2.12 lakh cr (+31% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 Press Release' },
    { label: 'Private Wealth AUM', value: '₹2.4 lakh cr (+37% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 Press Release' },
    { label: 'Wealth distribution AUM', value: '₹45,575 Cr (+29% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 Press Release' },
    { label: 'ARR share of net revenue', value: '66% (from 51% a year ago)', asOf: 'Jun-2026', source: 'Q1 FY27 Press Release' },
    { label: 'Total clients', value: '15.8m (+16% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 IP' },
    { label: 'Broking ADTO market share', value: '7.6%', asOf: 'Jun-2026', source: 'Q1 FY27 IP' },
  ],
  '360-one-wam-ltd': [
    { label: 'Total AUM', value: '₹7.76 lakh cr (+17% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 earnings call / slides (21-Jul-2026)' },
    { label: 'ARR AUM', value: '₹3.42 lakh cr (+19% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 slides' },
    { label: 'ARR net flows (quarter)', value: '₹10,815 Cr', asOf: 'Q1 FY27', source: 'Q1 FY27 earnings call' },
    { label: 'ARR revenue share', value: '75% of operating revenue', asOf: 'Jun-2026', source: 'Q1 FY27 slides' },
    { label: 'Asset Management AUM', value: '₹1.0 lakh cr (crossed milestone)', asOf: 'Jun-2026', source: 'Q1 FY27 earnings call' },
    { label: 'Client families', value: '8,900+', asOf: 'Jun-2026', source: 'Q1 FY27 slides' },
  ],
  'nuvama-wealth-management-ltd': [
    { label: 'Total client assets (AUA)', value: '₹5.36 lakh cr (+16% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 IP (USD deck @ ₹91/$)' },
    { label: 'Wealth Management AUM', value: '₹3.64 lakh cr', asOf: 'Jun-2026', source: 'Q1 FY27 IP (INR converted @ ₹91/$)' },
    { label: 'Asset Services AUM', value: '₹1.59 lakh cr', asOf: 'Jun-2026', source: 'Q1 FY27 IP (INR converted @ ₹91/$)' },
    { label: 'Asset Management AUM', value: '₹13,260 Cr (+12% YoY)', asOf: 'Jun-2026', source: 'Q1 FY27 IP (INR converted @ ₹91/$)' },
    { label: 'Relationship managers', value: '1,250+', asOf: 'Jun-2026', source: 'Q1 FY27 IP' },
    { label: 'UHNI families (Nuvama Private)', value: '4,850+', asOf: 'Jun-2026', source: 'Q1 FY27 IP' },
    { label: 'RoE', value: '29.5%', asOf: 'Q1 FY27', source: 'Q1 FY27 IP' },
  ],
  'prudent-corporate-advisory-services-ltd': [
    { label: 'Assets under management', value: '₹1.19 lakh cr (+15% YoY)', asOf: 'FY26', source: 'FY26 results — ~95%+ equity-oriented' },
  ],
  'central-depository-services-ltd': [
    { label: 'Total demat (BO) accounts', value: '18.59 crore (from 15.86 cr YoY)', asOf: 'Jun-2026', source: 'CDSL Q1 FY27 press release (1-Aug-2026)' },
    { label: 'Demat accounts added (quarter)', value: '~58 lakh', asOf: 'Q1 FY27', source: 'CDSL Q1 FY27 press release' },
    { label: 'Demat custody (AUC)', value: '₹88.2 lakh cr', asOf: 'Jun-2026', source: 'CDSL Q1 FY27 press release' },
    { label: 'Depository participants', value: '588+', asOf: 'Jun-2026', source: 'CDSL Q1 FY27 press release' },
    { label: 'Market share vs NSDL (accounts)', value: '~80%', asOf: 'Q1 FY27', source: 'Secondary (Investing.com); account-based, not value-based', note: 'By custody VALUE, NSDL leads (~86%); CDSL leads by account COUNT.' },
  ],
  'bse-ltd': [
    { label: 'Equity cash ADTV', value: '₹9,955 Cr', asOf: 'Q1 FY27', source: 'BSE Q1 FY27 Investor Presentation' },
    { label: 'Equity-derivatives premium ADT', value: '₹1,155 Cr', asOf: 'Q1 FY27', source: 'BSE Q1 FY27 IP (read off chart)' },
    { label: 'Index-options premium share vs NSE', value: '~31.5% (derived)', asOf: 'Jun-2026', source: 'Derived from NSE RHP (NSE 68.5%); not a BSE-stated figure', note: 'BSE won this share via Sensex/Bankex weekly expiries after the SEBI rationalisation.' },
    { label: 'Registered investors', value: '255m+', asOf: 'Q1 FY27', source: 'BSE Q1 FY27 IP' },
    { label: 'StAR MF platform orders', value: '234m (+28% YoY)', asOf: 'Q1 FY27', source: 'BSE Q1 FY27 IP' },
  ],
  'multi-commodity-exchange-of-india-ltd': [
    { label: 'Futures ADT', value: '₹59,674 Cr (+47% YoY)', asOf: 'Q1 FY27', source: 'MCX Q1 FY27 Investor Presentation' },
    { label: 'Options premium ADT', value: '₹9,086 Cr (+114% YoY)', asOf: 'Q1 FY27', source: 'MCX Q1 FY27 IP' },
    { label: 'Total F&O ADT', value: '₹10.49 lakh cr (+238% YoY)', asOf: 'Q1 FY27', source: 'MCX Q1 FY27 IP' },
    { label: 'Commodity-derivatives market share', value: '>99%', asOf: 'Q1 FY27', source: 'MCX Q1 FY27 IP (bullion, base metals, energy)' },
    { label: 'Contract mix (futures)', value: 'Gold 34.5% · Silver 29.7% · Crude 16.6% · Nat gas 8.8%', asOf: 'Q1 FY27', source: 'MCX Q1 FY27 IP' },
  ],
  'computer-age-management-services-ltd': [
    { label: 'MF AUM serviced', value: '₹56 lakh cr (+14.8% YoY)', asOf: 'Jun-2026', source: 'CAMS Q1 FY27 earnings presentation' },
    { label: 'MF AUM market share', value: '67.2%', asOf: 'Q1 FY27', source: 'CAMS Q1 FY27 deck (quarterly AAuM, ex-FOF)' },
    { label: 'Live investor folios', value: '116.2m (+19.4% YoY)', asOf: 'Jun-2026', source: 'CAMS Q1 FY27 deck' },
    { label: 'Live SIP book', value: '67.2m (+18.8% YoY)', asOf: 'Jun-2026', source: 'CAMS Q1 FY27 deck' },
    { label: 'Non-MF revenue share', value: '14.9% (+28.4% YoY)', asOf: 'Q1 FY27', source: 'CAMS Q1 FY27 deck' },
  ],
  'kfin-technologies-ltd': [
    { label: 'MF AUM serviced (AAUM)', value: '₹27.3 lakh cr (+16.4% YoY)', asOf: 'Jun-2026', source: 'KFin Q1 FY27 Investor Presentation' },
    { label: 'MF AUM market share', value: '32.8%', asOf: 'Q1 FY27', source: 'KFin Q1 FY27 IP' },
    { label: 'AMCs serviced', value: '32 of 62 (largest by # AMCs)', asOf: 'Jun-2026', source: 'KFin Q1 FY27 IP' },
    { label: 'Issuer-solutions clients', value: '11,275 corporates', asOf: 'Jun-2026', source: 'KFin Q1 FY27 IP' },
    { label: 'Non-domestic-MF revenue share', value: '39.6%', asOf: 'Q1 FY27', source: 'KFin Q1 FY27 IP (international + issuer solutions)' },
  ],
}
