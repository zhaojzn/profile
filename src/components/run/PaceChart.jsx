import { useMemo, useState } from 'react'
import { RUN_ACCENT } from '../../lib/runs'

// Clean SVG line chart of pace over time, with a dot at the moment each track
// started playing. Hovering a dot reveals the track + artist. Faster pace is
// higher on the chart.
export default function PaceChart({
  startTime,
  elapsedSeconds,
  streams,
  tracks,
}) {
  const W = 720,
    H = 220
  const padL = 44,
    padR = 12,
    padT = 14,
    padB = 32
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const startMs = useMemo(() => new Date(startTime).getTime(), [startTime])

  // Pace = min/km. velocity ~0 → effectively paused; clip to a sensible ceiling.
  const PACE_CEIL = 12
  const points = useMemo(
    () =>
      streams.time.map((t, i) => {
        const v = streams.velocity[i] ?? 0
        const paceMinPerKm = v > 0.3 ? 1000 / v / 60 : PACE_CEIL
        return { t, pace: Math.min(paceMinPerKm, PACE_CEIL) }
      }),
    [streams]
  )

  // Y axis: lower pace = faster = higher on chart. Invert.
  const maxPace = Math.min(
    PACE_CEIL,
    Math.max(4, ...points.map((p) => p.pace)) + 0.5
  )
  const minPace = Math.max(2.5, Math.min(...points.map((p) => p.pace)) - 0.3)
  const xT = (t) => padL + (t / elapsedSeconds) * innerW
  const yP = (p) => padT + ((p - minPace) / (maxPace - minPace)) * innerH

  const linePath = useMemo(() => {
    if (points.length === 0) return ''
    return points
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'} ${xT(p.t).toFixed(2)} ${yP(p.pace).toFixed(
            2
          )}`
      )
      .join(' ')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, elapsedSeconds, minPace, maxPace])

  const trackDots = useMemo(
    () =>
      tracks
        .map((track) => ({
          track,
          offsetSec: (new Date(track.playedAt).getTime() - startMs) / 1000,
        }))
        .filter((d) => d.offsetSec >= 0 && d.offsetSec <= elapsedSeconds + 60)
        .map((d) => ({
          ...d,
          x: xT(Math.min(d.offsetSec, elapsedSeconds)),
          pace: nearestPace(points, d.offsetSec),
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tracks, startMs, elapsedSeconds, points, minPace, maxPace]
  )

  const [hovered, setHovered] = useState(null)
  // Touch devices have no real hover — avoid mouse-enter/leave there.
  const isTouch = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches,
    []
  )

  const ticks = useMemo(() => {
    const step = (maxPace - minPace) / 3
    return [0, 1, 2, 3].map((i) => minPace + step * i)
  }, [minPace, maxPace])

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
        {ticks.map((p, i) => (
          <g key={i}>
            <line
              x1={padL}
              y1={yP(p)}
              x2={W - padR}
              y2={yP(p)}
              stroke="var(--run-rule, #262626)"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={yP(p) + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--run-muted, #71717a)"
            >
              {p.toFixed(1)}
            </text>
          </g>
        ))}
        <text
          x={padL - 30}
          y={padT + innerH / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${padL - 30} ${padT + innerH / 2})`}
          fontSize="10"
          fill="var(--run-muted, #a1a1aa)"
        >
          pace (min/km)
        </text>

        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
          const sec = elapsedSeconds * f
          return (
            <text
              key={i}
              x={padL + innerW * f}
              y={H - padB + 18}
              textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'}
              fontSize="10"
              fill="var(--run-muted, #71717a)"
            >
              {fmtTimeShort(sec)}
            </text>
          )
        })}

        <path
          d={linePath}
          fill="none"
          stroke={`var(--run-accent, ${RUN_ACCENT})`}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill="transparent"
          onClick={() => setHovered(null)}
        />

        {trackDots.map((d, i) => {
          const y = yP(d.pace)
          const active = hovered === i
          const hoverHandlers = isTouch
            ? {}
            : {
                onMouseEnter: () => setHovered(i),
                onMouseLeave: () => setHovered(null),
              }
          return (
            <g
              key={i}
              {...hoverHandlers}
              onClick={(e) => {
                e.stopPropagation()
                setHovered(i)
              }}
              style={{ cursor: 'pointer' }}
            >
              <line
                x1={d.x}
                y1={padT}
                x2={d.x}
                y2={H - padB}
                stroke={active ? `${RUN_ACCENT}55` : 'transparent'}
                strokeWidth={1}
              />
              <circle cx={d.x} cy={y} r={14} fill="transparent" />
              <circle
                cx={d.x}
                cy={y}
                r={active ? 6 : 4}
                fill="var(--run-paper, #121212)"
                stroke={`var(--run-accent, ${RUN_ACCENT})`}
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )
        })}
      </svg>

      {hovered !== null && trackDots[hovered] && (
        <div
          className="run-tooltip run-pace-tooltip pointer-events-none absolute flex items-center gap-2.5 px-3 py-2 text-xs"
          style={{
            left: `clamp(140px, ${
              (trackDots[hovered].x / W) * 100
            }%, calc(100% - 140px))`,
            top: 0,
            transform: 'translate(-50%, calc(-100% - 6px))',
          }}
        >
          {trackDots[hovered].track.imageUrl ? (
            <img
              src={trackDots[hovered].track.imageUrl}
              alt=""
              className="run-track-art"
            />
          ) : (
            <div className="run-track-art" />
          )}
          <div className="min-w-0">
            <div className="run-tooltip-title">
              {trackDots[hovered].track.trackName}
            </div>
            <div className="run-tooltip-sub">
              {trackDots[hovered].track.artistNames.join(', ')}
            </div>
            <div className="run-tooltip-sub mt-1 tabular-nums">
              {fmtTimeShort(trackDots[hovered].offsetSec)} in ·{' '}
              {trackDots[hovered].pace.toFixed(2)} min/km
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function nearestPace(points, sec) {
  if (points.length === 0) return 0
  let best = points[0]
  let bestDiff = Math.abs(points[0].t - sec)
  for (let i = 1; i < points.length; i++) {
    const diff = Math.abs(points[i].t - sec)
    if (diff < bestDiff) {
      best = points[i]
      bestDiff = diff
    }
  }
  return best.pace
}

function fmtTimeShort(sec) {
  const total = Math.max(0, Math.round(sec))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}
