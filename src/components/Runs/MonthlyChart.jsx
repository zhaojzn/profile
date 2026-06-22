import { useMemo, useState } from 'react'
import { RUN_ACCENT } from '../../lib/runs'

// Dependency-free SVG bar chart of distance per month for the last 12 months.
// Hover a bar to see the exact km + run count.
export default function MonthlyChart({ runs }) {
  const months = useMemo(() => buildMonths(runs, 12), [runs])
  const [hovered, setHovered] = useState(null)

  const maxKm = Math.max(1, ...months.map(m => m.km))
  const W = 720, H = 200
  const padT = 12, padB = 26, padX = 4
  const innerH = H - padT - padB
  const slot = (W - padX * 2) / months.length
  const barW = Math.min(40, slot * 0.6)

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
        {months.map((m, i) => {
          const h = (m.km / maxKm) * innerH
          const x = padX + slot * i + (slot - barW) / 2
          const y = padT + (innerH - h)
          const active = hovered === i
          return (
            <g key={m.key}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}>
              {/* full-height hover target */}
              <rect x={padX + slot * i} y={padT} width={slot} height={innerH} fill="transparent" />
              <rect
                x={x} y={y} width={barW} height={Math.max(h, m.km > 0 ? 2 : 0)} rx={3}
                fill={RUN_ACCENT} opacity={active ? 1 : m.km > 0 ? 0.78 : 0.18}
              />
              <text x={padX + slot * i + slot / 2} y={H - 9} textAnchor="middle" fontSize="10" fill="#71717a">
                {m.label}
              </text>
            </g>
          )
        })}
      </svg>
      {hovered !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-neutral-900/95 px-2.5 py-1.5 text-xs shadow-xl"
          style={{ left: `${((padX + slot * hovered + slot / 2) / W) * 100}%`, top: padT }}
        >
          <div className="font-medium text-white">{months[hovered].km.toFixed(1)} km</div>
          <div className="text-zinc-400">{months[hovered].count} run{months[hovered].count === 1 ? '' : 's'}</div>
        </div>
      )}
    </div>
  )
}

// Last `n` calendar months (oldest → newest), each with summed km + run count.
function buildMonths(runs, n) {
  const buckets = new Map()
  for (const r of runs) {
    const d = new Date(r.startTime)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const cur = buckets.get(key) || { km: 0, count: 0 }
    cur.km += (r.distanceMeters || 0) / 1000
    cur.count += 1
    buckets.set(key, cur)
  }
  // Anchor the window to the most recent run, not "today" — keeps the chart
  // meaningful even if the latest run was a while ago.
  const latest = runs.reduce(
    (max, r) => (r.startTime > max ? r.startTime : max),
    runs[0]?.startTime || new Date().toISOString(),
  )
  const end = new Date(latest)
  const out = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(end.getFullYear(), end.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const b = buckets.get(key) || { km: 0, count: 0 }
    out.push({
      key,
      label: d.toLocaleDateString(undefined, { month: 'short' }),
      km: b.km,
      count: b.count,
    })
  }
  return out
}
