import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DecoImg from '../../public/deco/s1.webp'

gsap.registerPlugin(ScrollTrigger)

const Wrapper = ({ title, description, image }) => {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const imageRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    // Heading and description animation
    gsap.fromTo(
      [titleRef.current, descRef.current],
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Right image scroll-down animation
    gsap.to(imageRef.current, {
      y: 150,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  // Random star positions
  const starCount = 20
  const stars = Array.from({ length: starCount })

  return (
    <div
      ref={wrapperRef}
      className="bg-[#0c3f86] text-white overflow-hidden relative pt-14"
    >
      {/* Main content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 relative z-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-left">
          <h1
            ref={titleRef}
            className="text-5xl font-semibold mb-4 leading-snug"
          >
            {title}
          </h1>
          <p
            ref={descRef}
            className="text-gray-400 text-lg font-semibold leading-relaxed mb-6"
          >
            {description}
          </p>
          <img
            src={DecoImg}
            alt="Decorative Icon"
            className="w-10 inline-block"
          />
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          {image && (
            <img
              ref={imageRef}
              src={image}
              alt="Hero"
              className="max-w-[500px] w-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Sparkling SVG Stars */}
      {stars.map((_, i) => {
        const size = Math.random() * 12 + 8
        const top = Math.random() * 100
        const left = Math.random() * 100
        const delay = Math.random() * 5

        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="white"
            className="absolute animate-sparkle pointer-events-none"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0,
              animationDelay: `${delay}s`,
              zIndex: 0,
            }}
          >
            <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
          </svg>
        )
      })}

      {/* Sparkle animation */}
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            transform: scale(0.4) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-sparkle {
          animation: sparkle 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default Wrapper
