export interface WorkerEnvironment {
  DISCORD_PUBLIC_KEY: string
  DISCORD_BOT_TOKEN: string
  GUILD_DURABLE_OBJECTS: DurableObjectNamespace
  MATCH_FETCHER_DURABLE_OBJECTS: DurableObjectNamespace
  STEAM_WEB_API_KEY: string
  SENTRY_DSN: string
  POLL_WAIT_MS: number
  MIN_SEQUENCE_NUM: number
}
