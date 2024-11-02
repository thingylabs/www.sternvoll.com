import { Handlers, PageProps } from '$fresh/server.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { Header } from '../../islands/Header.tsx'
import ProductDetails from '@/islands/ProductDetails.tsx'
import { graphql } from '@/utils/shopify.ts'
import { Product } from '@/utils/types.ts'
import { SelectedWorks } from '@/components/SelectedWorks.tsx'

const q = `query ($product: String!) {
  product(handle: $product) {
    title
    description
    descriptionHtml
    productType
    tags

    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        priceV2 {
          amount
          currencyCode
        }
      }
    }

    featuredImage {
      url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
      width
      height
      altText
    }

    images(first: 10) {
      nodes {
        url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
        width
        height
        altText
      }
    }
  }
}`

const relatedProductsQuery = `query ($query: String!) {
  products(first: 4, query: $query) {
    edges {
      node {
        handle
        title
        featuredImage {
          url
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

interface Query {
  product: Product | null
  relatedProducts: Product[]
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    try {
      const data = await graphql<Query>(q, { product: ctx.params.product })
      if (!data.product) {
        return new Response('Product not found', { status: 404 })
      }

      // Format tags into a single query string
      const tags = data.product.tags ? data.product.tags.join(' ') : ''
      const relatedData = await graphql<
        { products: { edges: { node: Product }[] } }
      >(relatedProductsQuery, { query: tags })

      const relatedProducts = relatedData.products.edges.map((edge) =>
        edge.node
      )

      return ctx.render({ product: data.product, relatedProducts })
    } catch (error) {
      console.error('Error fetching product data:', error)
      return new Response('Error fetching product data', { status: 500 })
    }
  },
}

export default function ProductPage(ctx: PageProps<Query>) {
  const { data, url } = ctx

  if (!data.product) {
    return <div>Product not found</div>
  }

  const meta = {
    description: data.product.description,
    image: data.product.featuredImage?.url,
    title: data.product.title,
  }

  return (
    <div class='mt-24'>
      <Meta url={url} meta={meta} />
      <Header forceBackground />

      <div class='container mx-auto px-4'>
        <ProductDetails product={data.product!} />

        <div class='mt-16'>
          <SelectedWorks
            title='Related jewelry'
            products={data.relatedProducts}
          />
        </div>

        <div class='back-to-shop mt-12'>
          <a
            href='/'
            class='flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-200'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.65 3.35C4.92 3.08 5.36 3.08 5.64 3.35C5.91 3.62 5.91 4.07 5.64 4.34L2.69 7.28H15.28C15.67 7.28 16 7.6 16 8C16 8.4 15.67 8.72 15.28 8.72H2.69L5.64 11.67C5.91 11.94 5.91 12.38 5.64 12.66C5.36 12.92 4.92 12.92 4.65 12.66L0.35 8.35C0.16 8.16 0.16 7.84 0.35 7.65L4.65 3.35Z'
                fill='currentColor'
              />
            </svg>
            Back to shop
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
