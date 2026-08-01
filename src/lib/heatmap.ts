// Simple 3-color (red -> yellow -> green) heatmap, matching the Excel-style
// conditional formatting the tracker is modeled on. `higherIsBetter` controls
// direction: for cost/NPA metrics, lower values should read green.
export function heatColor(
  value: number | null,
  values: (number | null)[],
  higherIsBetter: boolean,
): string {
  if (value == null) return 'transparent'
  const nums = values.filter((v): v is number => v != null)
  if (nums.length < 2) return 'transparent'
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  if (min === max) return 'transparent'
  let t = (value - min) / (max - min)
  if (!higherIsBetter) t = 1 - t
  // red (0) -> yellow (0.5) -> green (1), pastel
  const hue = t * 120
  return `hsl(${hue}, 70%, 82%)`
}

export function heatTextColor(): string {
  return 'rgb(39, 39, 42)'
}
