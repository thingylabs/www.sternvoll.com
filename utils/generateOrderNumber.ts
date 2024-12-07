// utils/generateOrderNumber.ts
import { dateString } from './dateString.ts'

export function generateOrderNumber(cartId: string): string {
  // Extract last 4 digits from cart ID, ignoring non-digits
  return dateString + '-' + cartId.replace(/\D/g, '').slice(-4)
}
