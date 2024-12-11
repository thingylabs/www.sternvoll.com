// islands/CartCleanup.tsx
import { useEffect } from 'preact/hooks'
import { removeFromCart, useCart } from '@/utils/data.ts'

export default function CartCleanup() {
  const { data: cartData } = useCart()

  useEffect(() => {
    if (cartData?.lines.nodes) {
      cartData.lines.nodes.forEach((line) => {
        removeFromCart(cartData.id, line.id)
      })
    }
  }, [cartData])

  return null
}
