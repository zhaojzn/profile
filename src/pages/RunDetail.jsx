import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchRun, fmtDate, fmtDuration, fmtKm, fmtPace, fmtClock } from '../lib/runs'
import PieChart from '../components/run/PieChart'
import PaceChart from '../components/run/PaceChart'
import HeartRateZones from '../components/run/HeartRateZones'

export default function RunDetail() {
  const { id } = useParams()
  const [run, setRun] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setRun(null)
    setError(null)
    fetchRun(id)
      .then(d => { if (!cancelled) setRun(d) })
      .catch(e => { if (!cancelled) setError(e.message) })
    return () => { cancelled = true }
  }, [id])

  if (error) {
    return (
      <Shell>
        <div className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="max-w-md rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
            <h2 className="mb-2 text-lg font-semibold text-white">{error}</h2>
            <p className="mb-4 text-sm text-zinc-400">
              This run might be private, deleted, or never processed.
            </p>
            <Link to="/" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline">
              ← Back home
            </Link>
          </div>
        </div>
      </Shell>
    )
  }

  if (!run) {
    return (
      <Shell>
        <div className="flex flex-1 items-center justify-center py-24 text-sm text-zinc-500">Loading…</div>
      </Shell>
    )
  }

  const hasStreams = run.streams && run.streams.time?.length > 1
  const hasHr = hasStreams && run.streams.heartrate?.length > 1

  return (
    <Shell>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-10 sm:pt-14">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3 text-zinc-400">
            <span className="block h-px w-8 bg-zinc-600" />
            <span className="text-[11px] font-medium uppercase tracking-[0.35em]">
              {fmtDate(run.startTime)}{run.musicSource && ` · music via ${run.musicSource}`}
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {run.name || 'Run'}
          </h1>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <Stat label="Distance" value={fmtKm(run.distanceMeters || 0)} />
            <Stat label="Time" value={fmtDuration(run.elapsedSeconds || 0)} />
            <Stat label="Avg pace" value={fmtPace(run.distanceMeters, run.elapsedSeconds)} />
            <Stat label="Tracks" value={String(run.tracks.length)} />
          </div>
        </header>

        {hasHr ? (
          <Section title="Heart rate zones">
            <HeartRateZones streams={run.streams} />
            <p className="mt-4 text-xs text-zinc-500">
              Time spent in each zone, as a share of moving time. Zones are % of max HR.
            </p>
          </Section>
        ) : hasStreams ? (
          <Section title="Pace + music">
            <PaceChart
              startTime={run.startTime}
              elapsedSeconds={run.elapsedSeconds}
              streams={run.streams}
              tracks={run.tracks}
            />
            <p className="mt-3 text-xs text-zinc-500">
              Faster pace is higher. Hover a dot to see which track started playing at that moment.
            </p>
          </Section>
        ) : null}

        {run.genreBreakdown.length > 0 && (
          <Section title="Genre mix">
            <PieChart data={run.genreBreakdown.map(g => ({ label: g.genre, value: g.percent }))} />
          </Section>
        )}

        <section className="mb-4">
          <h2 className="mb-3 text-sm font-semibold text-white">Tracks played</h2>
          {run.tracks.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-6 text-sm text-zinc-400">
              No tracks were recorded for this run.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-white/10">
              {run.tracks
                .slice()
                .sort((a, b) => (a.playedAt < b.playedAt ? -1 : 1))
                .map((t, i) => (
                  <div
                    key={`${t.trackId}-${i}`}
                    className="flex items-center gap-3.5 border-t border-white/10 bg-white/[0.02] px-4 py-3 first:border-t-0"
                  >
                    <TrackArt url={t.imageUrl} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">{t.trackName}</div>
                      <div className="truncate text-xs text-zinc-400">{t.artistNames.join(', ')}</div>
                    </div>
                    <div className="shrink-0 tabular-nums text-xs text-zinc-500">{fmtClock(t.playedAt)}</div>
                  </div>
                ))}
            </div>
          )}
        </section>

        <footer className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/runs" className="text-zinc-400 transition hover:text-white">
            ← All runs
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={`https://www.strava.com/activities/${run.activityId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
              style={{ color: '#FC5200' }}
            >
              View on Strava
            </a>
            <img src="/powered-by-strava.svg" alt="Powered by Strava" className="h-5 w-auto opacity-70" />
          </div>
        </footer>
      </main>
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-white antialiased">
      <header className="border-b border-white/5">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-sm font-semibold tracking-wide text-white">
            jason zhao
          </Link>
          <Link to="/runs" className="text-sm text-zinc-300 transition hover:text-white">
            Runs
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-sm font-semibold text-white">{title}</h2>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">{children}</div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
      <div className="text-lg font-medium tabular-nums text-white">{value}</div>
    </div>
  )
}

function TrackArt({ url }) {
  if (url) {
    return (
      <img
        src={url}
        alt=""
        loading="lazy"
        className="h-10 w-10 shrink-0 rounded-sm bg-neutral-800 object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    )
  }
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-neutral-800">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fc5200" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </div>
  )
}
