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
