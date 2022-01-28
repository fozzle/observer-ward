import { Router } from 'itty-router'
import handleODotaWebhook from './routes/odota-webhook'
import handleInteraction from './routes/interaction'
import Toucan from 'toucan-js'
import { WorkerEnvironment } from './types/environment'
import { Context } from 'toucan-js/dist/types'
export { GuildObject } from './durable-object/GuildObject'

const router = Router()

// Deprecated routes
router.post('/dota/odota', handleODotaWebhook)
router.post('/dota/interaction', handleInteraction)

// New routes
router.post('/api/odota', handleODotaWebhook)
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
}
