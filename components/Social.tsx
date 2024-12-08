// components/Social.tsx
import { SocialIcons } from './SocialIcons.tsx'
import { meta } from '@/config/meta.ts'

export function Social() {
  const svgClass = ''

  return (
    <div class='flex space-x-3 md:space-x-12'>
      {Object.entries(meta.social)
        .filter(([_, url]) => url) // Only render valid URLs
        .map(([key, url]) => {
          const render = SocialIcons[key]
          return render ? render(url, svgClass) : null
        })}
    </div>
  )
}
