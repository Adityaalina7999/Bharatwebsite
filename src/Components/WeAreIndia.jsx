import React from 'react'
import Google from '../../public/misc/google.webp'
import Trustpilot from '../../public/misc/trustpilot-invert.webp'
import { FaStar } from 'react-icons/fa'

const WeAreIndia = () => {
  return (
    <section className="bg-white px-6 sm:px-40 py-20 flex flex-col lg:flex-row items-center justify-around gap-16">
      {/* Left Text */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="text-4xl text-center sm:text-5xl font-semibold text-gray-900 leading-relaxed">
          We Are India’s Trusted Skilled Worker Network
        </h2>
      </div>

      {/* Right Ratings */}
      <div className="lg:w-1/2 flex flex-row justify-center items-center gap-16">
        {/* Trustpilot */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">Excellent</p>
          <div className="flex justify-center mb-2">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg mx-1" />
              ))}
          </div>
          <p className="text-base text-gray-600">
            Based on <span className="font-semibold">185 reviews</span>
          </p>
          <img src={Trustpilot} alt="Trustpilot" className="h-8 mt-2 mx-auto" />
        </div>

        {/* Google */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">
            4.8 out of 5
          </p>
          <div className="flex justify-center mb-2">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg mx-1" />
              ))}
          </div>
          <p className="text-base text-gray-600">
            Based on <span className="font-semibold">200 reviews</span>
          </p>
          <img src={Google} alt="Google" className="h-8 mt-2 mx-auto" />
        </div>
      </div>
    </section>
  )
}

export default WeAreIndia
