import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PricingCards from './PricingCards'
import decologo from '../../public/deco/s1.webp' // Use your correct path

gsap.registerPlugin(ScrollTrigger)

const PricingSection = () => {
  const titleRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      descRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
  }, [])

  return (
    <>
      <section className="bg-[#0c3f86] text-white pb-20 relative overflow-hidden z-0 py-16">
        <div className="px-4 flex  items-center justify-center w-full">
          <div className="flex justify-center items-center flex-col text-center max-w-3xl sm:px-20 px-0 space-y-4">
            <div className="text-xs uppercase tracking-widest text-white font-semibold bg-blue-800 text-center rounded-full mb-2 px-3 py-1">
              Complete Workforce Solutions
            </div>
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl font-semibold mb-2 leading-snug"
            >
              Pricing Plans
            </h2>

            <p
              ref={descRef}
              className="text-gray-400 text-center font-normal text-sm sm:text-lg leading-relaxed mt-4 sm:py-9 py-3"
            >
              Choose from flexible, affordable service plans designed to fit
              your needs — from one-time bookings to recurring workforce support
              for homes, offices, and businesses.
            </p>
          </div>
          <img
            src={decologo}
            alt="Decorative Icon"
            className="sm:right-24 right-0 hidden sm:absolute w-8 sm:w-32 h-auto mb-10 md:mb-0 ms-10"
          />
        </div>
      </section>

      <div className="-mt-20 relative z-10">
        <PricingCards />
      </div>
    </>
  )
}

export default PricingSection
