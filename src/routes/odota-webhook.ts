import { WorkerEnvironment } from '../types/environment'
import { Match } from '../types/odota'
import requestToGuildObject from '../utils/requestToGuildObject'

export default async function routeHandler(
  request: Request,
  env: WorkerEnvironment,
) {
  const requestURL = new URL(request.url)
  const requestSecret = requestURL.searchParams.get('secret')
  if (requestSecret !== env.OBSERVER_WARD_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  const requestGuildId = requestURL.searchParams.get('guildId')
  if (requestGuildId == null) {
    return new Response('Missing guildId', { status: 400 })
  }

  let data = null
  try {
    data = (await request.json()) as Match
    if (!data) throw new Error('No match data')
  } catch (e) {
    return new Response('Invalid request', { status: 400 })
  }

  return await requestToGuildObject(
    requestGuildId,
    { method: 'post_webhook', matchData: data },
    env.GUILD_DURABLE_OBJECTS,
  )
}
