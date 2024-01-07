import { Router } from 'itty-router'
import handleInteraction from './routes/interaction'
import Toucan from 'toucan-js'
import { WorkerEnvironment } from './types/environment'
import { Context } from 'toucan-js/dist/types'
import requestToFetcherObject from './utils/requestToFetcherObject'
export { GuildObject } from './durable-object/GuildObject'
export { MatchFetcherObject } from './durable-object/MatchFetcherObject'

const router = Router()

// Deprecated routes
router.post('/dota/interaction', handleInteraction)

// New routes
router.post('/api/interaction', handleInteraction)
router.all('*', () => new Response('Not found.', { status: 404 }))

export default {
  async fetch(request: Request, env: WorkerEnvironment, context: Context) {
    const sentry = new Toucan({
      dsn: env.SENTRY_DSN,
      context,
      request,
    })

    try {
      return await router.handle(request, env, context)
    } catch (err) {
      sentry.captureException(err)
      return new Response('Something went wrong', {
        status: 500,
        statusText: 'Internal Server Error',
      })
    }
  },

  async scheduled(event: ScheduledEvent, env: WorkerEnvironment, ctx: Context) {
    ctx.waitUntil(requestToFetcherObject({method: 'kick'}, env.MATCH_FETCHER_DURABLE_OBJECTS));
  },
}
