import { Head } from '$fresh/runtime.ts'
import { meta as siteMeta } from '@/config/meta.ts'

export type HeadProps = {
  url: URL
  meta: {
    title: string
    description: string
    locale: string
    image?: {
      url: string
      width: number
      height: number
      alt: string
    }
    price?: number | string
    currency?: string
  }
}

/**
TODO: Here are some other tips for OG images:
- Use an aspect ratio of 1.91:1, which means the width should be 1.9 times the height.
- Keep the file size under 8 MB.
- Use a high-quality image.
- Use a text overlay, but keep the words to a minimum.
*/

export function Meta(
  { url, meta: { title, description, image, price, currency, locale } }:
    HeadProps,
) {
  return (
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' sizes='32x32' />
      <meta name='description' content={description} />
      <link rel='canonical' href={url.href} />

      {
        /* TODO
      <link rel="alternate" hreflang="x-default" href={url.href} />
      <link rel="alternate" hreflang="en-DE" href="..." />
      <link rel="alternate" hreflang="de-DE" href="..." />
      <link rel="alternate" type="application/json+oembed" href="https://www.sternvoll.com/de/products/cuban-chain-armband-18k-gold-princess-cut-diamant-in-fassung.oembed" />
        */
      }

      {/* OpenGraph */}
      <meta property='og:site_name' content={siteMeta.title} />
      <meta property='og:locale' content={locale} />
      {price && <meta property='og:price:amount' content={'' + price} />}
      {currency && <meta property='og:price:currency' content={currency} />}
      {image && (
        <>
          <meta
            property='og:image:secure_url'
            content={`${url}/${image!.url}`}
          />
          <meta property='og:image:width' content={'' + image!.width} />
          <meta property='og:image:height' content={'' + image!.height} />
        </>
      )}

      {/* Facebook Meta Tags */}
      <meta property='og:url' content={url.href} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {image && <meta property='og:image' content={`${url}/${image}`} />}

      {/* Twitter Meta Tags */}
      <meta name='twitter:site' content={siteMeta.social.x} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {image && (
        <>
          <meta name='twitter:image' content={`${url}/${image}`} />
          <meta name='twitter:image:alt' content={image!.alt} />
        </>
      )}
    </Head>
  )
}
