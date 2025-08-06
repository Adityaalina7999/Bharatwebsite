import React from 'react'
import IntroPage from '../Components/IntroPage'
import Whoweare from '../Components/Whoweare'
import OurServices from '../Components/OurServices'
import Iconsection from '../UI/Iconsection'
import IconGrid from '../UI/Iconsection'
import icon from '../../public/icons/white/labor.webp'
import icon2 from '../../public/icons/white/calendar.webp'
import icon3 from '../../public/icons/white/best-price.webp'
import icon4 from '../../public/icons/white/eco-friendly.webp'
import BookRepair from '../Components/BookRepair'
import JoinUs from '../Components/JoinUs'
import WeAreIndia from '../Components/WeAreIndia'
import TestimonialCarousel from '../Components/TestimonialCarousel'
import Counters from '../Components/Counters'
import PricingSection from '../Components/PricingSection'
import TrustUs from '../Components/TrustUs'
const featureItems = [
  {
    icon: icon,
    title: 'Verified Workers',
    description: 'Every worker is background-verified for your safety.',
  },
  {
    icon: icon2,
    title: 'Job Matching System',
    description: 'Smart job matching ensures the right fit, every time.',
  },
  {
    icon: icon3,
    title: 'Transparent Payments',
    description: '100% transparent and secure payment process.',
  },
  {
    icon: icon4,
    title: 'Quick Support',
    description: 'Get quick and friendly support whenever you need it.',
  },
]

const Home = () => {
  return (
    <div>
      <IntroPage />
      <Whoweare />
      <div className="-mt-24 sm:-mt-36 relative z-10">
        <OurServices />
      </div>
      <Iconsection />
      <IconGrid
        items={featureItems}
        iconBgColor="#012878"
        gridClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        iconWrapperClass="p-6 rounded-lg shadow-lg"
      />
      <Counters />
      <WeAreIndia />
      <TrustUs />
      <PricingSection />
      <TestimonialCarousel />
      <BookRepair />
      <JoinUs />
    </div>
  )
}

export default Home
