import { createListeningHandler } from '../../server/listening.mjs'

const listening = createListeningHandler({
  getConfig: () => ({
    username: process.env.LASTFM_USERNAME,
    apiKey: process.env.LASTFM_API_KEY,
  }),
})

export default (request) => listening(request.method)
