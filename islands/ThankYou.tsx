// islands/ThankYou.tsx
import { useEffect, useRef } from 'preact/hooks'

export const ThankYou = ({ children }: { children: JSX.Element }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createRocket = () => {
      const rocket = document.createElement('div')
      rocket.innerHTML = '✨'
      rocket.className = 'absolute text-4xl opacity-0 transform -rotate-45'
      rocket.style.left = `${Math.random() * 100}%`
      rocket.style.bottom = '-50px'
      containerRef.current?.appendChild(rocket)
      return rocket
    }

    const animateRocket = (rocket: HTMLElement) => {
      const distance = containerRef.current!.clientHeight + 100
      const duration = 2000 + Math.random() * 1000
      const angle = Math.random() * 60 - 30

      rocket.style.transition =
        `transform ${duration}ms linear, opacity ${duration}ms linear`
      rocket.style.transform = `translate(${
        Math.tan(angle * (Math.PI / 180)) * distance
      }px, -${distance}px) rotate(${angle}deg)`
      rocket.style.opacity = '1'

      setTimeout(() => {
        containerRef.current?.removeChild(rocket)
      }, duration)
    }

    const launchRockets = () => {
      const rocket = createRocket()
      animateRocket(rocket)
    }

    let lastLaunchTime = 0
    const fps = 30
    const frameDuration = 1000 / fps

    const launchRocketsWithRAF = (currentTime: number) => {
      if (currentTime - lastLaunchTime >= 1000) {
        launchRockets()
        lastLaunchTime = currentTime
      }

      setTimeout(() => {
        requestAnimationFrame(launchRocketsWithRAF)
      }, frameDuration)
    }

    requestAnimationFrame(launchRocketsWithRAF)

    return () => {
      // No cleanup needed
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='relative prose max-w-none my-6 mb-8 border border-[#00ff00] bg-gray-50 rounded-md p-4 shadow-sm  overflow-hidden'
    >
      {children}
    </div>
  )
}
