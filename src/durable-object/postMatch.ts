import GAME_MODES from '../data/gamemodes'
import HERO_MAP from '../data/heroes'
import fetchClient from '../odota/fetchClient'
import { Match, Player } from '../types/odota'
import { PlayerConfig } from '../types/shared'

const MESSAGE_ENDPOINT = (channelId: string) =>
  `https://discord.com/api/channels/${channelId}/messages`

const WIN_COLOR = parseInt('19e62d', 16)
const LOSS_COLOR = parseInt('f10e16', 16)

function getOpenDotaMatchURL(matchId: string | number) {
  return `https://www.opendota.com/matches/${matchId}`
}

export default async function postMatch(
  match: Match,
  users: Record<string, PlayerConfig>,
  channelId: string,
  botToken: string,
) {
  console.log('RECEIVED WEBHOOK', match)
  const {
    radiant_win: radiantWin,
    radiant_score: radiantScore,
    dire_score: direScore,
    match_id: matchId,
    game_mode: gameMode,
    players,
  } = match

  const knownPlayers = players.filter(
    ({ account_id: accountId }) => users[String(accountId)] != null,
  )

  const playerTeams = {
    radiant: knownPlayers.filter(({ player_slot: slot }) => slot < 5),
    dire: knownPlayers.filter(({ player_slot: slot }) => slot >= 5),
  }

  function accountAlias(accountId: number) {
    return users[accountId]?.alias
  }

  // Maybe someday we'll format this better for situations w/ players against each other
  // but for now we'll just post one message per known team
  for (const [teamName, team] of Object.entries(playerTeams)) {
    if (team.length === 0) continue

    const teamWon = teamName === 'radiant' ? radiantWin : !radiantWin
    const playersString = team
      .map(
        ({ personaname, name, account_id: accountId }) =>
          accountAlias(accountId) || personaname || name || `${accountId}`,
      )
      .join(', ')
    const playerFields = team.map(
      ({
        personaname,
        name,
        kills,
        deaths,
        assists,
        account_id: accountId,
        hero_id: heroId,
      }) => ({
        name: accountAlias(accountId) || personaname || name || `${accountId}`,
        value: `${
          HERO_MAP[heroId]?.name ?? 'Unknown Hero'
        } - ${kills}/${deaths}/${assists}`,
        inline: true,
      }),
    )
    const payload = JSON.stringify({
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
            ...playerFields,
          ],
        },
      ],
    })
    console.log('POSTIN IT', payload)
    // hit discord webhook w/ formatted data
    await fetchClient(MESSAGE_ENDPOINT(channelId), {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${botToken}`,
      },
      body: payload,
    })
  }
}
