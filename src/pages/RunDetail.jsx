import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  fetchRun,
  fmtDate,
  fmtDuration,
  fmtKm,
  fmtPace,
  fmtClock,
} from '../lib/runs'
import PieChart from '../components/run/PieChart'
import PaceChart from '../components/run/PaceChart'
import HeartRateZones from '../components/run/HeartRateZones'
import RunShell from '../components/Runs/RunShell'

export default function RunDetail() {
  const { id } = useParams()
  const [run, setRun] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setRun(null)
    setError(null)
    fetchRun(id)
      .then((d) => {
        if (!cancelled) setRun(d)
      })
      .catch((e) => {
        if (!cancelled) setError(e.message)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return (
      <RunShell detail>
        <main className="run-message">
          <div>
            <h1>{error}</h1>
            <p>This run might be private, deleted, or never processed.</p>
            <Link to="/runs">← All runs</Link>
          </div>
        </main>
      </RunShell>
    )
  }

  if (!run) {
    return (
      <RunShell detail>
        <main className="run-message" role="status">
          Loading run…
        </main>
      </RunShell>
    )
  }

  const hasStreams = run.streams && run.streams.time?.length > 1
  const hasHr = hasStreams && run.streams.heartrate?.length > 1

  return (
    <RunShell detail>
      <main className="run-detail">
        <header className="run-detail-intro">
          <div className="run-label run-detail-date">
            {fmtDate(run.startTime)}
            {run.musicSource && ` · music via ${run.musicSource}`}
          </div>
          <h1>{run.name || 'Run'}</h1>
          <div className="run-totals run-detail-totals">
            <Stat label="Distance" value={fmtKm(run.distanceMeters || 0)} />
            <Stat label="Time" value={fmtDuration(run.elapsedSeconds || 0)} />
            <Stat
              label="Avg pace"
              value={fmtPace(run.distanceMeters, run.elapsedSeconds)}
            />
            <Stat label="Tracks" value={String(run.tracks.length)} />
          </div>
        </header>

        {hasHr ? (
          <Section title="Heart rate zones">
            <HeartRateZones streams={run.streams} />
            <p className="run-chart-note">
              Time spent in each zone, as a share of moving time. Zones are % of
              max HR.
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
            <p className="run-chart-note">
              Faster pace is higher. Hover a dot to see which track started
              playing at that moment.
            </p>
          </Section>
        ) : null}

        {run.genreBreakdown.length > 0 && (
          <Section title="Genre mix">
            <PieChart
              data={run.genreBreakdown.map((g) => ({
                label: g.genre,
                value: g.percent,
              }))}
            />
          </Section>
        )}

        <section className="run-detail-section">
          <h2 className="run-section-heading">Tracks played</h2>
          {run.tracks.length === 0 ? (
            <div className="run-empty-tracks">
              No tracks were recorded for this run.
            </div>
          ) : (
            <div className="run-track-list">
              {run.tracks
                .slice()
                .sort((a, b) => (a.playedAt < b.playedAt ? -1 : 1))
                .map((t, i) => (
                  <div key={`${t.trackId}-${i}`} className="run-track">
                    <TrackArt url={t.imageUrl} />
                    <div className="run-track-info">
                      <div className="run-track-name">{t.trackName}</div>
                      <div className="run-track-artist">
                        {t.artistNames.join(', ')}
                      </div>
                    </div>
                    <div className="run-track-time">{fmtClock(t.playedAt)}</div>
                  </div>
                ))}
            </div>
          )}
        </section>

        <footer className="run-detail-footer">
          <Link to="/runs">← All runs</Link>
          <div>
            <a
              href={`https://www.strava.com/activities/${run.activityId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="run-strava-link"
              style={{ color: '#FC5200' }}
            >
              View on Strava
            </a>
            <img src="/powered-by-strava.svg" alt="Powered by Strava" />
          </div>
        </footer>
      </main>
    </RunShell>
  )
}

function Section({ title, children }) {
  return (
    <section className="run-detail-section">
      <h2 className="run-section-heading">{title}</h2>
      <div className="run-detail-panel">{children}</div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="run-total">
      <div className="run-label">{label}</div>
      <div className="run-total-value">{value}</div>
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
        className="run-track-art"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }
  return (
    <div className="run-track-art run-track-art-empty">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          d="M9 18V5l12-2v13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </div>
  )
}
