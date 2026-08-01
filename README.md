# India Markets — Sector Trigger Dashboard

A dashboard for tracking listed Indian companies (universe: market cap > ₹1,000 Cr)
by sector, the recurring **triggers** that move each sector, and a log of triggers
as they actually fire.

Currently covers **Banks** (Private, PSU, Small Finance) and **NBFCs / Financial
Lenders** (Diversified, Vehicle Finance, Housing Finance, Gold Loan, Microfinance,
SME, Infra/PSU lending institutions).

## Structure

- `src/data/sectors.ts` — sector + sub-sector taxonomy. Add a new sector here first.
- `src/data/companies.ts` — company universe per sector/sub-sector, with an
  indicative market-cap tier. Names flagged `verifyMcap: true` are borderline
  vs the ₹1,000 Cr threshold and should be re-checked against live data.
- `src/data/triggers.ts` — the trigger taxonomy per sector: what it is, why it
  matters, what to watch for, typical source, and expected frequency.
- `src/data/trackingLog.ts` — chronological log of triggers as they've actually
  fired. Newest entries go at the top of the array (feed sorts by date anyway).

## Adding a new sector

1. Add the sector + its sub-sectors to `sectors.ts`.
2. Add its companies to `companies.ts`.
3. Add its trigger taxonomy to `triggers.ts`.
4. Log entries as they happen in `trackingLog.ts`.

No other code changes are needed — the UI is fully data-driven.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
```
