/**
 * A fetch that throws on bad responses and returns JSON
 */

export default async function fetchClient(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args)
  if (!response.ok) {
    try {
      const parsed = await response.json()
      console.error('Failed request', response.status)
      throw new Error(JSON.stringify(parsed))
    } catch {
      throw new Error(
        `An unknown HTTP ${response.status} error occured on ${args[0]}`,
      )
    }
  }

  try {
    const parsed = await response.json()
    return parsed
  } catch {
    return null
  }
}
