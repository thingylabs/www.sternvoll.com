// routes/api/waitlist.ts
import { Handlers } from '$fresh/server.ts'
import { kv } from '@/utils/kv.ts'
import { sendWaitlistNotification } from '@/utils/emails.ts'

export const handler: Handlers = {
  async POST(req) {
    try {
      const { email, productTitle } = await req.json()

      console.log(
        'kv',
        [
          'sternvoll.com',
          Deno.env.get('ENV')!,
          'waitlist',
          productTitle,
          email,
        ],
        {
          email,
          productTitle,
          addedAt: new Date().toISOString(),
        },
      )
      console.log(
        await kv.german.set(
          [
            'sternvoll.com',
            Deno.env.get('ENV')!,
            'waitlist',
            productTitle,
            email,
          ],
          {
            email,
            productTitle,
            addedAt: new Date().toISOString(),
          },
        ),
      )

      await sendWaitlistNotification(email, productTitle)

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    } catch (err) {
      const error = err as Error
      console.error('Error processing waitlist request:', error)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      )
    }
  },
}
