// components/CategoryCard.tsx
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

// components/CategoryCard.tsx
interface CategoryCardProps {
  backgroundImage: string
  text: string
  href: string
}

export function CategoryCard(
  { backgroundImage, text, href }: CategoryCardProps,
) {
  return (
    <a
      href={href}
      class='
        relative group w-full
        h-[120vw] sm:h-[90vw] md:h-[70vw] lg:h-[50vw] 2xl:h-[30vw]
        overflow-hidden flex justify-center items-center
        transition-all duration-800 ease-in-out
        pt-20
      '
    >
      {/* Background Image */}
      <ResponsiveImage
        src={backgroundImage}
        alt={text}
        class='absolute inset-0 w-full h-full object-cover z-0'
        width={420}
        height={576}
      />

      {/* Hover Overlay */}
      <div class='
        absolute inset-0 bg-[#002A3F] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out
      '>
      </div>

      {/* Main Text */}
      <div class='relative z-10'>
        <h1 class='text-6xl text-white font-accent transform translate-y-[40px] transition-transform duration-[800ms] ease-in-out group-hover:translate-y-[-40px]'>
          {text}
        </h1>
      </div>

      {/* Letter Background */}
      {/* Movement */}
      <div
        class='absolute text-[264px] font-accent leading-none text-white transform group-hover:translate-y-[-15px] transition-transform duration-[900ms] ease-out group-hover:delay-[500ms]'
        style={{
          transitionProperty: 'transform',
        }}
      >
        {/* Blur */}
        <span class='blur-lg group-hover:blur-none transition-[filter] duration-[700ms] ease-out group-hover:delay-[250ms]'>
          {/* Opacity */}
          <span class='opacity-0 group-hover:opacity-10 transition-opacity duration-[800ms] ease-out group-hover:delay-[250ms]'>
            {text.charAt(0)}
          </span>
        </span>
      </div>
    </a>
  )
}
