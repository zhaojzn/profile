import { useEffect, useState } from 'react'
import LinkArrow from './LinkArrow'

const REFRESH_MS = 30_000

function timeAgo(iso) {
  const elapsed = Date.now() - new Date(iso).getTime()
  if (!Number.isFinite(elapsed)) return null
  const minutes = Math.max(0, Math.floor(elapsed / 60_000))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function ListeningLine({ status }) {
  const track = status?.track
  if (!track) return null
  const ago =
    !track.isPlaying && track.playedAt ? timeAgo(track.playedAt) : null
  const trackUrl =
    track.artworkSource === 'spotify'
      ? track.spotifyUrl
      : track.url || track.spotifyUrl

  return (
    <section className="personal-listening" aria-label="What I’m listening to">
      <a
        className="listening-art"
        href={trackUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${track.title} by ${track.artist}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M9 17V6l10-2v11M9 9l10-2" strokeLinejoin="round" />
          <ellipse cx="6" cy="17" rx="3" ry="2" />
          <ellipse cx="16" cy="15" rx="3" ry="2" />
        </svg>
        {track.imageUrl && (
          <img
            key={track.imageUrl}
            src={track.imageUrl}
            alt=""
            width="36"
            height="36"
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget
              if (
                track.fallbackImageUrl &&
                image.src !== track.fallbackImageUrl
              ) {
                image.src = track.fallbackImageUrl
              } else {
                image.style.display = 'none'
              }
            }}
          />
        )}
      </a>
      <div className="listening-copy">
        <div className="listening-meta">
          <span className={track.isPlaying ? 'listening-live' : ''}>
            {track.isPlaying && <i aria-hidden="true" />}
            {track.isPlaying ? 'Listening now' : 'Last played'}
          </span>
          {ago && (
            <time
              dateTime={track.playedAt}
              title={new Date(track.playedAt).toLocaleString()}
            >
              {ago}
            </time>
          )}
          <a href={status.profileUrl} target="_blank" rel="noreferrer">
            last.fm
          </a>
        </div>
        <a
          className="listening-track"
          href={trackUrl}
          target="_blank"
          rel="noreferrer"
          title={`${track.title} — ${track.artist}`}
        >
          {track.title}
          <span className="listening-artist"> — {track.artist}</span>
        </a>
      </div>
      <a
        className="listening-spotify"
        href={track.spotifyUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Find ${track.title} by ${track.artist} on Spotify`}
        title="Find on Spotify"
      >
        Spotify <LinkArrow />
      </a>
    </section>
  )
}

export default function ListeningStatus() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let disposed = false
    let timer
    let controller

    const refresh = async () => {
      clearTimeout(timer)
      controller?.abort()
      const request = new AbortController()
      controller = request
      const deadline = setTimeout(() => request.abort(), 10_000)
      try {
        const response = await fetch('/api/now-playing', {
          signal: request.signal,
        })
        if (!response.ok) throw new Error('Listening status unavailable')
        const data = await response.json()
        if (!disposed && controller === request) {
          setStatus(data.configured && data.track ? data : null)
        }
      } catch {
        if (!disposed && controller === request) setStatus(null)
      } finally {
        clearTimeout(deadline)
        if (!disposed && controller === request && !document.hidden) {
          timer = setTimeout(refresh, REFRESH_MS)
        }
      }
    }

    const visibilityChanged = () => {
      if (document.hidden) {
        clearTimeout(timer)
        controller?.abort()
      } else {
        // A song from an old tab session must not appear to be playing now.
        setStatus(null)
        refresh()
      }
    }

    refresh()
    document.addEventListener('visibilitychange', visibilityChanged)
    return () => {
      disposed = true
      clearTimeout(timer)
      controller?.abort()
      document.removeEventListener('visibilitychange', visibilityChanged)
    }
  }, [])

  return <ListeningLine status={status} />
}
