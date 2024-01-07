import GAME_MODES from '../data/gamemodes'
import HERO_MAP from '../data/heroes'
import fetchClient from '../utils/fetchClient'
import { Match, Player } from '../types/odota'
import { PlayerConfig } from '../types/shared'
import {
  LOSS_COLOR,
  MESSAGE_ENDPOINT,
  OPEN_DOTA_MATCH_URL,
  WIN_COLOR,
} from './constants'
import { DotaMatch } from '../types/steam'

function getHeroEmojiString(heroId: number | string): string {
  const heroEmoji = HERO_MAP[heroId]?.emoji
  if (!heroEmoji) return ''
  // Extra space to pad out hero name
  return `<${heroEmoji}> `
}

function getHeroName(heroId: number | string): string {
  return HERO_MAP[heroId]?.name ?? 'Unknown Hero'
}

export default async function postMatch(
  match: DotaMatch,
  users: Record<string, PlayerConfig>,
  channelId: string,
  botToken: string,
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
        value: `${getHeroEmojiString(heroId)}${getHeroName(
          heroId,
        )} - ${kills}/${deaths}/${assists}`,
        inline: true,
      }),
    )
    const payload = JSON.stringify({
      embeds: [
        {
          title: `${playersString} ${
            teamWon ? 'won' : 'lost'
          } a game as ${teamName}`,
          url: OPEN_DOTA_MATCH_URL(matchId),
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
