export interface WorkerEnvironment {
  OBSERVER_WARD_WEBHOOK_SECRET: string
  OBSERVER_WARD_WEBHOOK_BASE: string
  DISCORD_PUBLIC_KEY: string
  ODOTA_SESSION: string
  ODOTA_SESSION_SIG: string
  DISCORD_BOT_TOKEN: string
  GUILD_DURABLE_OBJECTS: DurableObjectNamespace
  STEAM_WEB_API_KEY: string
  SENTRY_DSN: string
}