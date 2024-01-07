import { SlashCommands } from '../routes/interaction'
import { PlayerConfig } from '../types/shared'
import makeInteractionTextResponse from '../utils/makeInteractionTextResponse'
import requestToFetcherObject from '../utils/requestToFetcherObject'
import postMatch from './postMatch'
import { WorkerEnvironment } from '../types/environment'
import Toucan from 'toucan-js'
import { DotaMatch } from '../types/steam'

const MAX_SUBSCRIBED_USERS = 20

enum StorageKeys {
  USERS = 'users',
  CHANNEL_ID = 'channelId',
}

declare class MapConfig {
  get(key: StorageKeys.USERS): Record<string, PlayerConfig> | undefined
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
      matchData: DotaMatch
    }

export class GuildObject implements DurableObject {
  state: DurableObjectState
  users: Record<string, PlayerConfig> = {}
  channelId?: string
  guildId: string = ''
  initializePromise?: Promise<void>
  env: WorkerEnvironment

  constructor(state: DurableObjectState, env: WorkerEnvironment) {
    this.state = state
    this.env = env
    this.state.blockConcurrencyWhile(async () => {
      const values = (await this.state.storage.get([
        StorageKeys.USERS,
        StorageKeys.CHANNEL_ID,
      ])) as MapConfig
      this.users = values.get(StorageKeys.USERS) ?? {}
      this.channelId = values.get(StorageKeys.CHANNEL_ID)
    })
  }

  async initialize(guildId: string) {
    this.guildId = guildId
  }

  async fetch(request: Request) {
    const sentry = new Toucan({
      dsn: this.env.SENTRY_DSN,
      request,
    })

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
        sentry.addBreadcrumb({
          message: 'SUBSCRIBE_USER Durable Object Request',
          category: 'log',
        })
        return this.subscribe(requestBody.userId, requestBody.nickname)
      case SlashCommands.UNSUBSCRIBE_USER:
        sentry.addBreadcrumb({
          message: 'UNSUBSCRIBE_USER Durable Object Request',
          category: 'log',
        })
        return this.unsubscribe(sentry, requestBody.userId)
      case SlashCommands.LIST_USERS:
        sentry.addBreadcrumb({
          message: 'LIST_USERS Durable Object Request',
          category: 'log',
        })
        return this.getUsers()
      case SlashCommands.CONFIGURE_GUILD:
        sentry.addBreadcrumb({
          message: 'CONFIGURE_GUILD Durable Object Request',
          category: 'log',
        })
        return this.configure(requestBody.channelId)
      case SlashCommands.RESET_GUILD:
        sentry.addBreadcrumb({
          message: 'RESET_GUILD Durable Object Request',
          category: 'log',
        })
        return this.reset()
      case 'post_webhook':
        sentry.addBreadcrumb({
          message: 'POST_WEBHOOK Durable Object Request',
          category: 'log',
        })
        return this.postMatchToGuild(requestBody.matchData)
    }
  }

  // HANDLERS
  async unsubscribe(sentry: Toucan, userId: string) {
    try {
      requestToFetcherObject(
        { method: 'unsubscribe_user', guildId: this.guildId, userId },
        this.env.MATCH_FETCHER_DURABLE_OBJECTS,
      )

      delete this.users[userId]
    } catch (e) {
      // Consider letting this error bubble up instead of handling here
      sentry.captureException(e)
      return makeInteractionTextResponse('Failed to unsubscribe', true)
    }

    this.state.storage.put(StorageKeys.USERS, this.users)
    return makeInteractionTextResponse(`Unsubscribed ${userId}`)
  }

  async subscribe(userId: string, nickname: string) {
    if (Object.keys(this.users).length >= MAX_SUBSCRIBED_USERS) {
      return makeInteractionTextResponse(
        `Failed to subscribe to ${userId}, at max limit.`,
      )
    }

    this.users[userId] = { alias: nickname }
    requestToFetcherObject(
      { method: 'subscribe_user', guildId: this.guildId, userId },
      this.env.MATCH_FETCHER_DURABLE_OBJECTS,
    )
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
    for (const userId of Object.keys(this.users)) {
      await requestToFetcherObject(
        { method: 'unsubscribe_user', guildId: this.guildId, userId },
        this.env.MATCH_FETCHER_DURABLE_OBJECTS,
      )
    }
    this.channelId = ''
    this.users = {}
    await this.state.storage.put(StorageKeys.CHANNEL_ID, this.channelId)
    await this.state.storage.put(StorageKeys.USERS, this.users)
    return makeInteractionTextResponse(`Reset complete.`)
  }

  async getUsers() {
    const playerList = Object.entries(this.users)
    return makeInteractionTextResponse(`${playerList.length} found.
    \`\`\`\n${playerList
      .map(([accountId, { alias }]) => {
        return `${accountId}: ${alias}`
      })
      .join('\n')}\`\`\``)
  }

  async postMatchToGuild(match: DotaMatch) {
    if (!this.channelId) {
      console.warn(`no channelID configured for guild ${this.guildId}`)
      return new Response('ok', { status: 200 })
    }

    // Allow failure, will be caught at upper level
    await postMatch(
      match,
      this.users,
      this.channelId,
      this.env.DISCORD_BOT_TOKEN,
    )

    return new Response('ok', { status: 200 })
  }
}
