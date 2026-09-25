# NSE participant-wise F&O activity

Fetches and parses NSE's daily **participant-wise** equity-derivatives reports so
we can see how activity by participant category has evolved over time.

## What the data is

Every trading day NSE publishes two reports that split F&O activity into four
participant categories:

| Code | Who |
|------|-----|
| `Client` | Retail / non-institutional clients (individuals) |
| `FII` | Foreign Institutional Investors |
| `DII` | Domestic Institutional Investors |
| `Pro`  | Proprietary desks (firms trading their own book) |

Each category is broken down by **6 instruments** — `Future Index`,
`Future Stock`, `Option Index Call`, `Option Index Put`, `Option Stock Call`,
`Option Stock Put` — each with a **long** and **short** figure.

Two reports:

- **Trading Volume** (`fao_participant_vol_*`) — the day's traded activity.
- **Open Interest** (`fao_participant_oi_*`) — positions held at end of day.

> **Units:** both are in **number of contracts (volume)**, *not* rupee value.
> NSE does not disclose rupee value per participant. The one exception is **FII**,
> whose rupee value (₹ cr, by instrument) is in the separate `fii_stats_*.xls`
> report — fetched with `--with-fii`. Value for Client/DII/Pro is not published.

Coverage: verified available from ~2020 to present.

## Usage

```bash
# 1. Fetch raw daily reports (default: last 5 years). Add --with-fii for FII value.
npm run nse:fetch -- --from 2020-01-01 --with-fii

# quick test window:
npm run nse:fetch -- --from 2026-09-16 --to 2026-09-24

# 2. Parse raw CSVs into tidy + monthly datasets
npm run nse:build
```

Outputs:

- `data/raw/…` — raw downloaded files (git-ignored; regenerate any time).
- `data/participant-daily.json` — one record per trading day, per participant,
  with per-instrument long/short, `share` (% of day's contracts), and `net`
  (long − short).
- `data/participant-monthly.json` — monthly `avgContracts`, `avgSharePct`,
  `avgNet` per participant/report, for trend charts.

## How the fetch works (and why it needs a browser)

NSE's archive host sits behind Akamai bot protection — plain `curl`/`fetch` get
`Access Denied`. The fetcher drives a real Chromium (via `playwright-core`):

1. Warm up Akamai cookies on the archive host.
2. Navigate directly to each report URL; the server serves the CSV as a **file
   download**, which we capture (navigating to render it in-page is blocked, but
   the download path succeeds).

It is rate-limited, re-warms the session periodically, retries once on a block,
and is **resumable** — already-downloaded files are skipped, so you can re-run to
fill gaps.

Set `PW_CHROMIUM` to a Chromium executable if Playwright's bundled browser isn't
installed (`npx playwright install chromium` installs one).
