export const MESSAGE_ENDPOINT = (channelId: string) =>
  `https://discord.com/api/channels/${channelId}/messages`

export const WIN_COLOR = parseInt('19e62d', 16)
export const LOSS_COLOR = parseInt('f10e16', 16)

export function OPEN_DOTA_MATCH_URL(matchId: string | number) {
  return `https://www.opendota.com/matches/${matchId}`
}

export const MATCH_SEQUENCE_API_URL = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1'

export const MAX_SUBSCRIBED_USERS = 15