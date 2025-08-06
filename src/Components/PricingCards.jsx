import React from 'react'
import { FaCheck } from 'react-icons/fa'
import Button from '../UI/Button'
const pricingData = [
  {
    title: 'One-Time or Monthly Booking',
    price: '399',
    unit: '/ Hour / Worker',
    features: [
      'Perfect for single-day tasks or monthly maintenance work.',
      'Ideal for home cleaning, repairs, and more.',
    ],
  },
  {
    title: 'Recurring (Weekly, Biweekly)',
    price: '349',
    unit: '/ Hour / Worker',
    features: [
      'Best value for routine jobs and consistent support.',
      'For families, offices, or frequent service needs.',
    ],
  },
  {
    title: 'Office & Commercial',
    price: '299',
    unit: '/ Hour / Worker',
    features: [
      'Reliable workforce for business spaces and industrial needs.',
      'Flexible contracts for offices, shops, and commercial sites.',
    ],
  },
]

const PricingCards = () => {
  return (
    <section className="px-4 sm:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 text-center shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {plan.title}
            </h3>

            <div className="flex justify-center items-baseline mb-3">
              <span className="text-6xl font-bold text-gray-900">
                <span className="ml-1 text-gray-500 text-lg">₹ </span>
                {plan.price}
              </span>
              <span className="ml-1 text-gray-500">{plan.unit}</span>
            </div>

            <p className="text-gray-400 text-lg mb-2">{plan.features[0]}</p>
            <div className="flex justify-center items-center gap-2 text-gray-400 text-lg mt-5">
              <FaCheck className="text-yellow-500 mb-7" />
              <span>{plan.features[1]}</span>
            </div>
            <div className="flex justify-center mt-8">
              <Button title={'Book Now'} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PricingCards
