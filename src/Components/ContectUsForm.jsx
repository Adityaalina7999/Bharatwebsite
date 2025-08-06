import React, { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { FaPlay } from 'react-icons/fa'
import { gsap } from 'gsap'
import bookrepairvdo from '../assets/bookRepairVdo.mp4'
import bookrepairimg from '../assets/12.webp'
import Button from '../UI/Button'
const ContectUsForm = () => {
  const [showVideo, setShowVideo] = useState(false)

  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)
  const playButtonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
      })

      tl.from(contentRef.current, { y: 100, opacity: 0 })
      tl.from(
        buttonRef.current,
        { scale: 1.2, opacity: 0 },
        '-=0.4' // make sure it overlaps slightly with previous
      )
    }, sectionRef)
    gsap.fromTo(
      playButtonRef.current,
      {
        scale: 1.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: playButtonRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#012878] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left - Image with Play */}
        <div className="relative">
          <img
            src={bookrepairimg}
            alt="Workers Cleaning"
            className="w-full h-full object-cover"
          />
          <button
            ref={playButtonRef}
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 m-auto flex justify-center items-center w-28 h-28 hover:bg-[#012878] rounded-xl bg-yellow-400 hover:scale-110 transition duration-300"
          >
            <FaPlay className="text-black w-8 h-8 hover:text-white" />
          </button>
        </div>
        {/* Right - Contact Form */}
        <div className="bg-[#f8f9fb] text-black flex flex-col justify-center px-6 lg:px-16 py-12">
          <h2 className="text-2xl font-semibold mb-6">
            Do you have any question?
          </h2>
          <form className="space-y-4" ref={contentRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gsap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-100 px-4 py-2 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-100 px-4 py-2 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full border border-gray-100 px-4 py-2 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full border border-gray-100 px-4 py-2 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Service</option>
                <option>Cleaning</option>
                <option>Repairs</option>
                <option>Plumbing</option>
              </select>
            </div>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-100 px-4 py-2 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex justify-start">
              <Button title={'send Massage'} />
            </div>
          </form>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-11/12 md:w-2/3 lg:w-1/2">
            <video
              src={bookrepairvdo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-lg"
            ></video>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ContectUsForm
