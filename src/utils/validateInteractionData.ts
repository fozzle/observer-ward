import { APIApplicationCommandGuildInteraction } from 'discord-api-types'
import { objectOutputType, z, ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

function extractData(
  schema: ZodObject<any>,
  data: APIApplicationCommandGuildInteraction,
) {
  const constructed: Record<string, unknown> = {}
  for (const keyName of schema.shape) {
    constructed[keyName] = (
      data.data.options?.find(({ name }) => keyName) as any
    )?.value
  }
  return constructed
}

export default function validateInteractionData<T extends ZodRawShape>(
  schema: ZodObject<T>,
  handler: (data: objectOutputType<T, ZodTypeAny>, raw: APIApplicationCommandGuildInteraction) => Promise<Response>,
): (data: APIApplicationCommandGuildInteraction) => Promise<Response> {
  return (data: APIApplicationCommandGuildInteraction) => {
    const extractedData = extractData(schema, data)
    let parsedData
    try {
      parsedData = schema.parse(extractedData)
    } catch (e) {
      // Make parse error response
      return Promise.resolve(new Response('FAILED'))
    }
    return handler(parsedData, data)
  }
}
