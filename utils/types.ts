// utils/types.ts
export type ImageFormat = 'avif' | 'webp' | 'jpg'

export interface ShopifyImageVariant {
  default: string
  '1.5x': string
  '2x': string
}

export interface ShopifyImageVariants {
  [format: string]: ShopifyImageVariant
}

export interface Money {
  amount: number | string
  currencyCode: string
}

export interface Image {
  width: number
  height: number
  altText: string
  // Regular URL field
  url?: string
  // Shopify transformed URLs
  webp?: string
  webp1_5x?: string
  webp2x?: string
  jpg?: string
  jpg1_5x?: string
  jpg2x?: string
  avif?: string
  avif1_5x?: string
  avif2x?: string
  // Legacy variants (keeping for backward compatibility)
  webp_small?: string
  webp_small_1_5x?: string
  webp_small_2x?: string
  jpg_small?: string
  jpg_small_1_5x?: string
  jpg_small_2x?: string
  webp_medium?: string
  webp_medium_1_5x?: string
  webp_medium_2x?: string
  jpg_medium?: string
  jpg_medium_1_5x?: string
  jpg_medium_2x?: string
  webp_large?: string
  webp_large_1_5x?: string
  webp_large_2x?: string
  jpg_large?: string
  jpg_large_1_5x?: string
  jpg_large_2x?: string
  webp_square?: string
  webp_square_1_5x?: string
  webp_square_2x?: string
  jpg_square?: string
  jpg_square_1_5x?: string
  jpg_square_2x?: string
  webp_tiny?: string
  webp_tiny_2x?: string
  jpg_tiny?: string
  jpg_tiny_2x?: string
}

// Rest of the types remain unchanged
export interface List<T> {
  nodes: T[]
}

export interface ProductPriceRange {
  minVariantPrice: Money
  maxVariantPrice: Money
}

export interface Product {
  id: string
  handle: string
  title: string
  tags?: string[]
  description: string
  descriptionHtml: string
  productType: string
  featuredImage: Image | null
  images?: List<Image>
  variants: List<ProductVariant>
  priceRange: ProductPriceRange
  createdAt: string
  normalizedSales?: number
}

export interface ProductVariant {
  id: string
  priceV2: Money
  compareAtPriceV2: Money | null
  title: string
  availableForSale: boolean
  image?: Image
  metafield?: {
    references?: List<{
      image: Image
    }>
  }
  videosMetafield?: {
    references: {
      nodes: Array<{
        id: string
        sources: Array<{
          format: string
          url: string
        }>
      }>
    }
  }
}

export interface OrderItem {
  title: string
  variant: string
  price: number
  quantity: number
}

export interface Address {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface OrderData {
  items: OrderItem[]
  address: Address
  subtotal: number
  shipping: number
  total: number
}

export interface BankDetailsProps {
  email?: string
  orderNumber: string
  amount: string
}

export const CHECKOUT_SESSION_KEY = 'checkout_data'
export const PAYMENT_METHOD_KEY = 'payment_method'

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type OrderStatus = 'pending_payment' | 'completed' | 'cancelled'

export interface Order {
  cartId: string
  createdAt: string
  status: OrderStatus
  formData?: CheckoutFormData // For bank transfer orders
  token?: string // For PayPal orders
  paymentDetails?: unknown // Captured PayPal payment details
}
