import { Router } from 'itty-router'
import handleODotaWebhook from './routes/odota-webhook'
import handleInteraction from './routes/interaction'

const router = Router()

router.post('/dota/odota', handleODotaWebhook)
router.post('/dota/interaction', handleInteraction)
router.all('*', () => new Response('Not found.', {status: 404}))

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request))
})
