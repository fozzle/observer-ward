import GAME_MODES from '../data/gamemodes'
import HERO_MAP from '../data/heroes'
import { Match, Player } from '../types/odota'
import { GuildConfig, PlayerConfig } from '../types/shared'
import { USER_PREFIX } from './constants'



const WIN_COLOR = parseInt('19e62d', 16)
const LOSS_COLOR = parseInt('f10e16', 16)

function getOpenDotaMatchURL(matchId: string | number) {
  return `https://www.opendota.com/matches/${matchId}`
}

type PlayerInfo = { [accountId: number]: { nickname?: string } }
async function collectPlayersByGuild(players: Player[]) {
  const guildsToPlayers = {} as Record<string, Set<string>>
  for (const { account_id: accountId } of players) {
    const playerKeys = await PLAYERS.list({prefix: USER_PREFIX(String(accountId))})
    playerKeys.keys.map(({name}) => {
      const [_, accountId, guildId] = name.split(':')
      const players = guildsToPlayers[guildId] ?? new Set()
      players.add(accountId)
      guildsToPlayers[guildId] = players
    })
  }

  return guildsToPlayers
}

async function postMatchToGuilds(
  match: Match,
  guildsToPlayers: Record<string, Set<string>>,
) {
  const { players } = match

  for (const guildId in guildsToPlayers) {
    const guildConfig = (await GUILDS.get(guildId, 'json')) as
      | GuildConfig
      | undefined
    if (guildConfig == null) continue

    const guildPlayers = guildsToPlayers[guildId]
    const knownPlayers = players.filter(
      ({ account_id: accountId }) => guildPlayers.has(String(accountId)),
    )

    const playerTeams = {
      radiant: knownPlayers.filter(({ player_slot: slot }) => slot < 5),
      dire: knownPlayers.filter(({ player_slot: slot }) => slot >= 5),
    }

    postMatchToGuild(match, guildConfig, playerTeams)
  }
}

async function postMatchToGuild(
  match: Match,
  guildConfig: GuildConfig,
  teamPlayers: { [team: string]: Player[] },
) {
  const {
    radiant_win: radiantWin,
    radiant_score: radiantScore,
    dire_score: direScore,
    match_id: matchId,
    game_mode: gameMode,
  } = match

  // Maybe someday we'll format this better for situations w/ players against each other
  // but for now we'll just post one message per known team
  for (const teamName in teamPlayers) {
    const team = teamPlayers[teamName]
    if (team.length === 0) continue

    const teamWon = teamName === 'radiant' ? radiantWin : !radiantWin
    const playersString = team
      .map(
        ({ name, account_id: accountId }) =>
          guildConfig.users[accountId]?.alias ?? name,
      )
      .join(',')
    const playerFields = team.map(
      ({ name, kills, deaths, assists, account_id: accountId, hero_id: heroId }) => ({
        name: guildConfig.users[accountId]?.alias ?? name,
        value: `${HERO_MAP[heroId]?.name ?? 'Unknown Hero'} - ${kills}/${deaths}/${assists}`,
      }),
    )
    // hit discord webhook w/ formatted data
    await fetch(DISCORD_WEBHOOK_URL, {
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
  const requestSecret = new URL(request.url).searchParams.get('secret')
  if (requestSecret !== OBSERVER_WARD_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Contact odota, get data
  let data = null
  try {
    data = (await request.json()) as Match
  } catch (e) {}

  if (!data) {
    return new Response('Invalid request', { status: 400 })
  }

  const guildsToPlayers = await collectPlayersByGuild(data.players);
  await postMatchToGuilds(data, guildsToPlayers)

  return new Response('ok')
}