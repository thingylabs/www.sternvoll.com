// routes/_app.tsx
import { PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { meta } from '@/config/meta.ts'
import { TranslationKey } from '@/translations.ts'
import { State } from '@/routes/_middleware.ts'
import { asset } from '$fresh/runtime.ts'
import { PreloadImage } from '@/components/PreloadImage.tsx'
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
                  src='sternvoll-name-bright.png'
                  widths={[275, 324, 413, 486, 550, 648]}
                  format={imageFormat}
                />
                <PreloadImage
                  src='hero-video-cover.jpg'
                  widths={[1536, 1280, 1024, 768, 640]}
                  format={imageFormat}
                />
              </>
            )}

        {/* <link rel='manifest' href={asset('/site.webmanifest')} /> */}

        <script defer data-domain='sternvoll.com' src='/js/script.js'></script>
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
