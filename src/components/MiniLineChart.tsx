import { useState } from 'react'

export interface SeriesPoint {
  label: string
  value: number | null
  /** True if this point does not represent the year/period immediately after the previous one -- renders the segment leading into it as dashed rather than implying continuous data across the gap. */
  gapBefore?: boolean
}

interface MiniLineChartProps {
  title: string
  unit: string
  points: SeriesPoint[]
  format?: (v: number) => string
  color?: string
}

const WIDTH = 480
const HEIGHT = 140
const PAD_LEFT = 4
const PAD_RIGHT = 4
const PAD_TOP = 14
const PAD_BOTTOM = 22

export function MiniLineChart({ title, unit, points, format, color }: MiniLineChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const fmt = format ?? ((v: number) => v.toLocaleString('en-IN'))
  const lineColor = color ?? '#2a78d6'

  const values = points.map((p) => p.value).filter((v): v is number => v != null)
  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 1
  const range = max - min || 1
  const yPad = range * 0.12

  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM
  const n = points.length

  const xAt = (i: number) => PAD_LEFT + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW)
  const yAt = (v: number) => PAD_TOP + plotH - ((v - (min - yPad)) / (range + yPad * 2)) * plotH

  const segments: { x1: number; y1: number; x2: number; y2: number; dashed: boolean }[] = []
  for (let i = 0; i < n - 1; i++) {
    const a = points[i].value
    const b = points[i + 1].value
    if (a != null && b != null) {
      segments.push({ x1: xAt(i), y1: yAt(a), x2: xAt(i + 1), y2: yAt(b), dashed: !!points[i + 1].gapBefore })
    }
  }

  const tickIdxs = n > 1 ? [0, Math.floor((n - 1) / 2), n - 1] : [0]
  const hover = hoverIdx != null ? points[hoverIdx] : null

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{title}</p>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{unit}</p>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseLeave={() => setHoverIdx(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const relX = ((e.clientX - rect.left) / rect.width) * WIDTH
          let closest = 0
          let closestDist = Infinity
          for (let i = 0; i < n; i++) {
            const d = Math.abs(xAt(i) - relX)
            if (d < closestDist) {
              closestDist = d
              closest = i
            }
          }
          setHoverIdx(closest)
        }}
      >
        {/* recessive gridline at min/max */}
        <line x1={PAD_LEFT} y1={PAD_TOP} x2={WIDTH - PAD_RIGHT} y2={PAD_TOP} className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth={1} />
        <line
          x1={PAD_LEFT}
          y1={HEIGHT - PAD_BOTTOM}
          x2={WIDTH - PAD_RIGHT}
          y2={HEIGHT - PAD_BOTTOM}
          className="stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth={1}
        />

        {segments.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={s.dashed ? 0.45 : 1}
            strokeDasharray={s.dashed ? '5,4' : undefined}
          />
        ))}

        {points.map((p, i) =>
          p.value != null ? (
            <circle
              key={i}
              cx={xAt(i)}
              cy={yAt(p.value)}
              r={hoverIdx === i ? 4 : 2}
              fill={lineColor}
              opacity={hoverIdx === i ? 1 : 0.7}
            />
          ) : null,
        )}

        {hover && hoverIdx != null && (
          <line
            x1={xAt(hoverIdx)}
            y1={PAD_TOP}
            x2={xAt(hoverIdx)}
            y2={HEIGHT - PAD_BOTTOM}
            className="stroke-zinc-300 dark:stroke-zinc-600"
            strokeWidth={1}
            strokeDasharray="3,3"
          />
        )}

        {tickIdxs.map((i) => (
          <text
            key={i}
            x={xAt(i)}
            y={HEIGHT - 6}
            textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
            className="fill-zinc-400 dark:fill-zinc-500"
            fontSize={10}
          >
            {points[i].label}
          </text>
        ))}
      </svg>
      <div className="h-4 text-center">
        {hover && (
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
            {hover.label}: <span className="font-medium text-zinc-900 dark:text-zinc-100">{hover.value != null ? fmt(hover.value) : 'no data'}</span>
          </p>
        )}
      </div>
    </div>
  )
}
