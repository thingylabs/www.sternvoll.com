import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { JSX } from 'preact'

interface MovingTextProps {
  firstLine: string
  secondLine: string
  inset: {
    top: {
      xStart: number
      xEnd: number
      top?: string
    }
    bottom: {
      xStart: number
      xEnd: number
      bottom?: string
    }
  }
  fontSize?: string
  color?: string
  children?: JSX.Element | JSX.Element[]
}

export function MovingText(
  { firstLine, secondLine, inset, fontSize, color, children }: MovingTextProps,
) {
  const scrollPos = useSignal(0)
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

  const opacity = scrollPos.value === 0 ? 0 : 1

  return (
    <div
      ref={sectionRef}
      class='relative flex flex-col justify-center items-center overflow-hidden font-accent h-full'
    >
      <div
        class='absolute inset-0 flex justify-between items-center pointer-events-none whitespace-nowrap'
        style={{
          ...(fontSize && { fontSize }),
          ...(color && { color }),
        }}
      >
        {/* Left Element (Top - Starts from left, moves to right) */}
        <span
          class='absolute select-none transition-opacity duration-700 ease-out'
          style={{
            transform: `translateX(${
              interpolate(
                inset.top.xStart,
                inset.top.xEnd,
                scrollPos.value,
              )
            }%)`,
            opacity: opacity,
            transition: 'opacity 0.7s ease-in-out',
            top: inset.top.top ?? 0,
          }}
        >
          {firstLine}
        </span>
        {/* Right Element (Bottom - Starts from right, moves to left) */}
        <span
          class='absolute select-none transition-opacity duration-700 ease-out'
          style={{
            transform: `translateX(${
              interpolate(
                inset.bottom.xStart,
                inset.bottom.xEnd,
                scrollPos.value,
              )
            }%)`,
            opacity,
            transition: 'opacity 0.7s ease-in-out',
            bottom: inset.bottom.bottom ?? 0,
          }}
        >
          {secondLine}
        </span>
      </div>

      {/* Render the children inside the section */}
      <div
        class='relative z-10 h-full w-full'
        style={{
          opacity: opacity,
          transition: 'opacity 0.7s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}
