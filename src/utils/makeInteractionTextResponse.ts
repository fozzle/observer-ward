export default function makeInteractionTextResponse(
  content: string,
  ephemeral: boolean = false,
) {
  return new Response(
    JSON.stringify({
      type: 4,
      data: {
        content,
        flags: ephemeral ? 1 << 6 : 0,
      },
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
}
