const CACHE_MS = 25_000
const UPSTREAM_TIMEOUT_MS = 6_000

function json(body, status = 200, cache = false) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': cache
        ? 'public, max-age=15, s-maxage=25, must-revalidate'
        : 'no-store',
    },
  })
}

function safeUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export function normalizeTrack(track) {
  if (!track?.name) return null
  const artist =
    typeof track.artist === 'string'
      ? track.artist
      : track.artist?.['#text'] || track.artist?.name || ''
  const images = Array.isArray(track.image) ? track.image : []
  const image =
    images.find((item) => item.size === 'large' && item['#text']) ||
    images
      .slice()
      .reverse()
      .find((item) => item['#text'])
  const timestamp = Number(track.date?.uts)
  const isPlaying =
    track['@attr']?.nowplaying === 'true' || track['@attr']?.nowplaying === true
  return {
    title: track.name,
    artist,
    album:
      typeof track.album === 'string'
        ? track.album
        : track.album?.['#text'] || '',
    imageUrl: safeUrl(image?.['#text']),
    url: safeUrl(track.url),
    spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(
      `${track.name} ${artist}`.trim()
    )}`,
    isPlaying,
    playedAt:
      !isPlaying && Number.isFinite(timestamp) && timestamp > 0
        ? new Date(timestamp * 1000).toISOString()
        : null,
  }
}

// Shared by the local Vite preview and the deployed Netlify function.
// No Spotify session or Last.fm write permission is needed for this read.
export function createListeningHandler({
  getConfig,
  fetcher = fetch,
  now = Date.now,
}) {
  let cached = null
  let pending = null

  return async function listening(method = 'GET') {
    if (method !== 'GET') {
      const response = json({ error: 'Method not allowed.' }, 405)
      response.headers.set('Allow', 'GET')
      return response
    }

    const { username, apiKey } = getConfig()
    if (!username?.trim() || !apiKey?.trim()) {
      return json({ configured: false, track: null })
    }
    const identity = `${username.trim()}:${apiKey.trim()}`
    if (cached?.identity === identity && cached.until > now()) {
      return json(cached.body, 200, true)
    }

    if (!pending || pending.identity !== identity) {
      const promise = (async () => {
        const params = new URLSearchParams({
          method: 'user.getrecenttracks',
          user: username.trim(),
          api_key: apiKey.trim(),
          format: 'json',
          limit: '1',
        })
        const response = await fetcher(
          `https://ws.audioscrobbler.com/2.0/?${params}`,
          {
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
            headers: { Accept: 'application/json' },
          }
        )
        if (!response.ok) throw new Error('Last.fm unavailable')
        const data = await response.json()
        if (data.error || !data.recenttracks)
          throw new Error('Last.fm unavailable')
        const items = data.recenttracks.track
        const body = {
          configured: true,
          profileUrl: `https://www.last.fm/user/${encodeURIComponent(
            username.trim()
          )}`,
          track: normalizeTrack(Array.isArray(items) ? items[0] : items),
        }
        cached = { identity, until: now() + CACHE_MS, body }
        return body
      })()
      pending = { identity, promise }
    }

    const request = pending
    try {
      return json(await request.promise, 200, true)
    } catch {
      // Never label cached listening activity as live after an upstream failure.
      return json(
        {
          configured: true,
          track: null,
          error: 'Listening status unavailable.',
        },
        502
      )
    } finally {
      if (pending === request) pending = null
    }
  }
}
