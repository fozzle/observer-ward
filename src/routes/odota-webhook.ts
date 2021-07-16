import GAME_MODES from '../data/gamemodes'
import HERO_MAP from '../data/heroes'
import fetchClient from '../odota/fetchClient'
import { Match, Player } from '../types/odota'
import { GuildConfig, PlayerConfig } from '../types/shared'
import { USER_PREFIX } from './constants'


const MESSAGE_ENDPOINT = (channelId: string) => `https://discord.com/api/channels/${channelId}/messages`


const WIN_COLOR = parseInt('19e62d', 16)
const LOSS_COLOR = parseInt('f10e16', 16)

function getOpenDotaMatchURL(matchId: string | number) {
  return `https://www.opendota.com/matches/${matchId}`
}


async function postMatchToGuild(
  match: Match,
  guildConfig: GuildConfig,
) {
  const {
    radiant_win: radiantWin,
    radiant_score: radiantScore,
    dire_score: direScore,
    match_id: matchId,
    game_mode: gameMode,
    players,
  } = match

  const knownPlayers = players.filter(
    ({ account_id: accountId }) => guildConfig.users[String(accountId)] != null,
  )

  const playerTeams = {
    radiant: knownPlayers.filter(({ player_slot: slot }) => slot < 5),
    dire: knownPlayers.filter(({ player_slot: slot }) => slot >= 5),
  }

  function accountAlias(accountId: number) {
    return guildConfig.users[accountId]?.alias
  }

  // Maybe someday we'll format this better for situations w/ players against each other
  // but for now we'll just post one message per known team
  for (const [teamName, team] of Object.entries(playerTeams)) {
    if (team.length === 0) continue

    const teamWon = teamName === 'radiant' ? radiantWin : !radiantWin
    const playersString = team
      .map(
        ({ name, account_id: accountId }) =>
        accountAlias(accountId) ?? name,
      )
      .join(',')
    const playerFields = team.map(
      ({ name, kills, deaths, assists, account_id: accountId, hero_id: heroId }) => ({
        name: accountAlias(accountId) ?? name,
        value: `${HERO_MAP[heroId]?.name ?? 'Unknown Hero'} - ${kills}/${deaths}/${assists}`,
      }),
    )
    // hit discord webhook w/ formatted data
    await fetchClient(MESSAGE_ENDPOINT(guildConfig.channelId), {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: `${playersString} ${
              teamWon ? 'won' : 'lost'
            } a game as ${teamName}`,
            url: getOpenDotaMatchURL(matchId),
            color: teamWon ? WIN_COLOR : LOSS_COLOR,
            fields: [
              {
                name: 'Game Mode',
                value: GAME_MODES[String(gameMode)].name,
              },
              {
                name: 'Radiant Score',
                value: radiantScore,
                inline: true,
              },
              {
                name: 'Dire Score',
                value: direScore,
                inline: true,
              },
              ...playerFields
            ],
          },
        ],
      }),
    })
  }
}

export default async function routeHandler(request: Request) {
  const requestURL = new URL(request.url)
  const requestSecret = requestURL.searchParams.get('secret')
  if (requestSecret !== OBSERVER_WARD_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  const requestGuildId = requestURL.searchParams.get('guildId')
  if (requestGuildId == null) {
    return new Response('Missing guildId', {status: 400})
  }

  const guildConfig = (await GUILDS.get(requestGuildId, 'json')) as GuildConfig | null
  if (guildConfig == null) {
    return new Response('Not found', {status: 404})
  }

  if (!guildConfig.channelId) {
    // Nothing to do here
    return new Response('Guild not configured', {status: 400})
  }

  let data = null
  try {
    data = (await request.json()) as Match
    if (!data) throw new Error()
  } catch (e) {
    return new Response('Invalid request', { status: 400 })
  }

  try {
    await postMatchToGuild(data, guildConfig)
  } catch (e) {
    console.error('Error posting to guild', e)
    return new Response('failed', {status: 500})
  }

  return new Response('ok', {status: 200})
}