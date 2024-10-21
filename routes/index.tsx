import { Handlers, PageProps } from '$fresh/server.ts'
import { graphql } from '@/utils/shopify.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { Header } from '@/components/Header.tsx'
import { List, Product } from '../utils/types.ts'
import { OurStory } from '../islands/OurStory.tsx'
import { ProductCard } from '@/components/ProductCard.tsx'

const q = `{
  collection(id: "gid://shopify/Collection/534705242378") {
    products(first: 8) {
      nodes {
        id
        handle
        title
        tags
        featuredImage {
          url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
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

interface Collection {
  collection: {
    products: List<Product>
  }
}

export const handler: Handlers<Collection> = {
  async GET(_req, ctx) {
    const data = await graphql<Collection>(q)
    return ctx.render(data)
  },
}

export default function Home(ctx: PageProps<Collection>) {
  const { data, url } = ctx
  const products = data.collection.products.nodes

  const meta = {
    description: 'Shop for Deno Merch',
    image: 'og-image.png',
    title: 'Deno Merch',
  }

  return (
    <div>
      <Meta
        url={url}
        meta={meta}
      />
      <Header />

      <OurStory />

      <section class='p-4 mt-10 py-10 bg-white'>
        <h2 class='text-2xl font-accent'>
          Selected works:
        </h2>
        <div class='grid grid-cols-1 gap-8'>
          {products.map((product) => <ProductCard product={product} />)}
        </div>
      </section>

      <Footer />
    </div>
  )
}
