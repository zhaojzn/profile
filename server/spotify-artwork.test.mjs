import test from 'node:test'
import assert from 'node:assert/strict'
import { createSpotifyArtworkResolver } from './spotify-artwork.mjs'

const config = {
  spotifyClientId: 'test-client-id',
  spotifyClientSecret: 'test-client-secret',
}
const song = {
  title: 'A song & another',
  artist: 'An artist',
  album: 'An album',
}
const imageUrl = 'https://i.scdn.co/image/example-cover'
const item = {
  id: '0123456789abcdefghijkl',
  name: song.title,
  artists: [{ name: song.artist }],
  album: {
    name: song.album,
    images: [{ width: 300, height: 300, url: imageUrl }],
  },
}
const tokenResponse = () =>
  Response.json({ access_token: 'test-token', expires_in: 3600 })

test('missing Spotify configuration never makes a request', async () => {
  const resolve = createSpotifyArtworkResolver({
    fetcher: () => {
      throw new Error('Must not fetch')
    },
  })
  assert.equal(await resolve(song, {}), null)
  assert.equal(await resolve(null, config), null)
})

test('uses app-only authentication, encoded search, and the matching album', async () => {
  const resolve = createSpotifyArtworkResolver({
    fetcher: async (url, options) => {
      if (url.includes('/api/token')) {
        assert.equal(options.method, 'POST')
        assert.equal(options.body, 'grant_type=client_credentials')
        assert.equal(
          options.headers.Authorization,
          `Basic ${Buffer.from('test-client-id:test-client-secret').toString(
            'base64'
          )}`
        )
        return tokenResponse()
      }
      const params = new URL(url).searchParams
      assert.equal(
        params.get('q'),
        'track:"A song & another" artist:"An artist"'
      )
      assert.equal(params.get('type'), 'track')
      assert.equal(params.get('market'), 'CA')
      assert.equal(options.headers.Authorization, 'Bearer test-token')
      return Response.json({
        tracks: {
          items: [
            {
              ...item,
              album: {
                name: 'A different release',
                images: [{ url: 'https://i.scdn.co/image/wrong-release' }],
              },
            },
            item,
          ],
        },
      })
    },
  })
  const result = await resolve(song, config)
  assert.deepEqual(result, {
    imageUrl,
    spotifyUrl: `https://open.spotify.com/track/${item.id}`,
  })
  assert.equal(
    JSON.stringify(result).includes(config.spotifyClientSecret),
    false
  )
  assert.equal(JSON.stringify(result).includes('test-token'), false)
})

test('artwork is cached across status polls and tokens are reused for different songs', async () => {
  let clock = 0
  let authCalls = 0
  let searches = 0
  const resolve = createSpotifyArtworkResolver({
    now: () => clock,
    fetcher: async (url) => {
      if (url.includes('/api/token')) {
        authCalls++
        return tokenResponse()
      }
      searches++
      const title = new URL(url).searchParams.get('q').includes('Another song')
        ? 'Another song'
        : song.title
      return Response.json({ tracks: { items: [{ ...item, name: title }] } })
    },
  })
  await resolve(song, config)
  clock = 30_000
  await resolve(song, config)
  assert.equal(searches, 1)
  await resolve({ ...song, title: 'Another song' }, config)
  assert.equal(authCalls, 1)
  assert.equal(searches, 2)
  clock = 7 * 60 * 60 * 1000
  await resolve(song, config)
  assert.equal(authCalls, 2)
  assert.equal(searches, 3)
})

test('unrelated songs, unsafe covers, and invalid track IDs are not used', async () => {
  for (const candidate of [
    { ...item, name: 'Another song' },
    { ...item, artists: [{ name: 'A different artist' }] },
    {
      ...item,
      album: { ...item.album, images: [{ url: 'javascript:alert(1)' }] },
    },
    {
      ...item,
      album: {
        ...item.album,
        images: [{ url: 'https://untrusted.example/image.jpg' }],
      },
    },
    { ...item, id: '../not-a-track' },
  ]) {
    const resolve = createSpotifyArtworkResolver({
      fetcher: async (url) =>
        url.includes('/api/token')
          ? tokenResponse()
          : Response.json({ tracks: { items: [candidate] } }),
    })
    assert.equal(await resolve(song, config), null)
  }
})

test('a missing catalog match is cached briefly, then retried', async () => {
  let clock = 0
  let searches = 0
  const resolve = createSpotifyArtworkResolver({
    now: () => clock,
    fetcher: async (url) => {
      if (url.includes('/api/token')) return tokenResponse()
      searches++
      return Response.json({ tracks: { items: [] } })
    },
  })
  assert.equal(await resolve(song, config), null)
  clock = 60_000
  assert.equal(await resolve(song, config), null)
  assert.equal(searches, 1)
  clock = 301_000
  await resolve(song, config)
  assert.equal(searches, 2)
})

test('rate limits honor Retry-After without repeatedly calling Spotify', async () => {
  let clock = 0
  let searches = 0
  const resolve = createSpotifyArtworkResolver({
    now: () => clock,
    fetcher: async (url) => {
      if (url.includes('/api/token')) return tokenResponse()
      searches++
      return new Response('', {
        status: 429,
        headers: { 'Retry-After': '120' },
      })
    },
  })
  assert.equal(await resolve(song, config), null)
  clock = 61_000
  await resolve({ ...song, title: 'Another song' }, config)
  assert.equal(searches, 1)
  clock = 121_000
  await resolve(song, config)
  assert.equal(searches, 2)
})

test('network failures and invalid credentials degrade to no artwork', async () => {
  for (const fetcher of [
    async () => {
      throw new Error('Timed out')
    },
    async () => new Response('', { status: 401 }),
    async () => Response.json({ error: 'invalid_client' }),
  ]) {
    const resolve = createSpotifyArtworkResolver({ fetcher })
    assert.equal(await resolve(song, config), null)
  }
})
