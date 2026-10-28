import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createListeningHandler } from './server/listening.mjs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const listening = createListeningHandler({
    getConfig: () => ({
      username: env.LASTFM_USERNAME,
      apiKey: env.LASTFM_API_KEY,
      spotifyClientId: env.SPOTIFY_CLIENT_ID,
      spotifyClientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
  })
  return {
    plugins: [
      react(),
      {
        name: 'lastfm-listening-preview',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use(async (request, response, next) => {
            if (request.url?.split('?')[0] !== '/api/now-playing') return next()
            const result = await listening(request.method)
            response.statusCode = result.status
            result.headers.forEach((value, key) =>
              response.setHeader(key, value)
            )
            response.end(await result.text())
          })
        },
      },
    ],
    server: {
      proxy: {
        '/api/runs': {
          target: 'https://ck9gox2le1.execute-api.us-west-1.amazonaws.com',
          changeOrigin: true,
        },
      },
    },
  }
})
