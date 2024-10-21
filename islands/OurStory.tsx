import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

const inset = {
  left: {
    start: 65,
    end: 30,
  },
  right: {
    start: 65,
    end: -30,
  },
}

export function OurStory() {
  const scrollPos = useSignal(0)
  const hovered = useSignal(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY
      const maxScroll = document.documentElement.clientHeight * 2
      const scrollPercentage = Math.min(scrollTop / maxScroll, 1)
      scrollPos.value = scrollPercentage * 100
    }

    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div class='relative h-[90vw] pt-[25vw] flex flex-col justify-center items-center overflow-hidden font-accent'>
      {/* Background Words */}
      <div class='absolute inset-0 flex justify-between items-center pointer-events-none text-[30vw] text-[#eee8e3]'>
        {/* Jewelry Text (Above) */}
        <span
          class={`absolute top-[5vw] select-none`}
          style={{
            transform: `translateX(${
              Math.min(
                (-1 * (100 - scrollPos.value)) + inset.left.start,
                inset.left.end,
              )
            }%)`,
          }}
        >
          Moderne
        </span>
        {/* Selection Text (Below) */}
        <span
          class={`absolute bottom-0 select-none`}
          style={{
            transform: `translateX(${
              Math.max(
                100 - scrollPos.value - inset.right.start,
                inset.right.end,
              )
            }%)`,
          }}
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
      <div
        class='mt-[5vw] flex justify-center cursor-pointer hover:scale-95 transition-transform duration-300'
        onMouseEnter={() => hovered.value = true} // Update hover signal
        onMouseLeave={() => hovered.value = false} // Reset hover signal
      >
        <span
          class='text-[35vw] absolute leading-none z-10 text-white'
          style={{
            backgroundImage: 'linear-gradient(to top, #CB9274 50%, white 50%)',
            backgroundSize: '100% 200%',
            backgroundPosition: hovered.value ? '0% 100%' : '0% 0%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            transition: 'background-position 1s ease',
          }}
        >
          O
        </span>
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
