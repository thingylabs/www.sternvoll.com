import { useEffect, useState } from 'preact/hooks'

const inset = {
  left: 65,
  right: 65,
}

export function OurStory() {
  const [scrollPos, setScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY
      const maxScroll = document.documentElement.clientHeight * 0.40
      const scrollPercentage = Math.min(scrollTop / maxScroll, 1)
      setScrollPos(scrollPercentage * 100)
    }

    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      class='relative h-[90vw] pt-[25vw] flex flex-col justify-center items-center overflow-hidden'
      style="font-family: 'Sorts Mill Goudy', serif;"
    >
      {/* Background Words */}
      <div class='absolute inset-0 flex justify-between items-center pointer-events-none text-[30vw] text-[#eee8e3]'>
        {/* Jewelry Text (Above) */}
        <span
          class={`absolute top-[5vw] select-none`}
          style={{
            transform: `translateX(${(-1 * (100 - scrollPos)) + inset.left}%)`,
          }}
        >
          Moderne
        </span>
        {/* Selection Text (Below) */}
        <span
          class={`absolute bottom-[2vw] select-none`}
          style={{ transform: `translateX(${100 - scrollPos - inset.right}%)` }}
        >
          Klassiker
        </span>
      </div>

      {/* Foreground Text */}
      <div class='text-center z-10'>
        <p class='text-[5vw]'>
          Im Herzen Stuttgarts kreiert Sternvoll<br />
          einzigartigen Schmuck, inspiriert von<br />
          kosmischer Schönheit.
        </p>
      </div>

      {/* Our Story Button */}
      <div class='mt-[2vw] flex justify-center cursor-pointer hover:scale-95 transition-transform duration-300'>
        <div class='text-[35vw] absolute leading-none z-10 text-white'>
          O
        </div>

        <div class='text-[3vw] mt-[8.5vw] flex flex-col z-20'>
          <span class='text-center'>
            OUR
          </span>
          <span class='text-center'>
            STORY
          </span>
        </div>
      </div>
    </div>
  )
}
