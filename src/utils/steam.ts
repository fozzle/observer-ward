import fetchClient from './fetchClient'

const STEAM_MAGIC_NUMBER = BigInt('76561197960265728')
const STEAM_API_BASE = 'https://api.steampowered.com'

export function steam32To64(id: string): bigint {
  return BigInt(id) + STEAM_MAGIC_NUMBER
}

export async function steamAccountExists(
  id: string,
  apiKey: string,
): Promise<boolean> {
  const url = new URL(`${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v2`)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('steamids', steam32To64(id).toString())
  const results: {response: {players: Array<{personaname: string}>}} = await fetchClient(url.toString())
  return results.response.players.length > 0
}
