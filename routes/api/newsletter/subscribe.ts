// routes/api/newsletter/subscribe.ts
import { Handlers } from '$fresh/server.ts'
import { kv } from '@/utils/kv.ts'

export const handler: Handlers = {
  async POST(req) {
    try {
      const { email } = await req.json()

      await kv.german
        .set(
          ['www.sternvoll.com', Deno.env.get('ENV')!, 'newsletter', email],
          {
            email,
            subscribedAt: new Date().toISOString(),
          },
        )

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    } catch (err) {
      console.error('Error in newsletter subscription:', err)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      )
    }
  },
}
