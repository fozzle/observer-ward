import type { GuildObjectRequest } from '../durable-object/GuildObject'

export function getDurableObjectForGuild(
  guildId: string,
  objectNamespace: DurableObjectNamespace,
) {
  const objectId = objectNamespace.idFromName(guildId)
  const object = objectNamespace.get(objectId)
  return object
}

export default function requestToGuildObject(
  guildId: string,
  payload: GuildObjectRequest,
  objectNamespace: DurableObjectNamespace,
) {
  const object = getDurableObjectForGuild(guildId, objectNamespace)
  return object.fetch('https://example.com', {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      guildId,
    },
  })
}
