import { z } from 'zod'
import type {
  APIApplicationCommandGuildInteraction,
  APIApplicationCommandInteraction,
  APIInteraction,
} from 'discord-api-types'
import { susbcribeGuildToUser, unsubscribeGuildToUser } from '../odota/webhooks'
import { GuildConfig } from '../types/shared'
import hexToArrayBuffer from '../utils/hexToBuffer'
import { USER_GUILD_KEY } from './constants'
import makeInteractionTextResponse from '../utils/makeInteractionTextResponse'
import validateInteractionData from '../utils/validateInteractionData'

enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
}

const encoder = new TextEncoder()

async function validateInteraction(request: Request, rawBody: string) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')
  const hash = encoder.encode(timestamp + rawBody)
  const encodedKey = hexToArrayBuffer(DISCORD_PUBLIC_KEY)
  const rawSignature = hexToArrayBuffer(signature!)
  const publicKey = await crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' },
    false,
    ['verify'],
  )
  const isVerified = await crypto.subtle.verify(
    'NODE-ED25519',
    publicKey,
    rawSignature,
    hash,
  )
  if (!isVerified) throw new Error('Failed to verify')
}

enum SlashCommands {
  SUBSCRIBE_USER = 'subscribe_user',
  UNSUBSCRIBE_USER = 'unsubscribe_user',
  LIST_USERS = 'list_users',
  CONFIGURE_GUILD = 'configure_guild',
}

const Z_ACCOUNT_ID = z.string().regex(/\d+/)
const Z_DISCORD_SNOWFLAKE = z.string().regex(/\d+/)

const handleSubscribeUser = validateInteractionData(
  z.object({
    account_id: Z_ACCOUNT_ID,
    nickname: z.string().max(32),
  }),
  async ({ account_id: accountId, nickname }, { guild_id: guildId }) => {
    console.log('nickname', nickname)
    await susbcribeGuildToUser(guildId, accountId, nickname)
    PLAYERS.put(USER_GUILD_KEY(accountId, guildId), '')
    return makeInteractionTextResponse(`Subscribed to ${accountId}`)
  },
)

const handleUnsubscribeUser = validateInteractionData(
  z.object({
    account_id: Z_ACCOUNT_ID,
  }),
  async ({ account_id: accountId }, { guild_id: guildId }) => {
    await unsubscribeGuildToUser(guildId, accountId)
    PLAYERS.delete(USER_GUILD_KEY(accountId, guildId))
    return makeInteractionTextResponse(`Unsubscribed from ${accountId}`)
  },
)

const handleListUsers = validateInteractionData(
  z.object({}),
  async ({}, { guild_id: guildId }) => {
    const guildConfig = (await GUILDS.get(
      guildId,
      'json',
    )) as GuildConfig | null
    const playerIDList =
      guildConfig != null ? Object.keys(guildConfig.users) : []
    const response = makeInteractionTextResponse(`${playerIDList.length} found.
\`\`\`
${JSON.stringify(playerIDList)}
\`\`\``)
    return response
  },
)

const handleConfigureGuild = validateInteractionData(
  z.object({
    channel_id: Z_DISCORD_SNOWFLAKE,
  }),
  async (
    { channel_id: channelId },
    { guild_id: guildId, member: { permissions } },
  ) => {
    if (!(BigInt(permissions) & BigInt(1 << 5))) {
      return makeInteractionTextResponse(
        'Must have Manage Server permission to configure this guild.',
      )
    }

    const guildConfig = ((await GUILDS.get(
      guildId,
      'json',
    )) as GuildConfig | null) ?? {
      id: guildId as string,
      webhookId: '',
      channelId: channelId,
      users: {},
    }
    guildConfig.channelId = channelId
    await GUILDS.put(guildId, JSON.stringify(guildConfig))
    return makeInteractionTextResponse(`Guild information updated.`)
  },
)

async function handleCommand(
  request: Request,
  data: APIApplicationCommandInteraction,
): Promise<Response> {
  if (!data.hasOwnProperty('guild_id')) {
    return makeInteractionTextResponse(
      'Cannot process commands outside of guild',
    )
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
      return makeInteractionTextResponse('Unknown command type')
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
