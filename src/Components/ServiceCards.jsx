import React from 'react'

import servces from '../../public/services/1.webp'
import servces2 from '../../public/services/2.webp'
import servces3 from '../../public/services/3.webp'
import servces4 from '../../public/services/4.webp'
import servces5 from '../../public/services/5.webp'
import servces6 from '../../public/services/6.webp'

// Sample data (replace image paths with actual local/imported images)
const services = [
  {
    title: 'Construction Workers',
    description:
      'Trained laborers for on-site support, helping with building, lifting, and general construction tasks under expert supervision.',
    image: servces,
  },
  {
    title: 'Plumbers & Electricians',
    description:
      'Certified professionals for electrical fittings, wiring, plumbing repairs, installations, and maintenance services for homes and businesses.',
    image: servces2,
  },
  {
    title: 'Painters & Carpenters',
    description:
      'Get skilled painters for interior and exterior jobs and carpenters for furniture, fixtures, and woodwork—precision guaranteed.',
    image: servces3,
  },
  {
    title: 'Housekeeping & Cleaning Staff',
    description:
      'Professional housekeeping and cleaning teams for residential and commercial properties.',
    image: servces4,
  },
  {
    title: 'Packers & Movers',
    description:
      'Efficient and safe packing and moving solutions for your relocation needs.',
    image: servces5,
  },
  {
    title: 'Home Repair & Maintenance',
    description:
      'Trained technicians for plumbing, electricals, carpentry, and other home repairs.',
    image: servces6,
  },
]

const ServiceCards = () => {
  return (
    <section className="py-6 px-4 sm:px-8 lg:px-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl">
            <div className="overflow-hidden rounded-xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-60 object-cover transform transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="px-1 py-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-lg text-gray-500 text-pretty">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServiceCards
