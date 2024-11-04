import { AppProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { meta } from '@/config/meta.ts'

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>www.sternvoll.com</title>
        <link rel='stylesheet' href='/styles.css' />
        <link
          rel='preload'
          href='/sorts-mill-goudy-regular.woff2'
          as='font'
          type='font/woff2'
        />
        <link
          rel='preload'
          href='/sorts-mill-goudy-regular-italic.woff2'
          as='font'
          type='font/woff2'
        />
        <link
          rel='icon'
          type='image/png'
          href={'/' + meta.favicon['48x48']}
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href={'/' + meta.favicon.svg}
        />
        <link
          rel='shortcut icon'
          type='image/x-icon'
          href={'/' + meta.favicon.ico}
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={'/' + meta.favicon['180x180']}
        />
        {/* <link rel='manifest' href='/site.webmanifest' /> */}
      </Head>
      <Component />
    </>
  )
}
