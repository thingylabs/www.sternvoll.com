// routes/_app.tsx
import { PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { meta } from '@/config/meta.ts'
import { TranslationKey } from '@/translations.ts'
import { State } from '@/routes/_middleware.ts'
import { asset } from '$fresh/runtime.ts'
import { ImageFormat } from '@/utils/types.ts'
import {
  Header,
  translationKeys as headerTranslationKeys,
} from '@/islands/Header.tsx'

export default function App(
  { Component, state, url }: PageProps<unknown, State>,
) {
  const getT = state.geo?.getT
  const t = state.geo?.getT()
  const imageFormat = state.imageFormat

  const headerForceBackground = url.pathname !== '/' && url.pathname !== '/de'

  return (
    <>
      <Head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        {url.hostname.startsWith('dev') && (
          <>
            <meta name='robots' content='noindex, nofollow' />
            <link
              rel='canonical'
              href={`https://www.sternvoll.com${url.pathname}`}
            />
          </>
        )}

        <title>{t[meta.title as TranslationKey]}</title>
        <link rel='stylesheet' href={asset('/styles.css')} />
        <link
          rel='preload'
          href='/sorts-mill-goudy-regular.woff2'
          as='font'
          type='font/woff2'
          crossorigin='anonymous'
        />
        <link
          rel='preload'
          href='/sorts-mill-goudy-italic.woff2'
          as='font'
          type='font/woff2'
          crossorigin='anonymous'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='48x48'
          href='/scaled/logo-48x48.png'
        />
        <link rel='icon' type='image/svg+xml' href='/logo.svg' />
        <link
          rel='shortcut icon'
          type='image/x-icon'
          href='/favicon.ico'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/scaled/logo-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/scaled/logo-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/scaled/logo-512x512.png'
        />

        {url.pathname === '/' || url.pathname === '/de' && (
              <>
                <PreloadImage
                  src='hero.jpg'
                  width={1024}
                  format={imageFormat}
                />
              </>
            )}

        {/* <link rel='manifest' href={asset('/site.webmanifest')} /> */}
      </Head>

      <Header
        t={getT(headerTranslationKeys)}
        lang={state.geo.lang}
        locale={state.geo.locale}
        href={url.href}
        forceBackground={headerForceBackground}
        comfortCheckout={state.comfortCheckout}
      />
      <Component />
    </>
  )
}

type PreloadImageProps = {
  src: string
  width: number
  resolutionVariants?: ('1.5x' | '2x')[]
  format: ImageFormat
}

export const PreloadImage = (
  { src, width, resolutionVariants = ['1.5x', '2x'], format }:
    PreloadImageProps,
) => {
  const nameOnly = src.split('.')[0]

  const srcSet = [
    `${asset(`/scaled/${nameOnly}.${format}`)} ${width}w`,
    ...resolutionVariants.map((res) =>
      `${asset(`/scaled/${nameOnly}@${res}.${format}`)} ${res}`
    ),
  ].join(',\n            ')

  const mimeTypes = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpg: 'image/jpeg',
  }

  return (
    <link
      rel='preload'
      as='image'
      crossOrigin='anonymous'
      type={mimeTypes[format]}
      imagesrcset={srcSet}
      sizes={`${width}px`}
      fetchpriority='high'
      decoding='sync'
      loading='eager'
    />
  )
}
