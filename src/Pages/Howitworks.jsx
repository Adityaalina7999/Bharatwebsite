import React from 'react'
import Wrapper from '../UI/Wrapper'
import wrapperimg from '../../public/misc/7.webp'
import IconGrid from '../UI/Iconsection'
import icon from '../../public/icons/steps/cleaning-service.png'
import icon2 from '../../public/icons/steps/notes.png'
import icon3 from '../../public/icons/steps/cleaner.png'
import icon4 from '../../public/icons/steps/pay.png'
import icon5 from '../../public/icons/steps/sunbathing.png'
import BookRepair from '../Components/BookRepair'
import Features from '../Components/feactures'
import TestimonialCarousel from '../Components/TestimonialCarousel'

const featureItems = [
  {
    icon: icon,
    title: 'Select Your Service',
    description: 'Choose the cleaning service that fits your needs.',
  },
  {
    icon: icon2,
    title: 'Share Your Details',
    description: 'Fill in your location, schedule, and preferences.',
  },
  {
    icon: icon3,
    title: 'Get Matched Instantly',
    description: 'We’ll assign a verified Bharat Worker for your job.',
  },
  {
    icon: icon4,
    title: 'Pay Securely',
    description: 'Use trusted UPI or card methods with ease.',
  },
  {
    icon: icon5,
    title: 'Relax & Enjoy',
    description: 'Sit back while we handle the rest, hassle-free.',
  },
]

const Howitworks = () => {
  return (
    <div>
      <Wrapper
        title="How It Works"
        description="Enjoy a spotless space with our expert cleaning team. Affordable, eco-friendly, and tailored to your needs!"
        image={wrapperimg}
      />
      <IconGrid
        items={featureItems}
        iconBgColor="#012878"
        gridClass="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8"
        iconWrapperClass="p-6 rounded-lg mb-5"
      />

      <BookRepair />
      <TestimonialCarousel />
      <Features />
    </div>
  )
}

export default Howitworks
