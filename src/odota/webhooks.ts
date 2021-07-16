import { GuildConfig } from '../types/shared'
import * as ODotaAPIClient from './ODotaAPIClient'

const WEBHOOK_API_BASE = 'https://api.opendota.com/webhooks'
const OBSERVER_WARD_WEBHOOK_BASE = 'https://kylepetrovi.ch/dota/odota'
const GUILD_WEBHOOK_URL = (guildId: string) => `${OBSERVER_WARD_WEBHOOK_BASE}?guildId=${guildId}&secret=${OBSERVER_WARD_WEBHOOK_SECRET}`
async function createWebhookForGuild(guildId: string, accountId: string) {
  const webhookURL = GUILD_WEBHOOK_URL(guildId)
  await ODotaAPIClient.createWebhook({ url: webhookURL, players: [accountId] })

  // When Odota updates their webhook implementation, we can get the webhook ID without this workaround
  // where we filter through all webhooks lol.
  const allWebhooks = await ODotaAPIClient.getWebhooks()
  const targetWebhook = allWebhooks.find(async ({ hook_id: hookId }) => {
    const candidate = await ODotaAPIClient.getWebhook(hookId)
    return candidate.url === webhookURL
  })
  console.log('found target webhook', targetWebhook?.hook_id)
  return targetWebhook?.hook_id
}

async function addUserToGuildWebhook(
  guildConfig: GuildConfig,
  accountId: string,
) {
  const webhookURL = GUILD_WEBHOOK_URL(guildConfig.id)
  await ODotaAPIClient.updateWebhook(guildConfig.webhookId, {url: webhookURL, players: Object.keys(guildConfig.users).concat(accountId) })
}

async function removeUserFromGuildWebhook(
  guildConfig: GuildConfig,
  accountId: string,
) {
  const webhookURL = GUILD_WEBHOOK_URL(guildConfig.id)
  await ODotaAPIClient.updateWebhook(guildConfig.webhookId, {url: webhookURL, players: Object.keys(guildConfig.users).filter(id => id === accountId) })
}

// These operations needs to be replaced with durable objects.
export async function susbcribeGuildToUser(
  guildId: string,
  accountId: string,
  alias?: string,
) {
  const guildConfig = (await GUILDS.get(guildId, 'json')) as GuildConfig | null
  if (!guildConfig?.webhookId) {
    const webhookId = await createWebhookForGuild(guildId, accountId)
    await GUILDS.put(
      guildId,
      JSON.stringify({
        webhookId,
        users: {
          [accountId]: { alias },
        },
      }),
    )
    return
  } else {
    await addUserToGuildWebhook(guildConfig, accountId)
    guildConfig.users[accountId] = { alias }
  }
  await GUILDS.put(guildId, JSON.stringify(guildConfig))
}

export async function unsubscribeGuildToUser(guildId: string, accountId: string) {
  const guildConfig = (await GUILDS.get(guildId, 'json')) as GuildConfig | null
  if (guildConfig == null) return
  await removeUserFromGuildWebhook(guildConfig, accountId)
  delete guildConfig.users[accountId]
  await GUILDS.put(guildId, JSON.stringify(guildConfig))
}
