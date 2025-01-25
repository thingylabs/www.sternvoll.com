// routes/[[lang]]/products/_queries.ts
import { srcset } from '@/utils/shopifySrcset.ts'

export const productQuery = `query Product($product: String!) {
  product(handle: $product) {
    title
    description
    descriptionHtml
    productType
    tags

    options {
      id
      name
      values
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

    variants(first: 250) {
      nodes {
        id
        title
        selectedOptions {
          name
          value
        }
        availableForSale
        priceV2 {
          amount
          currencyCode
        }
      }
    }

    featuredImage {
      ${srcset('square', 400, 400)}
      altText
    }

    images(first: 10) {
      nodes {
        ${srcset('square', 400, 400)}
        altText
      }
    }
  }
}`

export const relatedProductsQuery = `query RelatedProducts($query: String!) {
  products(first: 4, query: $query) {
    edges {
      node {
        handle
        title
        featuredImage {
          ${srcset('square', 400, 400)}
          altText
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
