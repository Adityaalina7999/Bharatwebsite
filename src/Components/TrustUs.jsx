import React from 'react'
import img1a from '../../public/before-after/1a.jpg'
import img1b from '../../public/before-after/1b.jpg'
import CompareImage from 'react-compare-image'
import { FaCheck } from 'react-icons/fa'

const trustPoints = [
  {
    title: 'Skilled & Verified Workers',
    description:
      'Every worker is background-checked, trained, and certified for quality service.',
  },
  {
    title: 'Customized Workforce Solutions',
    description:
      'We match the right worker to your exact job requirement — from cleaning to repairs.',
  },
  {
    title: 'Safe & Reliable Services',
    description:
      'We follow safety protocols and ensure dependable service every time.',
  },
  {
    title: 'On-Time & Professional',
    description:
      'Our workers value your time — expect punctuality, discipline, and professionalism.',
  },
  {
    title: 'Transparent & Fair Pricing',
    description: 'No hidden charges. Clear pricing that fits your budget.',
  },
  {
    title: 'Your Satisfaction, Our Commitment',
    description:
      'We’re with you every step of the way — from booking to job completion.',
  },
]

const TrustUs = () => {
  return (
    <div className="bg-[#0c4193] text-white py-20 px-4 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Left Section */}
      <div className="flex-1">
        <button className="bg-gray-50/10 text-white text-xs px-4 py-1 rounded-full mb-4 font-medium">
          WHY CHOOSE BHARAT WORKERS
        </button>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Top Six Reasons to Trust Us
        </h2>
        <ul className="space-y-6">
          {trustPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <FaCheck className="text-yellow-400 mt-1" />
              <div>
                <p className="font-semibold">{point.title}</p>
                <p className="text-sm text-gray-100">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      {/* Right Section */}
      <div className="flex-1 w-full max-w-md md:max-w-lg">
        <div className="rounded-lg overflow-hidden">
          <CompareImage
            leftImage={img1a}
            rightImage={img1b}
            leftImageLabel="After"
            rightImageLabel="Before"
            sliderLineColor="#fff"
            sliderPositionPercentage={0.5}
            handleSize={40}
          />
        </div>
      </div>
    </div>
  )
}

export default TrustUs
