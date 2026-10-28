import { Buffer } from 'node:buffer'

const LOOKUP_TIMEOUT_MS = 2_000
const ARTWORK_CACHE_MS = 6 * 60 * 60 * 1_000
const MISS_CACHE_MS = 5 * 60 * 1_000

function comparable(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '')
}

function spotifyImage(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'i.scdn.co'
      ? url.href
      : null
  } catch {
    return null
  }
}

// App-only catalog lookup: no Spotify account session or playback permissions.
export function createSpotifyArtworkResolver({
  fetcher = fetch,
  now = Date.now,
} = {}) {
  let identity = null
  let token = null
  let blockedUntil = 0
  const artwork = new Map()

  return async function resolveArtwork(track, config) {
    const clientId = config.spotifyClientId?.trim()
    const clientSecret = config.spotifyClientSecret?.trim()
    if (!clientId || !clientSecret || !track?.title || !track.artist)
      return null

    const credentials = `${clientId}:${clientSecret}`
    if (identity !== credentials) {
      identity = credentials
      token = null
      blockedUntil = 0
      artwork.clear()
    }
    const key = JSON.stringify([track.title, track.artist, track.album])
    const cached = artwork.get(key)
    if (cached?.until > now()) return cached.result
    if (blockedUntil > now()) return null

    // Share one deadline across authentication and search. Artwork must never
    // prevent Last.fm's song/status from being returned promptly.
    const signal = AbortSignal.timeout(LOOKUP_TIMEOUT_MS)
    const request = async (url, options) => {
      const response = await fetcher(url, { ...options, signal })
      if (!response.ok) {
        if (response.status === 401) token = null
        const retryAfter = Number(response.headers.get('Retry-After')) || 60
        blockedUntil = now() + Math.max(60, retryAfter) * 1_000
        throw new Error('Spotify artwork unavailable')
      }
      return response.json()
    }

    try {
      if (!token || token.until <= now()) {
        const data = await request('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(credentials).toString(
              'base64'
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }).toString(),
        })
        if (!data.access_token || !(Number(data.expires_in) > 0)) {
          throw new Error('Spotify artwork unavailable')
        }
        token = {
          value: data.access_token,
          until: now() + Math.max(0, Number(data.expires_in) * 1_000 - 60_000),
        }
      }

      const quote = (value) => String(value).replace(/["\\]/g, ' ')
      const params = new URLSearchParams({
        q: `track:"${quote(track.title)}" artist:"${quote(track.artist)}"`,
        type: 'track',
        market: 'CA',
        limit: '5',
      })
      const data = await request(
        `https://api.spotify.com/v1/search?${params}`,
        {
          headers: { Authorization: `Bearer ${token.value}` },
        }
      )
      const matches = (
        Array.isArray(data.tracks?.items) ? data.tracks.items : []
      ).filter(
        (item) =>
          comparable(item.name) === comparable(track.title) &&
          item.artists?.some(
            (artist) => comparable(artist.name) === comparable(track.artist)
          )
      )
      const match =
        matches.find(
          (item) =>
            track.album &&
            comparable(item.album?.name) === comparable(track.album)
        ) || matches[0]
      const images = Array.isArray(match?.album?.images)
        ? match.album.images
        : []
      const image =
        images.find((item) => item.width >= 160 && item.width <= 320) ||
        images[0]
      const imageUrl = spotifyImage(image?.url)
      const result =
        imageUrl && /^[a-zA-Z0-9]{22}$/.test(match?.id)
          ? {
              imageUrl,
              spotifyUrl: `https://open.spotify.com/track/${match.id}`,
            }
          : null
      artwork.set(key, {
        result,
        until: now() + (result ? ARTWORK_CACHE_MS : MISS_CACHE_MS),
      })
      if (artwork.size > 100) artwork.delete(artwork.keys().next().value)
      return result
    } catch {
      blockedUntil = Math.max(blockedUntil, now() + 60_000)
      return null
    }
  }
}
