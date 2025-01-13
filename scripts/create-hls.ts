// scripts/create-hls.ts
import { $ } from 'zx'
import { basename, join } from 'https://deno.land/std@0.208.0/path/mod.ts'

const inputFile = Deno.args[0]
if (!inputFile) {
  console.error('Usage: deno run -A create-hls.ts <input-video-file>')
  Deno.exit(1)
}

const filename = basename(inputFile, '.*')
const outputDir = join('static', 'videos', filename)
const posterDir = join('static', 'scaled')
// Include iPhone Pro Max width (430px) and other common mobile sizes
const sizes = [1280, 1024, 768, 640, 480, 430, 390, 360]

$.verbose = false

await createDirectories()
await processImages()
await cleanupTempFiles()
console.log('Done!')

async function processImages() {
  const tempPoster = join(posterDir, `${filename}-poster.png`)

  try {
    await $`ffmpeg -y -hide_banner -loglevel error -i ${inputFile} -ss 00:00:01.000 -vframes 1 -vf "scale=-1:932,crop=430:932:0:0" "${tempPoster}"`
  } catch (e) {
    const err = e as Error
    console.error('Failed to create poster:', err.message)
    return
  }

  console.log('Creating JPEGs...')
  for (const size of sizes) {
    const height = Math.round(size * (932 / 430)) // Match iPhone 14 Pro Max aspect ratio
    const jpgPath = join(posterDir, `hero-video-cover-${size}.jpg`)
    try {
      await $`ffmpeg -y -hide_banner -loglevel error -i "${tempPoster}" -vf "scale=${size}:${height}" "${jpgPath}"`
    } catch (e) {
      const err = e as Error
      console.error(`Failed to create ${size}px JPEG:`, err.message)
    }
  }

  console.log('Creating WebPs...')
  for (const size of sizes) {
    const jpgPath = join(posterDir, `hero-video-cover-${size}.jpg`)
    try {
      await $`cwebp -quiet "${jpgPath}" -o "${
        join(posterDir, `hero-video-cover-${size}.webp`)
      }"`
    } catch (e) {
      const err = e as Error
      console.error(`WebP conversion failed for ${size}px:`, err.message)
    }
  }

  console.log('Creating AVIFs...')
  for (const size of sizes) {
    const jpgPath = join(posterDir, `hero-video-cover-${size}.jpg`)
    try {
      await $`avifenc -q 40 "${jpgPath}" "${
        join(posterDir, `hero-video-cover-${size}.avif`)
      }" > /dev/null 2>&1`
    } catch (e) {
      const err = e as Error
      console.error(`AVIF conversion failed for ${size}px:`, err.message)
    }
  }
}

async function createDirectories() {
  for (let i = 0; i < 3; i++) {
    await Deno.mkdir(join(outputDir, `v${i}`), { recursive: true })
  }
  await Deno.mkdir(posterDir, { recursive: true })
}

async function cleanupTempFiles() {
  try {
    await Deno.remove(join(posterDir, `${filename}-poster.png`))
  } catch (e) {
    const err = e as Error
    console.error('Failed to cleanup temp files:', err.message)
  }
}
