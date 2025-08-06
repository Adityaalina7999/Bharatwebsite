import React from 'react'
import { FaMapMarkedAlt, FaCalendarAlt } from 'react-icons/fa'
import { BsClock } from 'react-icons/bs'

const features = [
  {
    icon: <FaMapMarkedAlt className="text-[#012878] text-5xl" />,
    title: 'Areas of Coverage',
    description:
      'Serving multiple cities across India with trusted professionals at your doorstep.',
  },
  {
    icon: <FaCalendarAlt className="text-[#012878] text-5xl" />,
    title: 'Easy Booking Service',
    description:
      'Book services in minutes through our app — fast, simple, and hassle-free.',
  },
  {
    icon: <BsClock className="text-[#012878] text-5xl" />,
    title: '24/7 Emergency Support',
    description:
      'We’re here anytime you need us — even for urgent cleaning needs.',
  },
]

const Features = () => {
  return (
    <section className="bg-[#f2ce30] sm:px-16 px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg py-7  px-7 flex  gap-3 shadow-md"
          >
            <div>{item.icon}</div>
            <div className="text-start">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed text-pretty">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
