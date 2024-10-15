import { useState } from 'preact/hooks'
import { addToCart, cart } from '@/utils/data.ts'

interface AddToCartProps {
  id: string
}

export default function AddToCart(props: AddToCartProps) {
  const cartData = cart.value
  const [isAdding, setIsAdding] = useState(false)

  const add = (e: MouseEvent) => {
    e.preventDefault()
    if (!cartData) return
    setIsAdding(true)
    addToCart(cartData.id, props.id).finally(() => {
      setIsAdding(false)
    })
  }

  return (
    <button
      onClick={add}
      disabled={!cartData || isAdding}
      class={`w-full ${
        isAdding ? '!bg-gray-400' : 'bg-gray-700'
      } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900`}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
