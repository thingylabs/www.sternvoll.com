import { useState } from 'preact/hooks'
import { addToCart, ensureLocale, useCart } from '@/utils/data.ts'
import type { CountryCode } from '@/config/locales.ts'

interface AddToCartProps {
  id: string
  country: CountryCode
}

export function AddToCart(props: AddToCartProps) {
  const { data } = useCart(props.country)
  const [isAdding, setIsAdding] = useState(false)

  const add = (e: MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addToCart(data!.id, props.id).finally(() => {
      setIsAdding(false)
    })
  }

  return (
    <button
      onClick={add}
      disabled={!data && !isAdding}
      class={`w-full ${
        isAdding ? '!bg-gray-400' : 'bg-gray-700'
      } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 2xl:text-[1.5vw] 2xl:py-[1vw]`}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
