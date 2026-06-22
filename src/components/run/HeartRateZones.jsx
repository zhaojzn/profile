import { useMemo } from 'react'

// Five-zone model as % of max HR. Default max ~200 (≈220−20yr); the run's own
// observed max overrides it if higher, so a hard effort still lands in Z5.
const DEFAULT_MAX_HR = 200

const ZONES = [
  { name: 'Recovery',   tag: 'Z1', lo: 0.00, color: '#60a5fa' },
  { name: 'Aerobic',    tag: 'Z2', lo: 0.60, color: '#34d399' },
  { name: 'Tempo',      tag: 'Z3', lo: 0.70, color: '#facc15' },
  { name: 'Threshold',  tag: 'Z4', lo: 0.80, color: '#fb923c' },
  { name: 'Anaerobic',  tag: 'Z5', lo: 0.90, color: '#ef4444' },
]

export default function HeartRateZones({ streams }) {
  const data = useMemo(() => compute(streams), [streams])
  if (!data) return null
  const { zones, totalSec, avgHr, maxHr } = data

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-x-8 gap-y-2">
        <HeadStat label="Avg HR" value={`${avgHr} bpm`} />
        <HeadStat label="Max HR" value={`${maxHr} bpm`} />
      </div>

      {/* distribution bar */}
      <div className="mb-6 flex h-2.5 overflow-hidden rounded-full bg-white/5">
        {zones.map(z => z.sec > 0 && (
          <span key={z.tag} style={{ width: `${(z.sec / totalSec) * 100}%`, background: z.color }} />
        ))}
      </div>

      {/* per-zone rows */}
      <div className="flex flex-col gap-2.5">
        {zones.slice().reverse().map(z => {
          const pct = (z.sec / totalSec) * 100
          return (
            <div key={z.tag} className="flex items-center gap-3">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: z.color }} />
              <div className="flex w-32 shrink-0 items-baseline gap-1.5">
                <span className="text-sm font-medium text-zinc-200">{z.tag}</span>
                <span className="text-xs text-zinc-500">{z.name}</span>
              </div>
              <span className="hidden w-20 shrink-0 text-xs tabular-nums text-zinc-500 sm:block">{z.range}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: z.color }} />
              </div>
              <span className="w-14 shrink-0 text-right text-xs tabular-nums text-zinc-300">{fmtMS(z.sec)}</span>
              <span className="w-10 shrink-0 text-right text-xs tabular-nums text-zinc-500">{Math.round(pct)}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function compute(streams) {
  const time = streams?.time
  const hr = streams?.heartrate
  if (!Array.isArray(time) || !Array.isArray(hr) || hr.length < 2) return null

  const n = Math.min(time.length, hr.length)
  const observedMax = Math.max(...hr.slice(0, n))
  const maxHr = Math.max(DEFAULT_MAX_HR, observedMax)

  // Absolute bpm floor for each zone, from the % thresholds.
  const bounds = ZONES.map((z, i) => ({
    ...z,
    floor: Math.round(z.lo * maxHr),
    ceil: i < ZONES.length - 1 ? Math.round(ZONES[i + 1].lo * maxHr) : Infinity,
    sec: 0,
  }))

  let totalSec = 0, weighted = 0
  for (let i = 1; i < n; i++) {
    let dt = time[i] - time[i - 1]
    if (dt <= 0) continue
    if (dt > 30) dt = 30 // clamp pauses so a long stop doesn't skew a zone
    const bpm = hr[i]
    const z = bounds.find(b => bpm >= b.floor && bpm < b.ceil) ?? bounds[0]
    z.sec += dt
    totalSec += dt
    weighted += bpm * dt
  }
  if (totalSec === 0) return null

  for (const b of bounds) {
    b.range = b.ceil === Infinity ? `${b.floor}+` : `${b.floor}–${b.ceil - 1}`
  }
  return {
    zones: bounds,
    totalSec,
    avgHr: Math.round(weighted / totalSec),
    maxHr: observedMax,
  }
}

function HeadStat({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
      <div className="mt-0.5 text-lg font-semibold tabular-nums text-white">{value}</div>
    </div>
  )
}

function fmtMS(sec) {
  const m = Math.floor(sec / 60)
  const s = Math.round(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
