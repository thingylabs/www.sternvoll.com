import { Handlers, PageProps } from '$fresh/server.ts'
import { graphql } from '@/utils/shopify.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { Header } from '../islands/Header.tsx'
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

      <div class='relative h-screen'>
        <Header /> {/* Header overlays the hero image */}

        {/* Hero Image */}
        <img
          src='/hero.jpg'
          alt='Hero Image'
          class='absolute inset-0 w-full h-full object-cover object-[95%]'
        />

        {/* Overlay Content */}
        <div class='absolute inset-0 flex flex-col justify-center items-start text-left px-8'>
          <br />
          <h1 class='text-white font-accent text-7xl sm:text-7xl leading-tight'>
            <br />
            Effortless chic,
          </h1>
          <p class='text-white mt-4 font-serif text-2xl sm:text-2xl italic pr-10'>
            alltäglich heißt nicht langweilig.
          </p>

          {/* Button */}
          <a
            href='#shop'
            class='mt-6 inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-gray-200'
          >
            JETZT SHOPPEN
          </a>
        </div>
      </div>

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
