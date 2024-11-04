import { Handlers, PageProps } from '$fresh/server.ts'
import { Header } from '@/islands/Header.tsx'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { CollectionContent } from '@/islands/CollectionContent.tsx'
import { graphql } from '@/utils/shopify.ts'
import { Product } from '@/utils/types.ts'

interface CollectionQuery {
  collectionByHandle: {
    title: string
    products: {
      edges: { node: Product & { normalizedSales: number } }[]
    }
  }
}

const collectionQuery = `query ($collection: String!) {
  collectionByHandle(handle: $collection) {
    title
    products(first: 24, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            nodes {
              availableForSale
            }
          }
        }
      }
    }
  }
}`

export const handler: Handlers<CollectionQuery> = {
  async GET(_req, ctx) {
    const { collection } = ctx.params

    try {
      const data = await graphql<CollectionQuery>(collectionQuery, {
        collection,
      })

      if (!data.collectionByHandle) {
        return new Response('Collection not found', { status: 404 })
      }

      // Use product order to assign a normalized sales value
      const products = data.collectionByHandle.products.edges.map((edge) =>
        edge.node
      )
      const totalProducts = products.length

      const normalizedProducts = products.map((product, index) => {
        // Normalize sales based on position: first product gets 1, last gets 0
        const normalizedSales = (totalProducts - index - 1) /
          (totalProducts - 1)
        return {
          ...product,
          normalizedSales: totalProducts === 1 ? 1 : normalizedSales,
        }
      })

      return ctx.render({
        collectionByHandle: {
          ...data.collectionByHandle,
          products: { edges: normalizedProducts.map((node) => ({ node })) },
        },
      })
    } catch (error) {
      console.error('Error fetching collection:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
}

export default function CollectionPage(
  { data, url }: PageProps<CollectionQuery>,
) {
  const { collectionByHandle: collection } = data
  const products = collection.products.edges.map((edge) => edge.node)

  // Prepare image for the Meta component
  const firstProductImage = products[0]?.featuredImage

  return (
    <>
      <Meta
        url={url}
        meta={{
          title: `${collection.title} - Shop`,
          description: `Browse our ${collection.title} collection`,
          locale: 'en-US',
          image: firstProductImage
            ? {
              url: firstProductImage.url,
              width: firstProductImage.width,
              height: firstProductImage.height,
              alt: firstProductImage.altText || '',
            }
            : undefined,
        }}
      />
      <Header forceBackground />
      <main class='max-w-7xl mx-auto p-4 pt-[10vw]'>
        <h1 class='text-3xl md:text-5xl font-bold mb-6'>{collection.title}</h1>
        {/* CollectionContent Island Component */}
        <CollectionContent products={products} title={collection.title} />
      </main>
      <Footer />
    </>
  )
}
