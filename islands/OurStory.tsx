import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

const inset = {
  left: {
    start: -30,
    end: 30,
  },
  right: {
    start: 30,
    end: -40,
  },
}

export function OurStory() {
  const scrollPos = useSignal(0)
  const hovered = useSignal(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useSignal(false)
  const startY = useSignal(0)
  const endY = useSignal(0)

  const updateScrollPos = () => {
    const currentScroll = globalThis.scrollY
    const maxScroll = endY.value - startY.value

    if (
      currentScroll >= startY.value - globalThis.innerHeight &&
      currentScroll <= endY.value
    ) {
      const progress =
        (currentScroll - (startY.value - globalThis.innerHeight)) /
        (maxScroll + globalThis.innerHeight)
      scrollPos.value = Math.min(Math.max(progress * 100, 0), 100)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView.value = entry.isIntersecting
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            startY.value = rect.top + globalThis.scrollY
            endY.value = rect.bottom + globalThis.scrollY
          }

          updateScrollPos()
        })
      },
      { threshold: 0 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!isInView.value) return
      updateScrollPos()
    }

    globalThis.addEventListener('scroll', handleScroll)

    updateScrollPos()

    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
    }
  }, [isInView])

  const interpolate = (start: number, end: number, progress: number) => {
    return start + (end - start) * (progress / 100)
  }

  const opacity = scrollPos.value === 0 ? 0 : 1 // Fade in as soon as scroll starts

  return (
    <section
      ref={sectionRef}
      class='relative h-[90vw] pt-[25vw] flex flex-col justify-center items-center overflow-hidden font-accent'
    >
      <div class='absolute inset-0 flex justify-between items-center pointer-events-none text-[30vw] text-[#eee8e3]'>
        {/* Left Element (Top - Starts from left, moves to right) */}
        <span
          class={`absolute top-[5vw] select-none transition-opacity duration-700 ease-out`}
          style={{
            transform: `translateX(${
              interpolate(inset.left.start, inset.left.end, scrollPos.value)
            }%)`,
            opacity: opacity, // Fade-in effect
            transition: 'opacity 0.7s ease-in-out', // Initial fade-in effect
          }}
        >
          Moderne
        </span>
        {/* Right Element (Bottom - Starts from right, moves to left) */}
        <span
          class={`absolute bottom-0 select-none transition-opacity duration-700 ease-out`}
          style={{
            transform: `translateX(${
              interpolate(inset.right.start, inset.right.end, scrollPos.value)
            }%)`,
            opacity: opacity, // Fade-in effect
            transition: 'opacity 0.7s ease-in-out', // Initial fade-in effect
          }}
        >
          Klassiker
        </span>
      </div>

      <div class='text-center z-10'>
        <p class='text-[5vw]'>
          Im Herzen Stuttgarts kreiert Sternvoll<br />
          einzigartigen Schmuck, inspiriert von<br />
          kosmischer Schönheit.
        </p>
      </div>

      <div
        class='mt-[5vw] flex justify-center cursor-pointer hover:scale-95 transition-transform duration-300'
        onMouseEnter={() => (hovered.value = true)}
        onMouseLeave={() => (hovered.value = false)}
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
          <span class='text-center'>OUR</span>
          <span class='text-center'>STORY</span>
        </div>
      </div>
    </section>
  )
}
