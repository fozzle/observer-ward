export const OBSERVER_WARD_WEBHOOK_BASE = 'https://kylepetrovi.ch/dota/odota'
export const GUILD_WEBHOOK_URL = (guildId: string, secret: string) =>
  `${OBSERVER_WARD_WEBHOOK_BASE}?guildId=${guildId}&secret=${secret}`
