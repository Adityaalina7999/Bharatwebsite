import React, { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0)

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight
    const percent = (scrollTop / windowHeight) * 100
    setScrollPercent(percent)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Vertical Scrollbar */}
      <div className="fixed left-[43px] top-[50%] z-[1000] h-[200px] w-[2px] -translate-y-1/2">
        <div
          className="bg-blue-900 w-[2px] absolute left-0 transition-all duration-100 ease-linear"
          style={{ height: `${scrollPercent}%` }}
        ></div>
        <div className="absolute top-0 left-0 w-[2px] h-full bg-black/15"></div>
      </div>

      {/* Scroll To Top */}
      <div className="fixed left-4 top-[50%] z-[1002] -translate-y-1/2 text-center text-xs font-medium">
        <span
          className="rotate-180 writing-vertical-rl cursor-pointer text-black hover:text-blue-800"
          onClick={scrollToTop}
        >
          Scroll to top
        </span>
      </div>
    </>
  )
}

export default ScrollProgress
