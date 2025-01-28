// scripts/create-hls.ts
import { $ } from 'zx'
import { basename, join } from 'https://deno.land/std@0.208.0/path/mod.ts'
import { parse } from 'https://deno.land/std@0.208.0/flags/mod.ts'

const flags = parse(Deno.args, {
  boolean: ['video', 'image'],
  default: { video: false, image: false },
})

const inputFile = flags._[0]
if (!inputFile) {
  console.error(
    'Usage: deno run -A create-hls.ts <input-video-file> [--video] [--image]',
  )
  console.error('Options:')
  console.error('  --video  Create HLS video streams (default: true)')
  console.error('  --image  Create image assets (default: true)')
  console.error('Example:')
  console.error('  deno run -A create-hls.ts input.mp4 --video')
  console.error('  deno run -A create-hls.ts input.mp4 --image')
  Deno.exit(1)
}

const filename = basename(String(inputFile), '.*')
const outputDir = join('static', 'videos', filename)
const posterDir = join('static', 'scaled')
const sizes = [1536, 1280, 1024, 768, 640]

$.verbose = false

await createDirectories()

if (flags.video) {
  console.log('Creating HLS video...')
  await processVideo()
}

if (flags.image) {
  console.log('Creating poster images...')
  await processImages()
  await cleanupTempFiles()
}

console.log('Done!')

async function processVideo() {
  const qualities = [
    { height: 1080, bitrate: '5000k', name: 'v2' },
    { height: 720, bitrate: '2800k', name: 'v1' },
    { height: 480, bitrate: '1400k', name: 'v0' },
  ]

  for (const quality of qualities) {
    const outputPath = join(outputDir, quality.name)
    const segmentPath = join(outputPath, 'segment_%03d.ts')
    const playlistPath = join(outputPath, 'playlist.m3u8')

    try {
      await $`ffmpeg -y -hide_banner -loglevel error \
        -i ${inputFile} \
        -vf scale=-2:${quality.height} \
        -c:v h264 -profile:v main -crf 20 -sc_threshold 0 \
        -g 48 -keyint_min 48 -r 24 \
        -b:v ${quality.bitrate} -maxrate ${quality.bitrate} -bufsize ${quality.bitrate} \
        -c:a aac -b:a 128k -ac 2 \
        -hls_time 4 \
        -hls_playlist_type vod \
        -hls_segment_filename ${segmentPath} \
        ${playlistPath}`
    } catch (e) {
      const err = e as Error
      console.error(`Failed to create ${quality.height}p stream:`, err.message)
    }
  }

  const masterPlaylist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
v2/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
v1/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=854x480
v0/playlist.m3u8`

  await Deno.writeTextFile(join(outputDir, 'master.m3u8'), masterPlaylist)
}

async function processImages() {
  const tempPoster = join(posterDir, `${filename}-poster.png`)

  try {
    // Extract first frame and apply Gaussian blur
    await $`ffmpeg -y -hide_banner -loglevel error \
    -i ${inputFile} \
    -vf "select='eq(n\\,0)',scale=-2:1080,crop=1080*9/16:1080:in_w/2-out_w/2:0,gblur=sigma=2" \
    -vframes 1 \
    ${tempPoster}`
  } catch (e) {
    const err = e as Error
    console.error('Failed to create poster:', err.message)
    return
  }

  console.log('Creating JPEGs...')
  for (const size of sizes) {
    const height = Math.round(size * (9 / 16))
    const jpgPath = join(posterDir, `hero-video-cover-${size}.jpg`)
    try {
      await $`ffmpeg -y -hide_banner -loglevel error \
        -i ${tempPoster} \
        -vf "scale=${size}:${height},setsar=1:1" \
        ${jpgPath}`
    } catch (e) {
      const err = e as Error
      console.error(`Failed to create ${size}px JPEG:`, err.message)
    }
  }

  console.log('Creating WebPs...')
  for (const size of sizes) {
    const jpgPath = join(posterDir, `hero-video-cover-${size}.jpg`)
    const webpPath = join(posterDir, `hero-video-cover-${size}.webp`)
    try {
      await $`cwebp -quiet ${jpgPath} -o ${webpPath}`
    } catch (e) {
      const err = e as Error
      console.error(`WebP conversion failed for ${size}px:`, err.message)
    }
  }

  console.log('Creating AVIFs...')
  for (const size of sizes) {
    const jpgPath = join(posterDir, `hero-video-cover-${size}.jpg`)
    const avifPath = join(posterDir, `hero-video-cover-${size}.avif`)
    try {
      await $`avifenc -q 40 ${jpgPath} ${avifPath} > /dev/null 2>&1`
    } catch (e) {
      const err = e as Error
      console.error(`AVIF conversion failed for ${size}px:`, err.message)
    }
  }
}

async function createDirectories() {
  if (flags.video) {
    for (let i = 0; i < 3; i++) {
      await Deno.mkdir(join(outputDir, `v${i}`), { recursive: true })
    }
  }
  if (flags.image) {
    await Deno.mkdir(posterDir, { recursive: true })
  }
}

async function cleanupTempFiles() {
  try {
    await Deno.remove(join(posterDir, `${filename}-poster.png`))
  } catch (e) {
    const err = e as Error
    console.error('Failed to cleanup temp files:', err.message)
  }
}
