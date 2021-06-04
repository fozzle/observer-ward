import {
  APIApplicationCommandInteraction,
  APIInteraction,
  InteractionType,
} from 'discord-api-types'
import * as ed from 'noble-ed25519'

const encoder = new TextEncoder()

// TODO: Hopefully cloudflare supports a native impl of Ed25519 soon
async function validateInteraction(request: Request) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')
  const body = await request.text()
  const hash = encoder.encode(timestamp + body)
  const isVerified = await ed.verify(signature!, hash, DISCORD_PUBLIC_KEY)
  if (!isVerified) throw new Error('Failed to verify')
}

function handleCommand(
  request: Request,
  data: APIApplicationCommandInteraction,
) {}

export default async function handleInteraction(request: Request) {
  try {
    await validateInteraction(request)
  } catch (e) {
    return new Response('Invalid signature', { status: 401 })
  }

  let data = null
  try {
    data = (await request.json()) as APIInteraction
  } catch (e) {
    return new Response('Malformed JSON', { status: 400 })
  }

  switch (data.type) {
    case InteractionType.Ping:
      return new Response(JSON.stringify({ type: InteractionType.Ping }))
    case InteractionType.ApplicationCommand:
      return handleCommand(request, data as APIApplicationCommandInteraction)
    default:
      return new Response('Unknown interaction type', { status: 400 })
  }
}
