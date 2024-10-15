export interface Money {
  amount: number
  currencyCode: string
}

export interface Image {
  url: string
  width: number
  height: number
  altText: string | null
}

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
  description: string
  descriptionHtml: string
  productType: string
  featuredImage: Image | null
  images?: List<Image>
  variants: List<ProductVariant>
  priceRange: ProductPriceRange
}

export interface ProductVariant {
  id: string
  priceV2: Money
  title: string
  availableForSale: boolean
}

export interface CartLineItem {
  id: string
  quantity: number
  merchandise: {
    product: Product
    title: string
    image: Image
  }
  estimatedCost: {
    totalAmount: Money
  }
}

export interface CartData {
  id: string
  lines: List<CartLineItem>
  checkoutUrl: string
  estimatedCost: {
    totalAmount: Money
  }
}
