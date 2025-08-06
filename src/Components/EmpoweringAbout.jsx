import React, { useEffect, useRef } from 'react'
import workers2 from '../../public/misc/3.webp'
import workers3 from '../../public/misc/8.webp'
import workers4 from '../../public/misc/10.webp'
import workers5 from '../../public/misc/11.webp'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EmpoweringAbout = () => {
  const imagesRef = useRef([])
  const sectionRef = useRef(null)

  useEffect(() => {
    // Animate image cards
    imagesRef.current.forEach(() => {
      gsap.fromTo(
        imagesRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1, // optional, creates slight delay between images
          scrollTrigger: {
            trigger: sectionRef.current, // or groupImageRef.current if you prefer
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="flex items-center flex-col overflow-hidden">
      {/* Main Section */}
      <section
        ref={sectionRef}
        className="bg-white text-white pt-16 px-4 sm:px-6 md:px-16 w-full z-30"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="uppercase tracking-wider text-xs font-semibold  text-blue-900 bg-blue-100 px-4 py-1 rounded-full inline-block mb-6">
              Empowering Homes & Businesses Across India
            </p>
            <h1 className="font-semibold text-4xl text-black ">
              Reliable Manpower Solutions for Every Need
            </h1>
            <p className="text-gray-400 text-lg mt-6 mb-4 leading-relaxed">
              At Bharat Workers, we are committed to bridging the gap between
              skilled workers and those who need them. Whether you're a
              homeowner seeking trusted help or a business looking for
              experienced staff, we provide reliable, trained, and verified
              professionals at your doorstep.
            </p>
            <p className="text-gray-400 text-lg my-4 leading-relaxed">
              From electricians and plumbers to housekeeping and repair
              specialists, our wide network ensures fast, affordable, and safe
              service—delivered with a smile.
            </p>
            <p className="text-gray-400 text-lg my-4 leading-relaxed">
              We believe in dignity of labour, customer satisfaction, and
              creating work opportunities for India's hardworking workforce.
            </p>
          </div>

          {/* Right Image Grid */}
          <div className="flex flex-row  justify-center gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <img
                src={workers5}
                alt="Worker 1"
                className="sm:w-48 w-32 rounded-xl object-cover ms-14"
                ref={(el) => (imagesRef.current[0] = el)}
              />
              <img
                src={workers2}
                alt="Worker 3"
                className="sm:w-64 w-60 rounded-xl object-cover"
                ref={(el) => (imagesRef.current[1] = el)}
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <img
                src={workers4}
                alt="Worker 2"
                className="w-60 sm:mt-8 rounded-xl object-cover"
                ref={(el) => (imagesRef.current[2] = el)}
              />
              <img
                src={workers3}
                alt="Worker 4"
                className="sm:w-48 w-32 rounded-xl object-cover"
                ref={(el) => (imagesRef.current[3] = el)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EmpoweringAbout
