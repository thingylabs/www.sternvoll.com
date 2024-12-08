// scripts/scale-image.ts
import { $ } from 'https://deno.land/x/dax@0.39.1/mod.ts'

if (Deno.args.length < 2) {
  console.log('Usage: <image_file> <width1> [width2] [width3]...')
  Deno.exit(1)
}

const inputFile = Deno.args[0]
const widths = Deno.args.slice(1).map(Number).sort((a, b) => b - a) // Sort descending

if (!await Deno.stat(inputFile).catch(() => false)) {
  console.log(`Error: File '${inputFile}' not found!`)
  Deno.exit(1)
}

const filename = await $`basename ${inputFile} | cut -d. -f1`.text()
const directory = await $`dirname ${inputFile}`.text()
const scaledDir = `${directory.trim()}/scaled`
await $`mkdir -p ${scaledDir}`

const dimensions = await $`identify -format "%w %h" ${inputFile}`.text()
const [sourceWidth, sourceHeight] = dimensions.split(' ').map(Number)
console.log(`Native image dimensions: ${sourceHeight} x ${sourceWidth}`)

const qualities: Record<'jpg' | 'webp' | 'avif', number> = {
  jpg: 85,
  webp: 90,
  avif: 65,
}

// Handle largest width with density variants
const [largestWidth, ...remainingWidths] = widths
const targetWidths = [
  ...([largestWidth, Math.ceil(largestWidth * 1.5), largestWidth * 2]
    .filter((width) => width <= sourceWidth)),
  ...remainingWidths,
]

for (const targetWidth of targetWidths) {
  const targetHeight = Math.ceil((targetWidth * sourceHeight) / sourceWidth)

  for (const format of ['webp', 'avif', 'jpg'] as const) {
    const output = `${scaledDir}/${filename.trim()}-${targetWidth}.${format}`
    try {
      await $`magick ${inputFile} -resize ${targetWidth}x${targetHeight} -quality ${
        qualities[format]
      } ${output}`
      console.log(`Generated: ${output} (${targetWidth}x${targetHeight}px)`)
    } catch {
      console.log(
        `Failed to generate ${format} format for width ${targetWidth}px`,
      )
    }
  }
}
