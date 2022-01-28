import { string } from 'zod'
import { ODotaWebhook, ODotaWebhookPartial } from '../types/odota'
import fetchClient from '../utils/fetchClient'

const WEBHOOK_API_BASE = 'https://api.opendota.com/webhooks'

interface WebhookParams {
  url: string
  players: string[]
}

export default class ODotaAPIClient {
  ODOTA_SESSION: string
  ODOTA_SESSION_SIG: string
  constructor(session: string, signature: string) {
    this.ODOTA_SESSION = session
    this.ODOTA_SESSION_SIG = signature
  }

  get headers() {
    return {
      cookie: `session=${this.ODOTA_SESSION}; session.sig=${this.ODOTA_SESSION_SIG}`,
      'content-type': 'application/json',
    }
  }

  async createWebhook({ url, players }: WebhookParams) {
    return (await fetchClient(WEBHOOK_API_BASE, {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify({
        url,
        subscriptions: {
          players,
        },
      }),
    })) as ODotaWebhookPartial
  }

  async getWebhooks() {
    return (await fetchClient(WEBHOOK_API_BASE, {
      method: 'get',
      headers: this.headers,
    })) as ODotaWebhookPartial[]
  }

  async getWebhook(webhookId: string) {
    return (await fetchClient(`${WEBHOOK_API_BASE}/${webhookId}`, {
      headers: this.headers,
    })) as ODotaWebhook
  }

  async updateWebhook(webhookId: string, { url, players }: WebhookParams) {
    // holy fck we have to get the subscriptions first
    return fetchClient(`${WEBHOOK_API_BASE}/${webhookId}`, {
      method: 'put',
      headers: this.headers,
      body: JSON.stringify({
        url,
        subscriptions: {
          players,
        },
      }),
    })
  }

  async deleteWebhook(webhookId: string) {
    return fetchClient(`${WEBHOOK_API_BASE}/${webhookId}`, {
      method: 'delete',
      headers: this.headers,
    })
  }
}
