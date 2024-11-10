export interface Money {
  amount: number | string
  currencyCode: string
}

export interface Image {
  url: string
  width: number
  height: number
  altText: string
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
  title: string
  availableForSale: boolean
}
