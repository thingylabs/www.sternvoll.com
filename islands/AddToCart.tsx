// islands/AddToCart.tsx
import { useSignal } from '@preact/signals'
import { addToCart, useCart } from '@/utils/data.ts'
import type { CountryCode } from '@/config/locales.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { isCartOpen } from '@/utils/cartState.ts'

interface AddToCartProps {
  id: string
  country: CountryCode
}

export function AddToCart({ id }: AddToCartProps) {
  const { data } = useCart()
  const isAdding = useSignal(false)

  const baseClasses =
    'w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white'

  const getStateClasses = () => {
    if (!IS_BROWSER || isAdding.value || !data) {
      return '!bg-gray-400 cursor-not-allowed'
    }
    return 'bg-secondary hover:bg-gray-900'
  }

  const add = async (e: MouseEvent) => {
    e.preventDefault()
    if (!IS_BROWSER || !data || isAdding.value) return

    try {
      isAdding.value = true
      await addToCart(data.id, id)
      isCartOpen.value = true
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      isAdding.value = false
    }
  }

  const buttonText = isAdding.value
    ? 'Processing...'
    : !IS_BROWSER || !data
    ? 'Loading...'
    : 'Buy'

  return (
    <button
      onClick={add}
      disabled={!IS_BROWSER || !data || isAdding.value}
      class={`${baseClasses} ${getStateClasses()} `}
      style={!IS_BROWSER || !data
        ? ''
        : 'border: 2px solid black; color: black;'}
      aria-busy={isAdding.value}
    >
      {buttonText}
    </button>
  )
}
