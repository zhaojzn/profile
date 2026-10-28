# profile
personal profile.

## Listening status

The homepage reads `/api/now-playing`, backed by Last.fm. It shows the current
track, or the most recent scrobble when nothing is playing, and checks every
30 seconds while the page is visible. Spotify links search for that song.

1. Connect Spotify Scrobbling and Spotify Playback in your
   [Last.fm application settings](https://www.last.fm/settings/applications).
2. Get a [Last.fm API key](https://www.last.fm/api/account/create).
3. Copy `.env.example` to `.env.local`, fill in `LASTFM_USERNAME` and
   `LASTFM_API_KEY`, and run `npm run dev`. Local environment files are ignored
   by Git. The key is only used by the server; do not add a `VITE_` prefix.
4. On Netlify, add the same environment variables for the production context,
   using the default scopes (or **Functions** if your plan supports scope
   selection). Mark the API key as secret, then redeploy. The included function
   and redirect handle the endpoint.

Until configured, or if Last.fm is unavailable, the listening line stays hidden.
An outage never presents a cached track as currently playing. The endpoint caches
successful responses for 25 seconds to limit upstream requests.

### Spotify album artwork (optional)

Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` from a
[Spotify Developer app](https://developer.spotify.com/dashboard) to `.env.local`
and to the production Netlify environment. Mark the client secret as secret.
Do not use `VITE_` prefixes or commit credentials. Restart Vite after editing
local configuration; redeploy after changing production configuration.

The server uses Spotify's
[client credentials flow](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow)
to match the Last.fm song by title and artist, preferring the matching album.
This is a public catalog lookup; it doesn't request access to your Spotify
account or change how listening status is determined. Spotify development-mode
apps currently require the app owner to have Premium.

With a match, the cover and song link point to Spotify. Artwork is cached for
six hours, access tokens are reused until shortly before expiry, and rate-limit
responses honor `Retry-After`. Missing credentials, unmatched songs, or Spotify
errors leave Last.fm's song and artwork intact. Missing/broken covers show the
local music-note icon instead of a broken image.
