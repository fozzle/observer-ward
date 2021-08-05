export interface WorkerEnvironment {
  OBSERVER_WARD_WEBHOOK_SECRET: string
  DISCORD_PUBLIC_KEY: string
  ODOTA_SESSION: string
  ODOTA_SESSION_SIG: string
  DISCORD_BOT_TOKEN: string
  GUILD_DURABLE_OBJECTS: DurableObjectNamespace
}
