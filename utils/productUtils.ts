// utils/productUtils.ts
export function mapColorToClass(title: string) {
  switch (title.toLowerCase()) {
    case 'white':
      return 'bg-white'
    case 'black':
      return 'bg-black'
    case 'grey':
      return 'bg-gray-500'
    case 'blue':
      return 'bg-blue-500'
    default:
      return 'bg-gray-300' // Fallback color
  }
}

export function parseDescription(descriptionHtml: string) {
  if (!descriptionHtml) return []
  const paragraphs = descriptionHtml
    .split('</p>')
    .map((p) => p.replace(/<[^>]+>/g, '').trim()) // Remove HTML tags
    .filter((p) => p)
  return paragraphs.slice(1).map((para) => {
    const [title, ...rest] = para.split(':')
    return { title: title?.trim(), content: rest.join(':').trim() }
  })
}
