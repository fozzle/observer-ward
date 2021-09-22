import { SlashCommands } from '../routes/interaction'
import { PlayerConfig } from '../types/shared'
import ODotaAPIClient from '../odota/ODotaAPIClient'
import makeInteractionTextResponse from '../utils/makeInteractionTextResponse'
import { Match } from '../types/odota'
import postMatch from './postMatch'
import { WorkerEnvironment } from '../types/environment'
import { GUILD_WEBHOOK_URL } from './constants'

enum StorageKeys {
  USERS = 'users',
  WEBHOOK_ID = 'webhookId',
  CHANNEL_ID = 'channelId',
}

declare class MapConfig {
  get(key: StorageKeys.USERS): Record<string, PlayerConfig> | undefined
  get(key: StorageKeys.WEBHOOK_ID): string | undefined
  get(key: StorageKeys.CHANNEL_ID): string | undefined
}

export type GuildObjectRequest =
  | {
      method: SlashCommands.SUBSCRIBE_USER
      userId: string
      nickname: string
    }
  | {
      method: SlashCommands.UNSUBSCRIBE_USER
      userId: string
    }
  | {
      method: SlashCommands.LIST_USERS
    }
  | {
      method: SlashCommands.CONFIGURE_GUILD
      channelId: string
    }
  | {
      method: SlashCommands.RESET_GUILD
    }
  | {
      method: 'post_webhook'
      matchData: Match
    }

export class GuildObject implements DurableObject {
  state: DurableObjectState
  users: Record<string, PlayerConfig> = {}
  webhookId?: string
  channelId?: string
  guildId: string = ""
  initializePromise?: Promise<void>
  env: WorkerEnvironment
  apiClient: ODotaAPIClient

  constructor(state: DurableObjectState, env: WorkerEnvironment) {
    this.state = state
    this.env = env
    this.apiClient = new ODotaAPIClient(
      env.ODOTA_SESSION,
      env.ODOTA_SESSION_SIG,
    )
  }

  async initialize(guildId: string) {
    const values = (await this.state.storage.get([
      StorageKeys.USERS,
      StorageKeys.WEBHOOK_ID,
      StorageKeys.CHANNEL_ID,
    ])) as MapConfig
    this.users = values.get(StorageKeys.USERS) ?? {}
    this.webhookId = values.get(StorageKeys.WEBHOOK_ID)
    this.channelId = values.get(StorageKeys.CHANNEL_ID)
    this.guildId = guildId
  }

  async fetch(request: Request) {
    const guildId = request.headers.get('guildId')
    if (guildId == null) {
      return new Response('Bad request, missing guildId header')
    }
    if (!this.initializePromise) {
      this.initializePromise = this.initialize(guildId)
    }
    await this.initializePromise

    const requestBody = (await request.json()) as GuildObjectRequest

    switch (requestBody.method) {
      case SlashCommands.SUBSCRIBE_USER:
        return this.subscribe(requestBody.userId, requestBody.nickname)
      case SlashCommands.UNSUBSCRIBE_USER:
        return this.unsubscribe(requestBody.userId)
      case SlashCommands.LIST_USERS:
        return this.getUsers()
      case SlashCommands.CONFIGURE_GUILD:
        return this.configure(requestBody.channelId)
      case SlashCommands.RESET_GUILD:
        return this.reset()
      case 'post_webhook':
        return this.postMatchToGuild(requestBody.matchData)
    }
  }

  // HANDLERS
  async unsubscribe(userId: string) {
    const webhookId = this.webhookId
    if (!webhookId) {
      return makeInteractionTextResponse('Missing webhookId?', true)
    }

    const webhookURL = GUILD_WEBHOOK_URL(
      this.guildId,
      this.env.OBSERVER_WARD_WEBHOOK_SECRET,
    )
    const newPlayers = Object.keys(this.users).filter((id) => id !== userId)
    try {
      if (newPlayers.length === 0) {
        await this.apiClient.deleteWebhook(webhookId)
        this.webhookId = ''
        this.state.storage.put(StorageKeys.WEBHOOK_ID, this.webhookId)
      } else {
        this.apiClient.updateWebhook(webhookId, {
          url: webhookURL,
          players: newPlayers,
        })
      }

      delete this.users[userId]
    } catch (e) {
      console.error('Failed to unsubscribe', e.message)
      return makeInteractionTextResponse('Failed to unsubscribe', true)
    }

    this.state.storage.put(StorageKeys.USERS, this.users)
    return makeInteractionTextResponse(`Unsubscribed ${userId}`)
  }

  async subscribe(userId: string, nickname: string) {
    if (Object.keys(this.users).length >= 20) {
      return makeInteractionTextResponse(`Failed to subscribe to ${userId}, at max limit.`)
    }

    this.users[userId] = { alias: nickname }
    if (!this.webhookId) {
      this.webhookId = await this.createWebhookForGuild(this.guildId!, userId)
      this.state.storage.put(StorageKeys.WEBHOOK_ID, this.webhookId)
    } else {
      this.addUserToGuildWebhook(
        this.users,
        this.webhookId,
        this.guildId!,
        userId,
      )
    }
    this.state.storage.put(StorageKeys.USERS, this.users)
    return makeInteractionTextResponse(`Subscribed to ${userId} as ${nickname}`)
  }

  async configure(channelId: string) {
    this.channelId = channelId
    this.state.storage.put(StorageKeys.CHANNEL_ID, this.channelId)
    return makeInteractionTextResponse(
      `Configured to post to channel ID: ${channelId}`,
    )
  }

  async reset() {
    this.channelId = ''
    if (this.webhookId) {
      this.apiClient.deleteWebhook(this.webhookId)
    }
    this.webhookId = ''
    this.users = {}
    this.state.storage.put(StorageKeys.CHANNEL_ID, this.channelId)
    this.state.storage.put(StorageKeys.USERS, this.users)
    this.state.storage.put(StorageKeys.WEBHOOK_ID, this.webhookId)
    return makeInteractionTextResponse(`Reset complete.`)
  }

  async getUsers() {
    const playerList = Object.entries(this.users)
    return makeInteractionTextResponse(`${playerList.length} found.
    \`\`\`${playerList.map(([accountId, { alias }]) => {
      return `${accountId}: ${alias}`
    }).join('\n')}\`\`\``)
  }

  async postMatchToGuild(match: Match) {
    if (!this.channelId) {
      console.log('no channelID configured')
      return new Response('ok', { status: 200 })
    }

    try {
      await postMatch(
        match,
        this.users,
        this.channelId,
        this.env.DISCORD_BOT_TOKEN,
      )
    } catch (e) {
      console.error('Error posting to guild', e, e.message)
      return new Response('failed', { status: 500 })
    }

    return new Response('ok', { status: 200 })
  }

  // Helpers
  async createWebhookForGuild(guildId: string, accountId: string) {
    const webhookURL = GUILD_WEBHOOK_URL(
      guildId,
      this.env.OBSERVER_WARD_WEBHOOK_SECRET,
    )
    await this.apiClient.createWebhook({
      url: webhookURL,
      players: [accountId],
    })

    // When Odota updates their webhook implementation, we can get the webhook ID without this workaround
    // where we filter through all webhooks lol.
    const allWebhooks = await this.apiClient.getWebhooks()
    const targetWebhook = allWebhooks.find(async ({ hook_id: hookId }) => {
      const candidate = await this.apiClient.getWebhook(hookId)
      return candidate.url === webhookURL
    })
    return targetWebhook?.hook_id
  }

  async addUserToGuildWebhook(
    users: Record<string, PlayerConfig>,
    webhookId: string,
    guildId: string,
    accountId: string,
  ) {
    const webhookURL = GUILD_WEBHOOK_URL(
      guildId,
      this.env.OBSERVER_WARD_WEBHOOK_SECRET,
    )
    await this.apiClient.updateWebhook(webhookId, {
      url: webhookURL,
      players: Object.keys(users).concat(accountId),
    })
  }
}
