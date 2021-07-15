export interface PlayerConfig {
  alias?: string
}

// TODO: may eventually move this to a durable object per guild
export interface GuildConfig {
  id: string
  webhookId: string
  channelId: string
  users: { [accountId: string]: PlayerConfig }
  // Maybe permissions here
}
