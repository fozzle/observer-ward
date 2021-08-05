import { Router } from 'itty-router'
import handleODotaWebhook from './routes/odota-webhook'
import handleInteraction from './routes/interaction'
export { GuildObject } from './durable-object/GuildObject'

const router = Router()

router.post('/dota/odota', handleODotaWebhook)
router.post('/dota/interaction', handleInteraction)
router.all('*', () => new Response('Not found.', { status: 404 }))

export default {
  fetch: router.handle,
}
