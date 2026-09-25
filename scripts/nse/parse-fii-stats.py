#!/usr/bin/env python3
"""Parse NSE FII derivative-statistics .xls files into tidy JSON.

These legacy .xls files hold FII rupee VALUE (₹ crore) by product — the only
participant for whom NSE discloses value. Each aggregate row gives buy / sell /
open-interest in both contracts and ₹ crore.

Reads : scripts/nse/data/raw/fii_stats_DD-Mon-YYYY.xls
Writes: scripts/nse/data/fii-value-daily.json

Requires: pip install xlrd==2.0.1
Usage   : python3 scripts/nse/parse-fii-stats.py
"""
import json
import os
import re
import sys
from datetime import datetime

try:
    import xlrd
except ImportError:
    sys.exit("Missing dependency: pip install xlrd==2.0.1")

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "data", "raw")
OUT = os.path.join(HERE, "data", "fii-value-daily.json")

PRODUCTS = {
    "INDEX FUTURES": "indexFut",
    "INDEX OPTIONS": "indexOpt",
    "STOCK FUTURES": "stockFut",
    "STOCK OPTIONS": "stockOpt",
}
FNAME = re.compile(r"fii_stats_(\d{2}-[A-Za-z]{3}-\d{4})\.xls$")


def num(v):
    try:
        return float(str(v).replace(",", "").strip() or 0)
    except ValueError:
        return 0.0


def parse(path):
    try:
        sh = xlrd.open_workbook(path).sheet_by_index(0)
    except Exception:
        return None
    rows = {}
    for r in range(sh.nrows):
        label = str(sh.cell_value(r, 0)).strip().upper()
        if label in PRODUCTS:
            rows[PRODUCTS[label]] = {
                "buyContracts": num(sh.cell_value(r, 1)),
                "buyCr": num(sh.cell_value(r, 2)),
                "sellContracts": num(sh.cell_value(r, 3)),
                "sellCr": num(sh.cell_value(r, 4)),
                "oiContracts": num(sh.cell_value(r, 5)),
                "oiCr": num(sh.cell_value(r, 6)),
            }
    return rows or None


def main():
    out = []
    for f in sorted(os.listdir(RAW)):
        m = FNAME.search(f)
        if not m:
            continue
        try:
            iso = datetime.strptime(m.group(1), "%d-%b-%Y").strftime("%Y-%m-%d")
        except ValueError:
            continue
        rows = parse(os.path.join(RAW, f))
        if not rows:
            continue
        for product, vals in rows.items():
            out.append({"date": iso, "product": product, **vals})
    out.sort(key=lambda x: (x["date"], x["product"]))
    with open(OUT, "w") as fh:
        json.dump(out, fh)
    days = len({x["date"] for x in out})
    print(f"FII value: parsed {days} days -> {os.path.relpath(OUT)}")


if __name__ == "__main__":
    main()
