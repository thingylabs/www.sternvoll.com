// components/CartDialog.tsx
import { forwardRef } from 'preact/compat'
import { CartData } from '@/utils/data.ts'
import { CartContents } from '@/islands/CartContents.tsx'
import type { TranslationMap } from '@/translations.ts'
import type { Signal } from '@preact/signals'

interface CartDialogProps {
  cart: CartData | undefined
  t: TranslationMap
  onCheckout: () => void
  onClose: () => void
  isComfortCheckoutEnabled: Signal<boolean>
  onToggleComfortCheckout: () => void
}

export const CartDialog = forwardRef<HTMLDialogElement, CartDialogProps>(
  function CartDialog(
    {
      cart,
      t,
      onCheckout,
      onClose,
      isComfortCheckoutEnabled,
      onToggleComfortCheckout,
    },
    ref,
  ) {
    const handleBackdropClick = (e: MouseEvent) => {
      const dialog = e.target as HTMLDialogElement
      if (dialog.tagName === 'DIALOG') {
        onClose()
      }
    }

    return (
      <dialog
        ref={ref}
        class='bg-transparent p-0 m-0 pt-[50%] sm:pt-0 max-w-full sm:pl-[40%] md:pl-[60%] w-full max-h-full h-full transition-transform duration-500 sm:translate-x-0 translate-y-0 backdrop-blur'
        onClick={handleBackdropClick}
      >
        <CartContents
          cart={cart}
          t={t}
          onCheckout={onCheckout}
          isComfortCheckoutEnabled={isComfortCheckoutEnabled}
          onToggleComfortCheckout={onToggleComfortCheckout}
          onClose={onClose}
        />
      </dialog>
    )
  },
)
