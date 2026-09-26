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

## The three data sources

| What | Source | Volume | Value |
|------|--------|:------:|:-----:|
| Participant × instrument, long/short | participant CSVs | ✅ contracts | — |
| Product turnover (index/stock fut & opt) | F&O BhavCopy | ✅ contracts | ✅ ₹ cr |
| FII by product | FII stats `.xls` | ✅ contracts | ✅ ₹ cr |

**Value caveats (important):**

- **Futures value** is actual traded turnover (₹). Consistent across all years.
- **Options value** is **notional turnover** (contracts × lot × underlying), not
  premium — this is how NSE's BhavCopy and FII stats both report it, in both the
  legacy and the 2024+ UDiFF formats, so the series is continuous. Options
  notional is far larger than premium; label it accordingly in any chart.
- Value **by participant** exists only for **FII**. Client / DII / Pro value is
  not disclosed by NSE (it could only be estimated).

## Usage

```bash
# 1. Participant volume + OI (all four participants), last 5 years. --with-fii
#    also pulls the FII value .xls each day.
npm run nse:fetch -- --from 2020-09-01 --with-fii

# 2. Product turnover VALUE + volume from the F&O BhavCopy.
#    Default: last trading day of each month (~60 light files). --daily for all.
npm run nse:bhav -- --from 2020-09-01

# 3. Parse the FII value .xls files (needs: pip install xlrd==2.0.1)
npm run nse:fii

# 4. Merge everything into the dashboard dataset
npm run nse:build

# quick test window:
npm run nse:fetch -- --from 2026-09-16 --to 2026-09-24 --with-fii
```

Outputs:

- `data/raw/…` — raw downloaded files, incl. `raw/bhav/*.zip` (git-ignored).
- `data/fii-value-daily.json` — FII value by product per day (git-ignored intermediate).
- `data/participant-daily.json` — latest-day participant × instrument snapshot.
- **`data/dashboard-data.json`** — the consolidated monthly payload the dashboard
  loads: `participant` (vol / oi contracts, share %, FII value ₹cr) and `product`
  (vol contracts, value ₹cr) series over all months, plus the `latest` snapshot.

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
