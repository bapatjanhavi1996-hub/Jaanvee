// Standalone, inline-styled SVG charts for the email body. No CSS classes --
// everything is inline so the chart (a) renders in the preview and (b) rasterizes
// cleanly to PNG on copy, which is how the charts reach Outlook/Gmail (the source
// email embedded PNGs the same way).
import { dieselSeries } from '../../data/cvDiesel'
import { crudeDaily, crudeAnnual } from '../../data/cvCrude'
import { fastagSeries } from '../../data/cvFastag'

const GRID = '#e5e7eb'
const AXIS = '#6b7280'
const TITLE = '#374151'

interface Pt {
  label: string
  v: number
}

function lineSVG(title: string, pts: Pt[], color: string, w: number, h: number): string {
  const padL = 40
  const padR = 10
  const padT = 26
  const padB = 24
  const vals = pts.map((p) => p.v)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  const plotW = w - padL - padR
  const plotH = h - padT - padB
  const n = pts.length
  const xAt = (i: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW)
  const yAt = (v: number) => padT + plotH - ((v - min) / range) * plotH
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.v).toFixed(1)}`).join(' ')
  const steps = 5
  const grid = Array.from({ length: steps + 1 }, (_, i) => min + (range * i) / steps)
  // year ticks: year is the token after '-' (e.g. Apr-10) or the ISO prefix
  const yearOf = (label: string) => (label.includes('-') && label.length <= 7 ? label.split('-')[1] : label.slice(2, 4))
  const ticks: { i: number; y: string }[] = []
  let last = ''
  pts.forEach((p, i) => {
    const y = yearOf(p.label)
    if (y !== last) {
      ticks.push({ i, y })
      last = y
    }
  })
  const gridEls = grid
    .map(
      (g) =>
        `<line x1="${padL}" y1="${yAt(g).toFixed(1)}" x2="${w - padR}" y2="${yAt(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>` +
        `<text x="${padL - 4}" y="${(yAt(g) + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="${AXIS}" font-family="Calibri,Arial,sans-serif">${Math.round(g)}</text>`,
    )
    .join('')
  const tickEls = ticks
    .map(
      (t) =>
        `<text x="${xAt(t.i).toFixed(1)}" y="${h - 6}" text-anchor="middle" font-size="9" fill="${AXIS}" font-family="Calibri,Arial,sans-serif">'${t.y}</text>`,
    )
    .join('')
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="#ffffff"/>` +
    `<text x="${w / 2}" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="${TITLE}" font-family="Calibri,Arial,sans-serif">${title}</text>` +
    gridEls +
    `<path d="${path}" fill="none" stroke="${color}" stroke-width="1.2"/>` +
    tickEls +
    `</svg>`
  )
}

function barSVG(title: string, data: { label: string; v: number }[], color: string, w: number, h: number): string {
  const padL = 8
  const padR = 8
  const padT = 26
  const padB = 22
  const max = Math.max(...data.map((d) => d.v)) || 1
  const plotW = w - padL - padR
  const plotH = h - padT - padB
  const slot = plotW / data.length
  const bw = slot * 0.6
  const bars = data
    .map((d, i) => {
      const bh = (d.v / max) * plotH
      const x = padL + i * slot + (slot - bw) / 2
      const y = h - padB - bh
      return (
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}"/>` +
        `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle" font-size="10" fill="${TITLE}" font-family="Calibri,Arial,sans-serif">${Math.round(d.v)}</text>` +
        `<text x="${(x + bw / 2).toFixed(1)}" y="${h - padB + 13}" text-anchor="middle" font-size="9" fill="${AXIS}" font-family="Calibri,Arial,sans-serif">${d.label}</text>`
      )
    })
    .join('')
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="#ffffff"/>` +
    `<text x="${w / 2}" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="${TITLE}" font-family="Calibri,Arial,sans-serif">${title}</text>` +
    `<line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" stroke="${GRID}" stroke-width="1"/>` +
    bars +
    `</svg>`
  )
}

export const dieselEmailChart = () =>
  lineSVG("Diesel Consumption — '000 Metric tonnes", dieselSeries.map((d) => ({ label: d.month, v: d.mt })), '#2f5e9e', 680, 210)

export const crudeAnnualEmailChart = () =>
  barSVG('$ per barrel — calendar-year average', crudeAnnual.map((a) => ({ label: a.year, v: a.avg })), '#29abe2', 680, 230)

export const crudeDailyEmailChart = () =>
  lineSVG('$ per barrel — daily (WTI)', crudeDaily.map(([d, v]) => ({ label: d, v })), '#2f5e9e', 680, 210)

// FASTag chart tracks the monthly Daily Average Value (INR Cr). The source email
// shows it from Jan-23, so match that window.
export const fastagEmailChart = () =>
  lineSVG(
    'Average Daily Value per month — FASTag (INR Cr)',
    fastagSeries
      .slice(fastagSeries.findIndex((f) => f.month === 'Jan-23'))
      .filter((f) => f.dailyAvg != null)
      .map((f) => ({ label: f.month, v: f.dailyAvg as number })),
    '#8c8c8c',
    680,
    210,
  )
