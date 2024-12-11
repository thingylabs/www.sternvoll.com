// routes/[[lang]]/checkout/start.tsx
import {
  Checkout,
  translationKeys as checkoutTranslationKeys,
} from '@/islands/Checkout.tsx'
import { Handlers, PageProps } from '$fresh/server.ts'
import { State } from '@/routes/_middleware.ts'
import { Footer } from '@/components/Footer.tsx'
import { meta as siteMeta } from '@/config/meta.ts'

export const handler: Handlers = {
  GET(_req, ctx) {
    const PAYPAL_URL = Deno.env.get('PAYPAL_URL')

    return ctx.render({ PAYPAL_URL })
  },
}

export default function CheckoutPage(
  ctx: PageProps<{ PAYPAL_URL: string }, State>,
) {
  const { state, data } = ctx
  const meta = {
    ...siteMeta,
    title: 'Manual Checkout',
    description: 'Check out the classical way',
    locale: state.geo.locale,
    lang: state.geo.lang,
  }
  const getT = state.geo.getT

  return (
    <div>
      <div class='h-[72px] w-full absolute top-0 sm:hidden'></div>
      <div class='py-8'>
        <div class='max-w-3xl mx-auto px-4'>
          {/* Order Summary Header - Static */}
          <div class='mb-8'>
            <h1 class='text-2xl font-bold text-secondary'>Checkout</h1>
            <p class='text-gray-300 mt-2'>Privacy Mode</p>
          </div>

          {/* Pass PAYPAL_URL to Checkout */}
          <Checkout
            t={getT(checkoutTranslationKeys)}
            PAYPAL_URL={data.PAYPAL_URL}
          />
        </div>
      </div>
      <Footer meta={meta} t={getT()} />
    </div>
  )
}
