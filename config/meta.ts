export const meta = {
  title: 'Sternvoll Jewelry',
  logos: {
    default: 'Sternvoll-bright.png',
    square: 'Sternvoll-star.png',
  },
  favicon: {
    ico: 'favicon.ico',
    svg: 'favicon.svg',
    '48x48': 'favicon-48x48.png',
    '180x180': 'favicon-180x180.png',
    '192x192': 'favicon-192x192.png',
    '512x512': 'favicon-512x512.png',
  },
  ogImage: { // TODO
    fileName: 'og-image.jpg',
    width: 0,
    height: 0,
    alt: '...',
  },
  coverImage: '', // TODO: what for?
  slogan: // <80 chars
    "𝗘𝗳𝗳𝗼𝗿𝘁𝗹𝗲𝘀𝘀 𝗰𝗵𝗶𝗰, everyday doesn't mean boring!",
  shortDescription: // <150 chars
    "Everyday doesn't mean boring! Discover luxurious 18K gold and lab-grown diamond jewelry that combines timeless elegance with modern style.",
  social: {
    facebook: 'https://www.facebook.com/sternvoll/',
    instagram: 'https://www.instagram.com/sternvolljewelry',
    threads: 'https://www.threads.net/@sternvolljewelry',
    googleMaps: 'https://maps.app.goo.gl/Ne43ScnmJ6rE3LrE9',
    youtube: 'https://www.youtube.com/@sternvolljewelry',
    tiktok: 'https://www.tiktok.com/@sternvoll',
    x: 'https://x.com/sternvoll_com',
    pinterest: 'https://www.pinterest.de/sternvolljewelry/',
    mastodon: 'https://mastodon.social/@sternvoll/',
    bluesky: 'https://bsky.app/profile/sternvoll.bsky.social',
    linkedin: 'https://www.linkedin.com/company/sternvoll/',
  },
}
export type Meta = typeof meta

// Create a type that allows for a subset of the Meta type
export type PartialMeta = Partial<Meta>
