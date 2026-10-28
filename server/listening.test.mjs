import test from 'node:test'
import assert from 'node:assert/strict'
import { createListeningHandler, normalizeTrack } from './listening.mjs'

const config = () => ({
  username: 'a user',
  apiKey: 'test-key-not-a-credential',
})
const track = {
  name: 'A song & another',
  artist: { '#text': 'An artist' },
  album: { '#text': 'An album' },
  url: 'https://www.last.fm/music/An+artist/_/A+song',
  image: [
    { size: 'large', '#text': 'https://lastfm.freetls.fastly.net/example.jpg' },
  ],
  '@attr': { nowplaying: 'true' },
}
const upstream = (item) => Response.json({ recenttracks: { track: item } })

test('missing configuration does not call Last.fm or claim a listening state', async () => {
  const handler = createListeningHandler({
    getConfig: () => ({ username: 'a user' }),
    fetcher: () => {
      throw new Error('Must not fetch')
    },
  })
  assert.deepEqual(await (await handler()).json(), {
    configured: false,
    track: null,
  })
})

test('encodes the account, normalizes live metadata, and never returns the key', async () => {
  const handler = createListeningHandler({
    getConfig: config,
    fetcher: async (url) => {
      const params = new URL(url).searchParams
      assert.equal(params.get('user'), 'a user')
      assert.equal(params.get('method'), 'user.getrecenttracks')
      assert.equal(params.get('limit'), '1')
      return upstream([track])
    },
  })
  const response = await handler()
  const payload = await response.json()
  assert.equal(response.status, 200)
  assert.equal(payload.track.isPlaying, true)
  assert.equal(payload.track.playedAt, null)
  assert.equal(payload.track.artist, 'An artist')
  assert.equal(payload.profileUrl, 'https://www.last.fm/user/a%20user')
  assert.equal(
    payload.track.spotifyUrl,
    'https://open.spotify.com/search/A%20song%20%26%20another%20An%20artist'
  )
  assert.equal(JSON.stringify(payload).includes(config().apiKey), false)
})

test('offline tracks retain the real scrobble time, and unsafe URLs are discarded', () => {
  const normalized = normalizeTrack({
    ...track,
    '@attr': {},
    date: { uts: '1700000000' },
    url: 'javascript:alert(1)',
    image: [{ size: 'large', '#text': 'data:image/svg+xml,unsafe' }],
  })
  assert.equal(normalized.isPlaying, false)
  assert.equal(normalized.playedAt, '2023-11-14T22:13:20.000Z')
  assert.equal(normalized.url, null)
  assert.equal(normalized.imageUrl, null)
})

test('empty history and a single-object response are handled', async () => {
  const empty = createListeningHandler({
    getConfig: config,
    fetcher: async () => upstream([]),
  })
  assert.equal((await (await empty()).json()).track, null)
  const single = createListeningHandler({
    getConfig: config,
    fetcher: async () => upstream(track),
  })
  assert.equal((await (await single()).json()).track.title, track.name)
})

test('simultaneous visitors share a request, and a fresh request follows cache expiry', async () => {
  let calls = 0,
    clock = 0
  const handler = createListeningHandler({
    getConfig: config,
    now: () => clock,
    fetcher: async () => {
      calls++
      return upstream([track])
    },
  })
  await Promise.all([handler(), handler(), handler()])
  assert.equal(calls, 1)
  clock = 24_000
  await handler()
  assert.equal(calls, 1)
  clock = 26_000
  await handler()
  assert.equal(calls, 2)
})

test('a failed refresh does not return an old track as live', async () => {
  let clock = 0
  const handler = createListeningHandler({
    getConfig: config,
    now: () => clock,
    fetcher: async () => {
      if (clock) throw new Error('Network offline')
      return upstream([track])
    },
  })
  assert.equal((await (await handler()).json()).track.isPlaying, true)
  clock = 26_000
  const response = await handler()
  assert.equal(response.status, 502)
  assert.equal(response.headers.get('Cache-Control'), 'no-store')
  assert.equal((await response.json()).track, null)
})

test('Last.fm JSON errors and unexpected methods fail safely', async () => {
  const handler = createListeningHandler({
    getConfig: config,
    fetcher: async () => Response.json({ error: 10, message: 'Invalid key' }),
  })
  assert.equal((await handler()).status, 502)
  const denied = await handler('POST')
  assert.equal(denied.status, 405)
  assert.equal(denied.headers.get('Allow'), 'GET')
})

test('Last.fm placeholder artwork uses the local fallback instead', () => {
  const normalized = normalizeTrack({
    ...track,
    image: [
      {
        size: 'large',
        '#text':
          'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
      },
    ],
  })
  assert.equal(normalized.imageUrl, null)
})

test('Spotify artwork enriches the song without changing Last.fm listening status', async () => {
  let clock = 0
  let searches = 0
  const spotifyConfig = {
    ...config(),
    spotifyClientId: 'test-id',
    spotifyClientSecret: 'test-secret',
  }
  const handler = createListeningHandler({
    getConfig: () => spotifyConfig,
    now: () => clock,
    fetcher: async (url) => {
      if (url.includes('audioscrobbler')) {
        return upstream([
          {
            ...track,
            '@attr': { nowplaying: clock ? 'false' : 'true' },
            date: { uts: '1700000000' },
          },
        ])
      }
      if (url.includes('/api/token'))
        return Response.json({ access_token: 'test-token', expires_in: 3600 })
      searches++
      return Response.json({
        tracks: {
          items: [
            {
              id: '0123456789abcdefghijkl',
              name: track.name,
              artists: [{ name: track.artist['#text'] }],
              album: {
                name: 'An album',
                images: [
                  { width: 300, url: 'https://i.scdn.co/image/example' },
                ],
              },
            },
          ],
        },
      })
    },
  })
  const body = await (await handler()).json()
  assert.equal(body.track.isPlaying, true)
  assert.equal(body.track.imageUrl, 'https://i.scdn.co/image/example')
  assert.equal(body.track.fallbackImageUrl, track.image[0]['#text'])
  assert.equal(body.track.artworkSource, 'spotify')
  assert.equal(
    body.track.spotifyUrl,
    'https://open.spotify.com/track/0123456789abcdefghijkl'
  )
  for (const secret of ['test-secret', 'test-token', config().apiKey])
    assert.equal(JSON.stringify(body).includes(secret), false)
  clock = 26_000
  const stopped = await (await handler()).json()
  assert.equal(stopped.track.isPlaying, false)
  assert.equal(stopped.track.playedAt, '2023-11-14T22:13:20.000Z')
  assert.equal(searches, 1)
})

test('Spotify failures never hide Last.fm song/status or existing artwork', async () => {
  const handler = createListeningHandler({
    getConfig: () => ({
      ...config(),
      spotifyClientId: 'test-id',
      spotifyClientSecret: 'test-secret',
    }),
    fetcher: async (url) => {
      if (url.includes('audioscrobbler')) return upstream([track])
      throw new Error('Spotify unavailable')
    },
  })
  const response = await handler()
  const body = await response.json()
  assert.equal(response.status, 200)
  assert.equal(body.track.title, track.name)
  assert.equal(body.track.isPlaying, true)
  assert.equal(body.track.imageUrl, track.image[0]['#text'])
})
