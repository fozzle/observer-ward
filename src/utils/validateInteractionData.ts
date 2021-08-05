import { APIApplicationCommandGuildInteraction } from 'discord-api-types'
import { objectOutputType, z, ZodObject, ZodRawShape, ZodTypeAny } from 'zod'
import { WorkerEnvironment } from '../types/environment'
import makeInteractionTextResponse from './makeInteractionTextResponse'

function extractData(
  schema: ZodObject<any>,
  data: APIApplicationCommandGuildInteraction,
) {
  const constructed: Record<string, unknown> = {}
  for (const keyName of Object.keys(schema.shape)) {
    constructed[keyName] = (
      data.data.options?.find(({ name }) => keyName === name) as any
    )?.value
  }
  return constructed
}

export default function validateInteractionData<T extends ZodRawShape>(
  schema: ZodObject<T>,
  handler: (
    data: objectOutputType<T, ZodTypeAny>,
    raw: APIApplicationCommandGuildInteraction,
    env: WorkerEnvironment,
  ) => Promise<Response>,
): (
  data: APIApplicationCommandGuildInteraction,
  env: WorkerEnvironment,
) => Promise<Response> {
  return async (data, env) => {
    const extractedData = extractData(schema, data)
    let parsedData
    try {
      parsedData = schema.parse(extractedData)
    } catch (e) {
      // Make parse error response
      return makeInteractionTextResponse(e.message, true)
    }
    return handler(parsedData, data, env)
  }
}
