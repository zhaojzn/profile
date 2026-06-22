import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRuns, fmtDate, fmtDuration, fmtKm, fmtPace, GENRE_COLORS } from '../../lib/runs'

const ArrowUpRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

const Runs = () => {
  const [runs, setRuns] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchRuns()
      .then(items => { if (!cancelled) setRuns(items) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  const totalKm = runs ? runs.reduce((a, r) => a + (r.distanceMeters || 0), 0) / 1000 : 0

  return (
    <section id="runs" className="mx-auto w-full max-w-6xl px-6 pb-28 pt-16 md:pb-36 md:pt-24">
      <div className="flex items-center gap-3 text-zinc-400">
        <span className="block h-px w-8 bg-zinc-600" />
        <span className="text-[11px] font-medium uppercase tracking-[0.4em]">off the clock</span>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">See my runs</h2>
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          Every run, with the music I listened to and the genre mix it added up to —
          pulled automatically from Strava the moment I finish.
          {runs && runs.length > 0 && (
            <span className="mt-1 block text-zinc-500">
              {runs.length} run{runs.length === 1 ? '' : 's'} · {totalKm.toFixed(0)} km logged
            </span>
          )}
        </p>
      </div>

      <div className="mt-14">
        {runs === null && !error && <SkeletonGrid />}
        {(error || (runs && runs.length === 0)) && (
          <p className="text-sm text-zinc-500">Runs are syncing — check back soon.</p>
        )}
        {runs && runs.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {runs.map(run => <RunCard key={run.activityId} run={run} />)}
          </div>
        )}
      </div>
    </section>
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
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">
              {fmtDate(run.startTime)}
            </div>
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
              <span
                key={g.genre}
                style={{ width: `${g.percent}%`, background: GENRE_COLORS[i % GENRE_COLORS.length] }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-400">
            {top.slice(0, 3).map((g, i) => (
              <span key={g.genre} className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-sm"
                  style={{ background: GENRE_COLORS[i % GENRE_COLORS.length] }}
                />
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

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="h-44 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
    ))}
  </div>
)

export default Runs
