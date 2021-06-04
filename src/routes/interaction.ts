import { z } from 'zod'
import type {
  APIApplicationCommandGuildInteraction,
  APIApplicationCommandInteraction,
  APIInteraction,
} from 'discord-api-types'
import hexToArrayBuffer from '../utils/hexToBuffer'
import makeInteractionTextResponse from '../utils/makeInteractionTextResponse'
import validateInteractionData from '../utils/validateInteractionData'
import requestToGuildObject from '../utils/requestToGuildObject'
import { WorkerEnvironment } from '../types/environment'
import { steamAccountExists } from '../utils/steam'

enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
}

const encoder = new TextEncoder()

async function validateInteraction(
  request: Request,
  rawBody: string,
  discordPublicKey: string,
) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')
  const hash = encoder.encode(timestamp + rawBody)
  const encodedKey = hexToArrayBuffer(discordPublicKey)
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

export enum SlashCommands {
  SUBSCRIBE_USER = 'subscribe_user',
  UNSUBSCRIBE_USER = 'unsubscribe_user',
  LIST_USERS = 'list_users',
  CONFIGURE_GUILD = 'configure_guild',
  RESET_GUILD = 'reset_guild',
}

const Z_ACCOUNT_ID = z.string().regex(/\d+/)
const Z_DISCORD_SNOWFLAKE = z.string().regex(/\d+/).max(19)

const handleSubscribeUser = validateInteractionData(
  z.object({
    account_id: Z_ACCOUNT_ID,
    nickname: z.string().max(32),
  }),
  async ({ account_id: accountId, nickname }, { guild_id: guildId }, env) => {
    if (!(await steamAccountExists(accountId, env.STEAM_WEB_API_KEY))) {
      return makeInteractionTextResponse(
        `Could not find Steam Account ${accountId}. Please ensure this is a Steam32 ID.`,
        true,
      )
    }
    
    return requestToGuildObject(
      guildId,
      {
        method: SlashCommands.SUBSCRIBE_USER,
        userId: accountId,
        nickname,
      },
      env.GUILD_DURABLE_OBJECTS,
    )
  },
)

const handleUnsubscribeUser = validateInteractionData(
  z.object({
    account_id: Z_ACCOUNT_ID,
  }),
  async ({ account_id: accountId }, { guild_id: guildId }, env) => {
    return requestToGuildObject(
      guildId,
      {
        method: SlashCommands.UNSUBSCRIBE_USER,
        userId: accountId,
      },
      env.GUILD_DURABLE_OBJECTS,
    )
  },
)

const handleListUsers = validateInteractionData(
  z.object({}),
  async ({}, { guild_id: guildId }, env) => {
    return requestToGuildObject(
      guildId,
      { method: SlashCommands.LIST_USERS },
      env.GUILD_DURABLE_OBJECTS,
    )
  },
)

const handleConfigureGuild = validateInteractionData(
  z.object({
    channel_id: Z_DISCORD_SNOWFLAKE,
  }),
  async (
    { channel_id: channelId },
    { guild_id: guildId, member: { permissions } },
    env,
  ) => {
    if (!(BigInt(permissions) & BigInt(1 << 5))) {
      return makeInteractionTextResponse(
        'Must have Manage Server permission to configure this guild.',
      )
    }

    return requestToGuildObject(
      guildId,
      { method: SlashCommands.CONFIGURE_GUILD, channelId },
      env.GUILD_DURABLE_OBJECTS,
    )
  },
)

const handleResetGuild = validateInteractionData(
  z.object({}),
  async ({}, { guild_id: guildId, member: { permissions } }, env) => {
    if (!(BigInt(permissions) & BigInt(1 << 5))) {
      return makeInteractionTextResponse(
        'Must have Manage Server permission to configure this guild.',
      )
    }

    return requestToGuildObject(
      guildId,
      { method: SlashCommands.RESET_GUILD },
      env.GUILD_DURABLE_OBJECTS,
    )
  },
)

async function handleCommand(
  request: Request,
  data: APIApplicationCommandInteraction,
  env: WorkerEnvironment,
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
      return handleSubscribeUser(data, env)
    case SlashCommands.UNSUBSCRIBE_USER:
      return handleUnsubscribeUser(data, env)
    case SlashCommands.LIST_USERS:
      return handleListUsers(data, env)
    case SlashCommands.CONFIGURE_GUILD:
      return handleConfigureGuild(data, env)
    case SlashCommands.RESET_GUILD:
      return handleResetGuild(data, env)
    default:
      return makeInteractionTextResponse('Unknown command type')
  }
}

export default async function handleInteraction(
  request: Request,
  env: WorkerEnvironment,
): Promise<Response> {
  const rawBody = await request.text()
  try {
    await validateInteraction(request, rawBody, env.DISCORD_PUBLIC_KEY)
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
      return handleCommand(
        request,
        data as APIApplicationCommandInteraction,
        env,
      )
    default:
      return new Response('Unknown interaction type', { status: 400 })
  }
}
