import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchRuns, fmtDate, fmtDuration, fmtKm, fmtPace,
  fmtTotalKm, fmtTotalTime, fmtMonth, GENRE_COLORS,
} from '../../lib/runs'
import MonthlyChart from './MonthlyChart'

const PAGE = 9 // runs revealed per "View more"

const ArrowUpRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

const Runs = () => {
  const [runs, setRuns] = useState(null)
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(PAGE)

  useEffect(() => {
    let cancelled = false
    fetchRuns()
      .then(items => { if (!cancelled) setRuns(items) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  const stats = useMemo(() => (runs ? computeStats(runs) : null), [runs])

  return (
    <section id="runs" className="mx-auto w-full max-w-6xl px-6 pb-28 pt-16 md:pb-36 md:pt-24">
      <div className="flex items-center gap-3 text-zinc-400">
        <span className="block h-px w-8 bg-zinc-600" />
        <span className="text-[11px] font-medium uppercase tracking-[0.4em]">off the clock</span>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Running</h2>
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          Every run I log, with the music I listened to and the genre mix it added up to —
          pulled automatically from Strava. Currently training for my first marathon.
        </p>
      </div>

      {error && (
        <p className="mt-14 text-sm text-zinc-500">Runs are syncing — check back soon.</p>
      )}

      {runs === null && !error && <Skeleton />}

      {runs && runs.length > 0 && stats && (
        <>
          {/* Lifetime stats */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-4">
            <BigStat label="Total distance" value={fmtTotalKm(stats.totalMeters)} />
            <BigStat label="Runs" value={String(stats.count)} />
            <BigStat label="Time on feet" value={fmtTotalTime(stats.totalSeconds)} />
            <BigStat label="Avg pace" value={fmtPace(stats.totalMeters, stats.totalSeconds)} />
          </div>

          {/* Personal bests */}
          <Heading>Personal bests</Heading>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <BestCard label="Longest run" value={fmtKm(stats.longest.distanceMeters)} sub={fmtDate(stats.longest.startTime)} to={`/run/${stats.longest.activityId}`} />
            <BestCard label="Fastest pace" value={fmtPace(stats.fastest.distanceMeters, stats.fastest.elapsedSeconds)} sub={`${fmtKm(stats.fastest.distanceMeters)} · ${fmtDate(stats.fastest.startTime)}`} to={`/run/${stats.fastest.activityId}`} />
            <BestCard label="Longest time" value={fmtDuration(stats.longestTime.elapsedSeconds)} sub={fmtDate(stats.longestTime.startTime)} to={`/run/${stats.longestTime.activityId}`} />
            <BestCard label="Biggest month" value={`${stats.biggestMonth.km.toFixed(0)} km`} sub={stats.biggestMonth.label} />
          </div>

          {/* Training volume */}
          <Heading>Training volume <span className="font-normal text-zinc-500">· last 12 months</span></Heading>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
            <MonthlyChart runs={runs} />
          </div>

          {/* Top genres */}
          {stats.topGenres.length > 0 && (
            <>
              <Heading>What I run to</Heading>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <GenreBars genres={stats.topGenres} />
              </div>
            </>
          )}

          {/* All runs, paginated */}
          <Heading>All runs <span className="font-normal text-zinc-500">· {runs.length}</span></Heading>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {runs.slice(0, visible).map(run => <RunCard key={run.activityId} run={run} />)}
          </div>

          {visible < runs.length && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setVisible(v => v + PAGE)}
                className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.06]"
              >
                View more
              </button>
              <span className="text-xs text-zinc-500">Showing {visible} of {runs.length}</span>
            </div>
          )}
        </>
      )}
    </section>
  )
}

/* ---------- pieces ---------- */

const Heading = ({ children }) => (
  <h3 className="mt-16 text-lg font-semibold text-white">{children}</h3>
)

const BigStat = ({ label, value }) => (
  <div className="bg-[#121212] px-4 py-5 sm:px-6 sm:py-6">
    <div className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
    <div className="mt-1.5 text-2xl font-bold tabular-nums text-white sm:text-3xl">{value}</div>
  </div>
)

const BestCard = ({ label, value, sub, to }) => {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
        {to && <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />}
      </div>
      <div className="mt-2 text-xl font-bold tabular-nums text-white">{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-400">{sub}</div>}
    </>
  )
  const cls = 'group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition'
  return to
    ? <Link to={to} className={`${cls} hover:border-white/20 hover:bg-white/[0.04]`}>{inner}</Link>
    : <div className={cls}>{inner}</div>
}

const GenreBars = ({ genres }) => {
  const max = Math.max(...genres.map(g => g.count))
  return (
    <div className="flex flex-col gap-3">
      {genres.map((g, i) => (
        <div key={g.genre} className="flex items-center gap-3">
          <div className="w-24 shrink-0 truncate text-sm text-zinc-300">{g.genre}</div>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{ width: `${(g.count / max) * 100}%`, background: GENRE_COLORS[i % GENRE_COLORS.length] }}
            />
          </div>
          <div className="w-10 shrink-0 text-right text-xs tabular-nums text-zinc-500">{g.count}</div>
        </div>
      ))}
    </div>
  )
}

const RunCard = ({ run }) => {
  const top = (run.genreBreakdown ?? []).slice(0, 5)
  return (
    <Link
      to={`/run/${run.activityId}`}
      className="group flex flex-col justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">{fmtDate(run.startTime)}</div>
            <h3 className="mt-1 truncate text-lg font-semibold text-white">{run.name || 'Run'}</h3>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <CardStat label="Distance" value={fmtKm(run.distanceMeters || 0)} />
          <CardStat label="Time" value={fmtDuration(run.elapsedSeconds || 0)} />
          <CardStat label="Pace" value={fmtPace(run.distanceMeters, run.elapsedSeconds)} />
        </div>
      </div>

      {top.length > 0 ? (
        <div>
          <div className="flex h-1.5 overflow-hidden rounded-full bg-white/5">
            {top.map((g, i) => (
              <span key={g.genre} style={{ width: `${g.percent}%`, background: GENRE_COLORS[i % GENRE_COLORS.length] }} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-400">
            {top.slice(0, 3).map((g, i) => (
              <span key={g.genre} className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-sm" style={{ background: GENRE_COLORS[i % GENRE_COLORS.length] }} />
                {g.genre}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-600">{run.trackCount || 0} tracks</div>
      )}
    </Link>
  )
}

const CardStat = ({ label, value }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
    <div className="mt-0.5 text-sm font-medium tabular-nums text-zinc-200">{value}</div>
  </div>
)

const Skeleton = () => (
  <>
    <div className="mt-14 h-24 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-44 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
      ))}
    </div>
  </>
)

/* ---------- stats ---------- */

function computeStats(runs) {
  const totalMeters = runs.reduce((a, r) => a + (r.distanceMeters || 0), 0)
  const totalSeconds = runs.reduce((a, r) => a + (r.elapsedSeconds || 0), 0)

  const longest = runs.reduce((a, r) => (r.distanceMeters > (a?.distanceMeters || 0) ? r : a), runs[0])
  const longestTime = runs.reduce((a, r) => (r.elapsedSeconds > (a?.elapsedSeconds || 0) ? r : a), runs[0])

  // Fastest avg pace, only among runs ≥ 2km so a short sprint doesn't win.
  const pacePool = runs.filter(r => (r.distanceMeters || 0) >= 2000 && r.elapsedSeconds > 0)
  const fastest = (pacePool.length ? pacePool : runs).reduce((a, r) => {
    const p = r.elapsedSeconds / r.distanceMeters
    const ap = a.elapsedSeconds / a.distanceMeters
    return p < ap ? r : a
  })

  // Biggest single calendar month by distance.
  const monthly = new Map()
  for (const r of runs) {
    const key = r.startTime.slice(0, 7) // YYYY-MM
    monthly.set(key, (monthly.get(key) || 0) + (r.distanceMeters || 0) / 1000)
  }
  let biggestMonth = { label: '—', km: 0 }
  for (const [key, km] of monthly) {
    if (km > biggestMonth.km) biggestMonth = { label: fmtMonth(`${key}-01`), km }
  }

  // Most-played genres across all runs, by track count. Skip catch-all
  // buckets — they're noise in a "what I run to" ranking.
  const IGNORE = new Set(['uncategorized', 'unknown', 'other'])
  const genreCounts = new Map()
  for (const r of runs) {
    for (const g of r.genreBreakdown ?? []) {
      if (IGNORE.has((g.genre || '').toLowerCase())) continue
      genreCounts.set(g.genre, (genreCounts.get(g.genre) || 0) + (g.trackCount || 0))
    }
  }
  const topGenres = [...genreCounts.entries()]
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  return {
    count: runs.length,
    totalMeters, totalSeconds,
    longest, longestTime, fastest,
    biggestMonth, topGenres,
  }
}

export default Runs
