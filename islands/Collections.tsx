import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

const inset = {
  yStart: 300,
  yEnd: -150,
}

export function Collections() {
  const scrollPos = useSignal(0)
  const isInView = useSignal(false)
  const fadeIn = useSignal(false)
  const handRef = useRef<HTMLDivElement>(null)
  const startY = useSignal(0)
  const endY = useSignal(0)
  const hasFadedIn = useSignal(false)

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
    fadeIn.value = true

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView.value = true
            const rect = handRef.current?.getBoundingClientRect()
            if (rect) {
              startY.value = rect.top + globalThis.scrollY -
                globalThis.innerHeight
              endY.value = rect.bottom + globalThis.scrollY
            }
          } else {
            isInView.value = false
          }

          updateScrollPos()
        })
      },
      { threshold: 0 },
    )

    if (handRef.current) {
      observer.observe(handRef.current)
    }

    return () => {
      if (handRef.current) {
        observer.unobserve(handRef.current)
      }
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

  const translateY = interpolate(inset.yStart, inset.yEnd, scrollPos.value)
  const scrollOpacity = interpolate(0, 1, scrollPos.value)

  const opacity = fadeIn.value ? scrollOpacity : 0
  const transition = !hasFadedIn.value ? 'opacity 0.8s ease-in' : 'none'

  return (
    <div
      ref={handRef}
      class='relative min-h-[700px] h-[70vw] flex flex-col justify-center items-center overflow-hidden font-accent'
    >
      <div class='text-center w-full'>
        <h1
          class={`
        text-5xl font-accent text-secondary-light absolute top-40 z-0 w-full text-center
        md:text-[120px] xl:text-[11vw]
        `}
        >
          Kollektionen
        </h1>
      </div>

      {/* Hand Image */}
      <div
        class='absolute z-10'
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          transition,
        }}
        onTransitionEnd={() => {
          // Disable transition after first fade-in
          hasFadedIn.value = true
        }}
      >
        <img
          src='/hand.png'
          alt='Hand holding jewelry'
          class='w-auto max-w-[40vw] h-auto object-contain xl:max-w-[60vw] 2xl:w-[20vw]'
        />
      </div>

      <div class='absolute bottom-10 text-center px-4 z-20 xl:pt-[10vw]'>
        <p class='text-2xl font-accent mt-5 md:text-3xl md:leading-relaxed xl:text-[3vw] xl:w-[80vw] x:mx-auto'>
          Entdecken Sie unsere Schmuckkollektionen, inspiriert von den Wundern
          der Natur, dem Glanz der Städte und den feinen Linien moderner Kunst.
        </p>
      </div>
    </div>
  )
}
