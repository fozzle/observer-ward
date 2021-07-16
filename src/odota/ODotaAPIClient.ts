import { ODotaWebhook, ODotaWebhookPartial } from '../types/odota'
import fetchClient from './fetchClient'

const WEBHOOK_API_BASE = 'https://api.opendota.com/webhooks'
const OBSERVER_WARD_WEBHOOK_BASE = 'https://kylepetrovi.ch/dota/odota'

const headers = {
  cookie: `session=${ODOTA_SESSION}; session.sig=${ODOTA_SESSION_SIG}`,
  'content-type': 'application/json',
}

interface WebhookParams {
  url: string
  players: string[]
}

export async function createWebhook({ url, players }: WebhookParams) {
  console.log('creating webhook', url, players)
  return await fetchClient(WEBHOOK_API_BASE, {
    method: 'post',
    headers,
    body: JSON.stringify({
      url,
      subscriptions: {
        players,
      },
    }),
  })
}

export async function getWebhooks() {
  return (await fetchClient(WEBHOOK_API_BASE, {
    method: 'get',
    headers,
  })) as ODotaWebhookPartial[]
}

export async function getWebhook(webhookId: string) {
  return await fetchClient(`${WEBHOOK_API_BASE}/${webhookId}`, {
    headers,
  }) as ODotaWebhook
}

export async function updateWebhook(
  webhookId: string,
  { url, players }: WebhookParams,
) {
  // holy fck we have to get the subscriptions first
  return fetchClient(`${WEBHOOK_API_BASE}/${webhookId}`, {
    method: 'put',
    headers,
    body: JSON.stringify({
      url,
      subscriptions: {
        players,
      },
    }),
  })
}

export async function deleteWebhook(webhookId: string) {
  return fetchClient(`${WEBHOOK_API_BASE}/${webhookId}`, {
    method: 'delete',
    headers,
  })
}
