import React from 'react'
import JionImg from '../../public/misc/2.webp' // update path as needed
import Button from '../UI/Button'

const JoinUs = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between sm:px-14 px-6 pt-16 bg-white">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full">
          GROW WITH US
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900">
          Join Our Skilled <br />
          Workforce and Build Your Future
        </h1>
        <p className="text-gray-500 text-lg font-normal leading-relaxed max-w-xl">
          Become a part of Bharat Workers and unlock job opportunities, regular
          income, and professional training. Whether you're skilled or
          semi-skilled, we’ll help you succeed with trust and transparency.
        </p>

        <div className="flex justify-start items-start">
          <Button title={' Apply Now'} />
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex justify-center sm:mb-12 mb-0 lg:mb-0">
        <img
          src={JionImg}
          alt="Join Us"
          className="w-[90%] max-w-xl h-auto object-contain"
        />
      </div>
    </section>
  )
}

export default JoinUs
