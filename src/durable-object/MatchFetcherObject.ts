import { DotaMatch } from '../types/steam'
import { WorkerEnvironment } from '../types/environment'
import { MATCH_SEQUENCE_API_URL } from './constants'
import Toucan from 'toucan-js'
import requestToGuildObject from '../utils/requestToGuildObject'
import fetchClient from '../utils/fetchClient'

enum StorageKeys {
  USER_SUBSCRIPTIONS = 'user_subscriptions',
  LAST_FETCHED_SEQUENCE_NUM = 'last_fetched_sequence_num',
}

declare class MapConfig {
  get(key: StorageKeys.USER_SUBSCRIPTIONS): Record<string, string[]> | undefined
  get(key: StorageKeys.LAST_FETCHED_SEQUENCE_NUM): string | undefined
}

export type MatchFetcherObjectRequest =
  | {
      method: 'subscribe_user'
      userId: string
      guildId: string
    }
  | {
      method: 'unsubscribe_user'
      userId: string
      guildId: string
    }
  | { method: 'kick' }

class UnretryableSteamError extends Error {
    name = 'UnretryableSteamError'
}

export class MatchFetcherObject implements DurableObject {
  state: DurableObjectState
  userSubscriptions: Record<string, string[]> = {}
  lastFetchedSequenceNumber: number = 0
  initializePromise?: Promise<void>
  env: WorkerEnvironment

  constructor(state: DurableObjectState, env: WorkerEnvironment) {
    this.state = state
    this.env = env

    this.state.blockConcurrencyWhile(async () => {
      this.userSubscriptions =
        (await this.state.storage.get(StorageKeys.USER_SUBSCRIPTIONS)) || {}
      this.lastFetchedSequenceNumber = Math.max(
        (await this.state.storage.get(StorageKeys.LAST_FETCHED_SEQUENCE_NUM)) ??
          0,
        env.MIN_SEQUENCE_NUM,
      )
    })
  }

  async alarm() {
    const beginTimestamp = Date.now()
    // Reset just in case we adjusted the env var
    this.lastFetchedSequenceNumber = Math.max(
      this.lastFetchedSequenceNumber,
      this.env.MIN_SEQUENCE_NUM,
    )
    // Fetch matches since last sequence number
    let nextSequenceNumber = this.lastFetchedSequenceNumber
    let lastFinish = 0
    let lastFinishId = 0
    try {
      const matches = await this.fetchNewMatches()
      console.log(`Found ${matches.length} matches, fanning out.`)

      // Woof loop central.
      for (const match of matches) {
        const endInSeconds = match.duration * 1000 + match.start_time * 1000;
        if (endInSeconds > lastFinish) {
            lastFinish = endInSeconds
            lastFinishId = match.match_id
        }
        const collectedGuilds = []

        for (const player of match.players) {
          const subscribedGuildIds = this.userSubscriptions[player.account_id]
          if (subscribedGuildIds == null || subscribedGuildIds.length === 0) {
            continue
          }
          collectedGuilds.push(...subscribedGuildIds)
        }

        const deduplicatedGuilds = new Set(collectedGuilds)
        for (const guildId of deduplicatedGuilds) {
          this.sendToGuild(guildId, match)
        }

        // I assume these are sorted but tbh I'm not sure so I'll just keep record of highest.
        nextSequenceNumber = Math.max(nextSequenceNumber, match.match_seq_num)
      }

      console.log(
        `Completed fanout of ${matches.length} games in ${
          (Date.now() - beginTimestamp) / 1000
        }s. Most recent game ID ${lastFinishId} finished ${
          (Date.now() - lastFinish) / 1000
        }s ago.`,
      )
    } catch (e) {
      // Error logging
      console.error('Error occurred during match fetch', e)
      if (e instanceof UnretryableSteamError) {
        // Increment to skip this match.
        console.log('Incrementing sequence number')
        nextSequenceNumber = nextSequenceNumber + 1;
      }
    } finally {
      this.lastFetchedSequenceNumber = nextSequenceNumber
      // Store results
      this.state.storage.put(
        StorageKeys.LAST_FETCHED_SEQUENCE_NUM,
        this.lastFetchedSequenceNumber,
      )
      // Schedule next fetch
      this.state.storage.setAlarm(Date.now() + Number(this.env.POLL_WAIT_MS))
    }
  }


  async fetchNewMatches(): Promise<DotaMatch[]> {
    console.log(`Fetching matches since ${this.lastFetchedSequenceNumber}`)
    const requestURL = new URL(MATCH_SEQUENCE_API_URL)
    const requestSearch = new URLSearchParams({
      format: 'json',
      matches_requested: '100',
      start_at_match_seq_num: String(this.lastFetchedSequenceNumber),
      key: this.env.STEAM_WEB_API_KEY,
    })
    requestURL.search = requestSearch.toString()

    const response = (await fetchClient(requestURL.toString())) as {
      result: { status: number; matches: DotaMatch[] }
    }
    switch (response.result.status) {
        case 1:
            break;
        case 2:
            throw new UnretryableSteamError('Found result status 2') 
        default:
            throw new Error(`Error status from Steam API: ${response.result.status}`);
    }

    return response.result.matches
  }

  async sendToGuild(guildId: string, matchData: DotaMatch) {
    requestToGuildObject(
      guildId,
      { method: 'post_webhook', matchData },
      this.env.GUILD_DURABLE_OBJECTS,
    )
  }

  async fetch(request: Request) {
    const sentry = new Toucan({
      dsn: this.env.SENTRY_DSN,
      request,
    })

    const requestBody = (await request.json()) as MatchFetcherObjectRequest

    switch (requestBody.method) {
      case 'subscribe_user':
        sentry.addBreadcrumb({
          message: 'SUBSCRIBE_USER Durable Object Request',
          category: 'log',
        })
        return this.subscribeUser(requestBody.userId, requestBody.guildId)
      case 'unsubscribe_user':
        sentry.addBreadcrumb({
          message: 'UNSUBSCRIBE_USER Durable Object Request',
          category: 'log',
        })
        return this.unsubscribeUser(requestBody.userId, requestBody.guildId)
      case 'kick':
        console.log('Kicked')
        if ((await this.state.storage.getAlarm()) == null) {
          this.state.storage.setAlarm(Date.now() + 10)
        }
        return new Response('Kicked')
      default:
        return new Response('Unknown method')
    }
  }

  // HANDLERS
  async unsubscribeUser(userId: string, guildId: string) {
    this.userSubscriptions[userId] = (
      this.userSubscriptions[userId] ?? []
    ).filter((_guildId) => guildId != _guildId)
    if (this.userSubscriptions[userId].length === 0) {
      delete this.userSubscriptions[userId]
    }
    this.state.storage.put(
      StorageKeys.USER_SUBSCRIPTIONS,
      this.userSubscriptions,
    )

    return new Response('User unsubscribed', { status: 200 })
  }

  async subscribeUser(userId: string, guildId: string) {
    this.userSubscriptions[userId] = [
      ...(this.userSubscriptions[userId] ?? []),
      guildId,
    ]
    this.state.storage.put(
      StorageKeys.USER_SUBSCRIPTIONS,
      this.userSubscriptions,
    )

    return new Response('User subscribed', { status: 200 })
  }
}
