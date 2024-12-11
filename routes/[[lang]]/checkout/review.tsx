// routes/[[lang]]/checkout/review.tsx
import { PageProps } from '$fresh/server.ts'
import { State } from '@/routes/_middleware.ts'
import { Footer } from '@/components/Footer.tsx'
import { meta as siteMeta } from '@/config/meta.ts'
import { BackToShopButton } from '@/islands/BackToShopButton.tsx'
import {
  OrderReview,
  translationKeys as orderReviewTranslationKeys,
} from '@/islands/OrderReview.tsx'
import {
  OrderPay,
  translationKeys as orderPayTranslationKeys,
} from '@/islands/OrderPay.tsx'

export default function ReviewPage({ state }: PageProps<unknown, State>) {
  const meta = {
    ...siteMeta,
    title: 'Manual Checkout',
    description: 'Check out the classical way',
    locale: state.geo.locale,
    lang: state.geo.lang,
  }
  const getT = state.geo.getT

  return (
    <>
      <div class='h-[72px] w-full'></div>

      <div class='min-h-screen bg-primary'>
        <div class='mx-auto px-4'>
          <div class='bg-white p-8 pt-12 rounded-lg shadow'>
            <OrderPay t={getT(orderPayTranslationKeys)}>
              <OrderReview
                t={getT(orderReviewTranslationKeys)}
                sepa={siteMeta.sepa}
              />
            </OrderPay>
          </div>

          <div class='back-to-shop mt-12 print:hidden'>
            <BackToShopButton />
          </div>
        </div>
      </div>
      <Footer meta={meta} t={state.geo.getT()} />
    </>
  )
}
