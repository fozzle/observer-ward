export const USER_GUILD_DELIMITER = ':'
export const USER_PREFIX = (accountId: string) => `userguild:${accountId}`
export const USER_GUILD_KEY = (accountId: string, guildId: string) => `${USER_PREFIX(accountId)}:${guildId}`
