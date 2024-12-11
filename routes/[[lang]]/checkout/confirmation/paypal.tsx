// routes/[[lang]]/checkout/confirmation/paypal.tsx
import { PageProps } from '$fresh/server.ts'
import { State } from '@/routes/_middleware.ts'
import { Footer } from '@/components/Footer.tsx'
import { meta as siteMeta } from '@/config/meta.ts'
import { BackToShopButton } from '@/islands/BackToShopButton.tsx'
import { ThankYou } from '@/islands/ThankYou.tsx'
import CartCleanup from '@/islands/CartCleanup.tsx'
import {
  NewsletterSignup,
  translationKeys as newsletterTranslationKeys,
} from '@/islands/NewsletterSignup.tsx'

export default function PayPalConfirmation(ctx: PageProps<unknown, State>) {
  const { state } = ctx
  const getT = state.geo.getT
  const t = getT()
  const meta = {
    ...siteMeta,
    title: 'PayPal Checkout Confirmation',
    description: 'Order confirmed with PayPal',
    locale: state.geo.locale,
    lang: state.geo.lang,
  }

  return (
    <>
      <CartCleanup />
      <div class='h-[72px] w-full'></div>

      <div class='p-4'>
        <div class='p-8 rounded-lg shadow'>
          <div class='text-center'>
            <h1 class='text-2xl font-bold text-gray-900 mb-2'>
              {t['Thank You for Your Order!']}
            </h1>
          </div>

          <ThankYou>
            <>
              <p class='text-lg mb-4'>
                {t['We will send out your order as soon as possible!']}
              </p>
              <p class='text-lg'>
                {t[
                  'If you have any questions, our support team is here to help.'
                ]}
              </p>
            </>
          </ThankYou>

          <NewsletterSignup t={getT(newsletterTranslationKeys)} />
        </div>

        <div class='back-to-shop mt-12 print:hidden'>
          <BackToShopButton />
        </div>
      </div>
      <Footer meta={meta} t={state.geo.getT()} />
    </>
  )
}
