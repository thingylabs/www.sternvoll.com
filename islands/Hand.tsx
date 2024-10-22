import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

export function Hand() {
  const scrollPos = useSignal(0)
  const isTitleInView = useSignal(false)
  const scrollBaseline = useSignal(0)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isTitleInView.value = true
            // Set the baseline when the title comes into view
            scrollBaseline.value = globalThis.scrollY
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!isTitleInView.value) return

      const scrollTop = globalThis.scrollY - scrollBaseline.value
      const maxScroll = document.documentElement.clientHeight * 1.5
      const scrollPercentage = Math.min(scrollTop / maxScroll, 1)
      scrollPos.value = Math.max(scrollPercentage * 100, 0)
    }

    globalThis.addEventListener('scroll', handleScroll)
    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
    }
  }, [isTitleInView])

  const opacity = Math.min(scrollPos.value, 1)
  const translateY = Math.max(150 - scrollPos.value * 1.2, -30)

  return (
    <div class='relative h-[600px] flex flex-col justify-center items-center overflow-hidden font-accent'>
      {/* Title */}
      <div class='text-center w-full'>
        <h1
          ref={titleRef}
          class='text-8xl font-accent text-secondary-light absolute top-40 z-0 w-full text-center'
        >
          Kollektionen
        </h1>
      </div>

      {/* Animated Hand Image */}
      <div
        class='absolute z-10' // Absolute positioning
        style={{
          transform: `translateY(${translateY - 100}px)`,
          opacity: opacity,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      >
        <img
          src='hand.png'
          alt='Hand holding jewelry'
          class='w-auto max-w-[250px] h-auto object-contain' // Slightly smaller hand size
        />
      </div>

      {/* Description Text */}
      <div class='absolute bottom-10 text-center px-4 w-full max-w-3xl z-20'>
        <p class='text-lg font-serif text-gray-800 mt-5'>
          Entdecken Sie unsere Schmuckkollektionen, inspiriert von den Wundern
          der Natur, dem Glanz der Städte und den feinen Linien moderner Kunst.
        </p>
      </div>
    </div>
  )
}
