// routes/queries.ts
import { srcset } from '@/utils/shopifySrcset.ts'

export const homeQuery = `{
  collection(id: "gid://shopify/Collection/534705242378") {
    products(first: 4) {
      nodes {
        id
        handle
        title
        tags
        featuredImage {
          altText
          ${srcset('square', 400, 400)}
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`
