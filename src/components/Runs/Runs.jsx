import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchRuns,
  fmtDate,
  fmtDuration,
  fmtKm,
  fmtPace,
  fmtTotalKm,
  fmtTotalTime,
  fmtMonth,
  GENRE_COLORS,
} from '../../lib/runs'
import MonthlyChart from './MonthlyChart'
import RunningShoe from '../RunningShoe'

const PAGE = 9 // runs revealed per "View more"

const ArrowUpRight = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
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
      .then((items) => {
        if (!cancelled) setRuns(items)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const stats = useMemo(() => (runs ? computeStats(runs) : null), [runs])

  return (
    <section id="runs" className="run-log">
      <header className="run-log-intro">
        <div>
          <h1>Running log</h1>
          <p>
            Training for my first marathon.
            <br />A record of my runs and what I listened to.
          </p>
        </div>
        <RunningShoe />
      </header>

      {error && (
        <p className="run-message" role="status">
          Runs are syncing. Check back soon.
        </p>
      )}

      {runs === null && !error && <Skeleton />}

      {runs && runs.length > 0 && stats && (
        <>
          {/* Lifetime stats */}
          <div className="run-totals">
            <BigStat
              label="Total distance"
              value={fmtTotalKm(stats.totalMeters)}
            />
            <BigStat label="Runs" value={String(stats.count)} />
            <BigStat
              label="Time on feet"
              value={fmtTotalTime(stats.totalSeconds)}
            />
            <BigStat
              label="Avg pace"
              value={fmtPace(stats.totalMeters, stats.totalSeconds)}
            />
          </div>

          {/* Personal bests */}
          <Heading>Personal bests</Heading>
          <div className="run-bests">
            <BestCard
              label="Longest run"
              value={fmtKm(stats.longest.distanceMeters)}
              sub={fmtDate(stats.longest.startTime)}
              to={`/run/${stats.longest.activityId}`}
            />
            <BestCard
              label="Fastest pace"
              value={fmtPace(
                stats.fastest.distanceMeters,
                stats.fastest.elapsedSeconds
              )}
              sub={`${fmtKm(stats.fastest.distanceMeters)} · ${fmtDate(
                stats.fastest.startTime
              )}`}
              to={`/run/${stats.fastest.activityId}`}
            />
            <BestCard
              label="Longest time"
              value={fmtDuration(stats.longestTime.elapsedSeconds)}
              sub={fmtDate(stats.longestTime.startTime)}
              to={`/run/${stats.longestTime.activityId}`}
            />
            <BestCard
              label="Biggest month"
              value={`${stats.biggestMonth.km.toFixed(0)} km`}
              sub={stats.biggestMonth.label}
            />
          </div>

          {/* Training volume */}
          <Heading>
            Training volume <span>last 12 months</span>
          </Heading>
          <div className="run-chart-panel">
            <MonthlyChart runs={runs} />
          </div>

          {/* Top genres */}
          {stats.topGenres.length > 0 && (
            <>
              <Heading>What I run to</Heading>
              <div className="run-genres-panel">
                <GenreBars genres={stats.topGenres} />
              </div>
            </>
          )}

          {/* All runs, paginated */}
          <Heading>
            All runs <span>{runs.length} runs</span>
          </Heading>
          <div className="run-list">
            {runs.slice(0, visible).map((run) => (
              <RunCard key={run.activityId} run={run} />
            ))}
          </div>

          {visible < runs.length && (
            <div className="run-pagination">
              <button
                onClick={() => setVisible((v) => v + PAGE)}
                className="run-more"
              >
                View more
              </button>
              <span>
                Showing {visible} of {runs.length}
              </span>
            </div>
          )}
        </>
      )}
    </section>
  )
}

/* ---------- pieces ---------- */

const Heading = ({ children }) => (
  <h2 className="run-section-heading">{children}</h2>
)

const BigStat = ({ label, value }) => (
  <div className="run-total">
    <div className="run-label">{label}</div>
    <div className="run-total-value">{value}</div>
  </div>
)

const BestCard = ({ label, value, sub, to }) => {
  const inner = (
    <>
      <div className="run-best-label">
        <div className="run-label">{label}</div>
        {to && <ArrowUpRight aria-hidden="true" />}
      </div>
      <div className="run-best-value">{value}</div>
      {sub && <div className="run-best-note">{sub}</div>}
    </>
  )
  const cls = 'run-best'
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

const GenreBars = ({ genres }) => {
  const max = Math.max(...genres.map((g) => g.count))
  return (
    <div className="run-genre-bars">
      {genres.map((g, i) => (
        <div key={g.genre} className="run-genre-row">
          <div className="run-genre-name">{g.genre}</div>
          <div className="run-genre-track">
            <div
              className="run-genre-fill"
              style={{
                width: `${(g.count / max) * 100}%`,
                background: GENRE_COLORS[i % GENRE_COLORS.length],
              }}
            />
          </div>
          <div className="run-genre-count">{g.count}</div>
        </div>
      ))}
    </div>
  )
}

const RunCard = ({ run }) => {
  const top = (run.genreBreakdown ?? []).slice(0, 5)
  return (
    <Link to={`/run/${run.activityId}`} className="run-entry">
      <div className="run-entry-main">
        <div className="run-entry-name">
          <div className="run-label">{fmtDate(run.startTime)}</div>
          <h3>{run.name || 'Run'}</h3>
        </div>
        <div className="run-entry-stats">
          <CardStat label="Distance" value={fmtKm(run.distanceMeters || 0)} />
          <CardStat label="Time" value={fmtDuration(run.elapsedSeconds || 0)} />
          <CardStat
            label="Pace"
            value={fmtPace(run.distanceMeters, run.elapsedSeconds)}
          />
        </div>
      </div>

      {top.length > 0 ? (
        <div className="run-entry-music">
          <div className="run-entry-mix" aria-hidden="true">
            {top.map((g, i) => (
              <span
                key={g.genre}
                style={{
                  width: `${g.percent}%`,
                  background: GENRE_COLORS[i % GENRE_COLORS.length],
                }}
              />
            ))}
          </div>
          <div className="run-entry-genres">
            {top.slice(0, 3).map((g, i) => (
              <span key={g.genre}>
                <i
                  aria-hidden="true"
                  style={{ background: GENRE_COLORS[i % GENRE_COLORS.length] }}
                />
                {g.genre}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="run-entry-music run-label">
          {run.trackCount || 0} tracks
        </div>
      )}
      <ArrowUpRight className="run-entry-arrow" aria-hidden="true" />
    </Link>
  )
}

const CardStat = ({ label, value }) => (
  <div className="run-entry-stat">
    <div className="run-label">{label}</div>
    <div className="run-entry-value">{value}</div>
  </div>
)

const Skeleton = () => (
  <div className="run-skeleton" role="status" aria-label="Loading runs">
    <div className="run-skeleton-total" />
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="run-skeleton-row" />
      ))}
    </div>
  </div>
)

/* ---------- stats ---------- */

function computeStats(runs) {
  const totalMeters = runs.reduce((a, r) => a + (r.distanceMeters || 0), 0)
  const totalSeconds = runs.reduce((a, r) => a + (r.elapsedSeconds || 0), 0)

  const longest = runs.reduce(
    (a, r) => (r.distanceMeters > (a?.distanceMeters || 0) ? r : a),
    runs[0]
  )
  const longestTime = runs.reduce(
    (a, r) => (r.elapsedSeconds > (a?.elapsedSeconds || 0) ? r : a),
    runs[0]
  )

  // Fastest avg pace, only among runs ≥ 2km so a short sprint doesn't win.
  const pacePool = runs.filter(
    (r) => (r.distanceMeters || 0) >= 2000 && r.elapsedSeconds > 0
  )
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
    if (km > biggestMonth.km)
      biggestMonth = { label: fmtMonth(`${key}-01`), km }
  }

  // Most-played genres across all runs, by track count. Skip catch-all
  // buckets — they're noise in a "what I run to" ranking.
  const IGNORE = new Set(['uncategorized', 'unknown', 'other'])
  const genreCounts = new Map()
  for (const r of runs) {
    for (const g of r.genreBreakdown ?? []) {
      if (IGNORE.has((g.genre || '').toLowerCase())) continue
      genreCounts.set(
        g.genre,
        (genreCounts.get(g.genre) || 0) + (g.trackCount || 0)
      )
    }
  }
  const topGenres = [...genreCounts.entries()]
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  return {
    count: runs.length,
    totalMeters,
    totalSeconds,
    longest,
    longestTime,
    fastest,
    biggestMonth,
    topGenres,
  }
}

export default Runs
