// Lightweight charts for the CV Activity tracker. Kept separate from the shared
// MiniLineChart because the crude series is ~3,600 daily points -- we draw a
// single path (no per-point circles) so it stays fast, and a small bar chart
// for the calendar-year averages that mirrors the user's Excel bar chart.

interface BarChartProps {
  title: string
  data: { label: string; value: number }[]
  color?: string
  format?: (v: number) => string
}

// Calendar-year average bars ($/bbl). Matches the look of the source bar chart:
// value labels above each bar, light baseline.
export function BarChart({ title, data, color = '#29abe2', format }: BarChartProps) {
  const fmt = format ?? ((v: number) => String(Math.round(v)))
  const W = 760
  const H = 240
  const padL = 8
  const padR = 8
  const padT = 24
  const padB = 24
  const max = Math.max(...data.map((d) => d.value)) || 1
  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const n = data.length
  const slot = plotW / n
  const bw = slot * 0.6
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1 text-center">{title}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth={1} />
        {data.map((d, i) => {
          const h = (d.value / max) * plotH
          const x = padL + i * slot + (slot - bw) / 2
          const y = H - padB - h
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={bw} height={h} fill={color} rx={1} />
              <text x={x + bw / 2} y={y - 4} textAnchor="middle" fontSize={11} className="fill-zinc-600 dark:fill-zinc-300">
                {fmt(d.value)}
              </text>
              <text x={x + bw / 2} y={H - padB + 14} textAnchor="middle" fontSize={10} className="fill-zinc-400 dark:fill-zinc-500">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

interface DailyLineProps {
  title: string
  points: [string, number][] // [ISO date, value]
  color?: string
}

// Full daily line (e.g. WTI). One polyline, year ticks on the x-axis.
export function DailyLineChart({ title, points, color = '#2f5e9e' }: DailyLineProps) {
  const W = 1000
  const H = 260
  const padL = 34
  const padR = 8
  const padT = 16
  const padB = 22
  const vals = points.map((p) => p[1])
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const n = points.length
  const xAt = (i: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW)
  const yAt = (v: number) => padT + plotH - ((v - min) / range) * plotH
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p[1]).toFixed(1)}`).join(' ')
  // y gridlines at rounded steps
  const steps = 5
  const grid = Array.from({ length: steps + 1 }, (_, i) => min + (range * i) / steps)
  // year ticks: first index of each calendar year
  const yearTicks: { i: number; year: string }[] = []
  let lastYear = ''
  points.forEach((p, i) => {
    const y = p[0].slice(0, 4)
    if (y !== lastYear) {
      yearTicks.push({ i, year: y })
      lastYear = y
    }
  })
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1 text-center">{title}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {grid.map((g, i) => (
          <g key={i}>
            <line x1={padL} y1={yAt(g)} x2={W - padR} y2={yAt(g)} className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth={1} />
            <text x={padL - 4} y={yAt(g) + 3} textAnchor="end" fontSize={9} className="fill-zinc-400 dark:fill-zinc-500">
              {Math.round(g)}
            </text>
          </g>
        ))}
        <path d={path} fill="none" stroke={color} strokeWidth={1.1} />
        {yearTicks.map((t) => (
          <text key={t.year} x={xAt(t.i)} y={H - 6} textAnchor="middle" fontSize={9} className="fill-zinc-400 dark:fill-zinc-500">
            {`'${t.year.slice(2)}`}
          </text>
        ))}
      </svg>
    </div>
  )
}
