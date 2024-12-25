// islands/Cart.tsx
import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { useCart } from '@/utils/data.ts'
import { type LanguageCode, TranslationMap } from '@/translations.ts'
import type { CountryCode } from '@/config/locales.ts'
import { CartButton } from '@/islands/CartButton.tsx'
import { CartDialog } from '@/components/CartDialog.tsx'
import { PrivacyDialog } from '@/components/PrivacyDialog.tsx'
import { isCartOpen } from '@/utils/cartState.ts'
import { COOKIE_KEYS, setCookie } from '@/utils/cookies.ts'

export const translationKeys = [
  'Shopping Cart',
  'Open cart',
  'Checkout Options',
  'Comfort Checkout',
  'Manual Checkout',
  'Privacy Policy',
  'Data privacy',
  'Checkout',
  'or',
  'Continue Shopping',
  'Shipping and taxes calculated at checkout.',
  'For a fast, automated process with modern payment methods (e.g., PayPal, Klarna, Apple Pay). By choosing this checkout option, you agree to additional data processing. Learn more in our exended',
  'For customers who prefer not to have additional data processing. In this option, payment is made manually, e.g., through a manual PayPal or bank transfer.',
] as const

export type T = Pick<TranslationMap, typeof translationKeys[number]>

interface CartProps {
  transparentButton?: boolean
  t: TranslationMap
  lang: LanguageCode
  country: CountryCode
  comfortCheckout: boolean
}

export function Cart({
  transparentButton = false,
  t,
  lang,
  comfortCheckout,
}: CartProps) {
  const { data, error } = useCart()
  const isComfortCheckoutEnabled = useSignal(comfortCheckout)
  const hasUserSetPreference = useSignal(false)
  const cartRef = useRef<HTMLDialogElement>(null)
  const privacyRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isCartOpen.value) {
      cartRef.current?.showModal()
    } else {
      cartRef.current?.close()
    }
  }, [isCartOpen.value])

  const updatePreference = (enabled: boolean) => {
    hasUserSetPreference.value = true
    isComfortCheckoutEnabled.value = enabled
    setCookie(COOKIE_KEYS.COMFORT_CHECKOUT, enabled)
  }

  const handleCheckout = () => {
    // if (!isComfortCheckoutEnabled.value) {
    //  privacyRef.current?.showModal()
    // } else if (data) {
    if (data) {
      const url = new URL(data.checkoutUrl)
      url.searchParams.set('locale', lang)
      location.href = url.toString()
    }
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <CartButton
        onClick={() => isCartOpen.value = true}
        transparentButton={transparentButton}
        itemCount={data?.lines.nodes.length ?? 0}
        t={t}
      />

      <CartDialog
        ref={cartRef}
        cart={data}
        t={t}
        onCheckout={handleCheckout}
        isComfortCheckoutEnabled={isComfortCheckoutEnabled}
        onToggleComfortCheckout={() =>
          updatePreference(!isComfortCheckoutEnabled.value)}
        onClose={() => isCartOpen.value = false}
      />

      <PrivacyDialog
        ref={privacyRef}
        t={t}
        onAccept={() => {
          updatePreference(true)
          handleCheckout()
        }}
        onDecline={() => {
          updatePreference(false)
          globalThis.location.href = '/checkout/start'
        }}
      />
    </div>
  )
}
