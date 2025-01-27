// routes/index.tsx
import { Handlers, PageProps } from '$fresh/server.ts'
import { graphql } from '@/utils/shopify.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { List, Product } from '@/utils/types.ts'
import { OurStory } from '@/components/OurStory.tsx'
import { SelectedWorks } from '@/components/SelectedWorks.tsx'
import { ImageCard } from '@/components/ImageCard.tsx'
import { Collections } from '@/islands/Collections.tsx'
import { CategoryCard } from '@/components/CategoryCard.tsx'
import { FillLetter } from '@/components/FillLetter.tsx'
import { Journal } from '@/components/Journal.tsx'
import { meta as siteMeta } from '@/config/meta.ts'
import { RouteConfig } from '$fresh/server.ts'
import { State } from '@/routes/_middleware.ts'
import type { TranslationKey } from '@/translations.ts'
import { VideoPlayer } from '@/islands/VideoPlayer.tsx'
import { homeQuery } from './_queries.ts'

export const config: RouteConfig = {
  routeOverride: '/{:lang}?',
}

interface Collection {
  collection: {
    products: List<Product>
  }
}

export const handler: Handlers<Collection, State> = {
  async GET(_req, ctx) {
    const data = await graphql<Collection>(homeQuery, {}, ctx.state.geo.lang)
    return ctx.render(data)
  },
}

export default function Home(ctx: PageProps<Collection, State>) {
  const { data, url, state } = ctx
  const products = data.collection.products.nodes
  const t = state.geo.getT()

  const meta = {
    ...siteMeta,
    description: t[siteMeta.shortDescription as TranslationKey],
    locale: state.geo.locale,
    lang: state.geo.lang,
    image: {
      url: siteMeta.ogImage.fileName,
      width: siteMeta.ogImage.width,
      height: siteMeta.ogImage.height,
      alt: siteMeta.ogImage.alt,
    },
  }

  return (
    <>
      <Meta url={url} meta={meta} />
      <div class='relative w-screen h-screen'>
        <VideoPlayer
          posterImage='hero-video-cover'
          hlsUrl='/videos/sternvoll-jewelry/master.m3u8'
          alt={t['Hero video showing jewelry collection']}
          class='absolute inset-0 w-full h-full object-cover'
          t={state.geo.getT([
            'Hero video showing jewelry collection',
            'Related jewelry',
          ])}
        />
      </div>

      <div class='pt-[12.5vw] 2xl:pt-[5vw]'>
        <OurStory t={t} />
      </div>

      <div class='px-4 pt-[2.5vw] 2xl:w-[80%] mx-auto'>
        <SelectedWorks products={products} showcase lang={state.geo.lang} />
      </div>

      <div class='py-4 px-4 md:px-0 pt-[10vw]'>
        <ImageCard
          image='collection-clip-ons.jpg'
          title={t['Gentle Touch - Pain-Free Clip-Ons']}
          text={t['Comfort and elegance, effortlessly united.']}
          linkTitle={t['DISCOVER CLIPS']}
          link='/collections/pain-free-clip-ons-earclips'
          orientation='left'
          backgroundColor='#EBE2DD'
        />
        <ImageCard
          image='collection-perfect-match.jpg'
          title={t['The perfect match for every occasion.']}
          text={t[
            'The carefully curated jewelry sets add the finishing touch to any wardrobe.'
          ]}
          linkTitle={t['DISCOVER SETS']}
          link='/collections/perfect-match-sets'
          orientation='right'
          backgroundColor='#E9F4F8'
        />
        <ImageCard
          image='collection-diamond-finishing.jpg'
          title={t['Sparkle like a diamond']}
          text={t[
            'The distinctive surface finish gives it an unmistakable shine.'
          ]}
          linkTitle={t['DISCOVER DIAMOND FINISH']}
          link='/collections/diamond-finishing'
          orientation='left'
          backgroundColor='#EBE2DD'
        />
        <ImageCard
          image='collection-heart-shaped.jpg'
          title={t['Unforgettable matters of the heart']}
          text={t[
            'A collection that captures love in timeless elegance and shining design.'
          ]}
          linkTitle={t['DISCOVER HEARTS']}
          link='/collections/heart-shaped-jewelry'
          orientation='right'
          backgroundColor='#E9F4F8'
        />
      </div>

      <div class='2xl:pt-[3vw]'>
        <Collections />
      </div>

      <div class='
          p-4 py-10 space-y-6
          md:space-y-0 md:grid md:grid-cols-2 md:gap-6
          lg:gap-8
          xl:grid-cols-4 xl:gap-8
          2xl:pt-[5vw]
          2xl:w-[80vw] mx-auto
        '>
        <CategoryCard
          backgroundImage='category-earrings.jpg'
          text={t['Earrings']}
          href='/collections/earrings'
        />
        <CategoryCard
          backgroundImage='category-rings.jpg'
          text={t['Rings']}
          href='/collections/rings'
        />
        <CategoryCard
          backgroundImage='category-necklaces.jpg'
          text={t['Necklaces']}
          href='/collections/necklaces'
        />
        <CategoryCard
          backgroundImage='category-clip-ons.jpg'
          text={t['Clip-ons']}
          href='/collections/pain-free-clip-ons-earclips'
        />
      </div>

      <FillLetter
        firstLine={t['Explore']}
        secondLine={t['Collections']}
        href='/collections/all'
      />

      <Journal
        date={t['2024 / April']}
        t={t}
      />

      <Footer meta={meta} t={t} />
    </>
  )
}
