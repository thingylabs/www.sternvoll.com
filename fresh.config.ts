import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'
import prefetchPlugin, { Options } from 'prefetch'

const options: Options = {
  throttle: 4,
  strategy: 'opt-out',
  prerenderAndPrefetch: true,
}

declare module 'preact' {
  namespace JSX {
    interface DOMAttributes<Target extends EventTarget> {
      fetchpriority?: 'auto' | 'low' | 'high'
      imagesrcset?: string
    }
  }
}

export default defineConfig({
  plugins: [
    tailwind(),
    prefetchPlugin(options),
  ],
})
