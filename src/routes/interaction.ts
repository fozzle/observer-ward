import type {
  APIApplicationCommandGuildInteraction,
  APIApplicationCommandInteraction,
  APIInteraction,
  ApplicationCommandInteractionDataOptionString,
} from 'discord-api-types'
import * as ed from 'noble-ed25519'
import { susbcribeGuildToUser, unsubscribeGuildToUser } from '../odota/webhooks'
import { GuildConfig } from '../types/shared'
import { USER_GUILD_KEY } from './constants'

enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
}

const encoder = new TextEncoder()

function makeTextResponse(content: string) {
  return new Response(
    JSON.stringify({
      type: 4,
      data: {
        content,
      },
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
}

// TODO: Hopefully cloudflare supports a native impl of Ed25519 soon
async function validateInteraction(request: Request, rawBody: string) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')
  const hash = encoder.encode(timestamp + rawBody)
  const isVerified = await ed.verify(signature!, hash, DISCORD_PUBLIC_KEY)
  if (!isVerified) throw new Error('Failed to verify')
}

enum SlashCommands {
  SUBSCRIBE_USER = 'subscribe_user',
  UNSUBSCRIBE_USER = 'unsubscribe_user',
  LIST_USERS = 'list_users',
  CONFIGURE_GUILD = 'configure_guild'
}

async function handleSubscribeUser(
  data: APIApplicationCommandGuildInteraction,
) {
  const accountId = (
    data.data.options?.find(({ name }) => name === 'account_id') as
      | ApplicationCommandInteractionDataOptionString
      | undefined
  )?.value
  const nickname = (
    data.data.options?.find(({ name }) => name === 'nickname') as
      | ApplicationCommandInteractionDataOptionString
      | undefined
  )?.value
  if (accountId == null)
    return new Response('Missing account_id', { status: 400 })
  const guildId = data.guild_id
  await susbcribeGuildToUser(guildId, accountId, nickname)
  PLAYERS.put(USER_GUILD_KEY(accountId, guildId), '')
  return makeTextResponse(`Subscribed to ${accountId}`)
}

async function handleUnsubscribeUser(
  data: APIApplicationCommandGuildInteraction,
) {
  const accountId = (
    data.data.options?.find(({ name }) => name === 'account_id') as
      | ApplicationCommandInteractionDataOptionString
      | undefined
  )?.value
  if (accountId == null)
    return new Response('Missing account ID', { status: 400 })
  const guildId = data.guild_id
  await unsubscribeGuildToUser(guildId, accountId)
  PLAYERS.delete(USER_GUILD_KEY(accountId, guildId))
  return makeTextResponse(`Unsubscribed from ${accountId}`)
}

async function handleListUsers(data: APIApplicationCommandGuildInteraction) {
  const guildId = data.guild_id
  const guildConfig = (await GUILDS.get(guildId)) as GuildConfig | null
  const playerIDList = guildConfig != null ? Object.keys(guildConfig.users) : []
  return makeTextResponse(`${playerIDList.length} found\n\n
      \`\`\`
      ${JSON.stringify(playerIDList)}
      \`\`\``)
}

async function handleConfigureGuild(
  data: APIApplicationCommandGuildInteraction,
) {
  const guildId = data.guild_id
  const channelId = (
    data.data.options?.find(({ name }) => name === 'channel_id') as
      | ApplicationCommandInteractionDataOptionString
      | undefined
  )?.value
  if (channelId == null) return makeTextResponse('Requires channel ID')
  const guildConfig = ((await GUILDS.get(guildId, 'json')) as GuildConfig | null) ?? {
    id: guildId as string,
    webhookId: '',
    channelId: channelId,
    users: {}
  }
  guildConfig.channelId = channelId
  await GUILDS.put(guildId, JSON.stringify(guildConfig))
  return makeTextResponse(`Guild information updated.`)
}

async function handleCommand(
  request: Request,
  data: APIApplicationCommandInteraction,
): Promise<Response> {
  if (!data.hasOwnProperty('guild_id')) {
    return new Response('Cannot process commands outside of guild', {
      status: 400,
    })
  }

  data = data as APIApplicationCommandGuildInteraction

  const commandData = data.data
  switch (commandData.name) {
    case SlashCommands.SUBSCRIBE_USER:
      return handleSubscribeUser(data)
    case SlashCommands.UNSUBSCRIBE_USER:
      return handleUnsubscribeUser(data)
    case SlashCommands.LIST_USERS:
      return handleListUsers(data)
    case SlashCommands.CONFIGURE_GUILD:
      return handleConfigureGuild(data)
    default:
      return new Response('Unknown command type', { status: 400 })
  }
}

export default async function handleInteraction(
  request: Request,
): Promise<Response> {
  const rawBody = await request.text()
  try {
    await validateInteraction(request, rawBody)
  } catch (e) {
    return new Response('Invalid signature', { status: 401 })
  }

  let data = null
  try {
    data = JSON.parse(rawBody) as APIInteraction
  } catch (e) {
    return new Response('Malformed JSON', { status: 400 })
  }

  switch (data.type as number) {
    case InteractionType.Ping:
      return new Response(JSON.stringify({ type: InteractionType.Ping }))
    case InteractionType.ApplicationCommand:
      return handleCommand(request, data as APIApplicationCommandInteraction)
    default:
      return new Response('Unknown interaction type', { status: 400 })
  }
}
