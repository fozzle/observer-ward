export default function makeInteractionTextResponse(content: string) {
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
