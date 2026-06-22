// Minimal dependency-free SVG pie chart. Each slice is a single arc <path>;
// the legend lists every genre with its share. Colors come from the shared
// GENRE_COLORS palette so they match the gallery cards.
import { GENRE_COLORS } from '../../lib/runs'

function polar(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle - Math.PI / 2),
    y: cy + r * Math.sin(angle - Math.PI / 2),
  }
}

function arcPath(cx, cy, r, start, end) {
  const s = polar(cx, cy, r, start)
  const e = polar(cx, cy, r, end)
  const largeArc = end - start > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y} Z`
}

export default function PieChart({ data }) {
  if (!data || data.length === 0) return null
  const total = data.reduce((a, b) => a + b.value, 0) || 1
  const slices = data.map((d, i) => ({
    label: d.label,
    value: d.value,
    color: GENRE_COLORS[i % GENRE_COLORS.length],
  }))

  const cx = 110, cy = 110, r = 100
  let cursor = 0
  const paths = slices.map((s) => {
    const angle = (s.value / total) * Math.PI * 2
    // Epsilon so a single 100% slice still draws as a full circle.
    const path = data.length === 1
      ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
      : arcPath(cx, cy, r, cursor, cursor + angle)
    cursor += angle
    return { ...s, path }
  })

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <svg viewBox="0 0 220 220" className="h-[200px] w-[200px] shrink-0 sm:h-[220px] sm:w-[220px]">
        {paths.map((p, i) => (
          <path key={i} d={p.path} fill={p.color} stroke="#121212" strokeWidth={1.5} />
        ))}
      </svg>
      <ul className="w-full flex-1">
        {slices.map((s, i) => {
          const pct = Math.round((s.value / total) * 100)
          return (
            <li
              key={i}
              className="flex items-center justify-between border-b border-white/10 py-2 text-sm last:border-b-0"
            >
              <span className="flex items-center gap-2.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="text-zinc-200">{s.label}</span>
              </span>
              <span className="tabular-nums text-zinc-400">{pct}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
