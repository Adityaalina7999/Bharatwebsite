import React from 'react'
import ServiceCards from '../Components/ServiceCards'
import Wrapper from '../UI/Wrapper'
import wrapperimg from '../../public/misc/1.webp'

const Services = () => {
  return (
    <div>
      <Wrapper
        title="Our Services"
        description="Whether it's for a quick fix or a complete service solution, Bharat Workers ensures every job is done with professionalism and care."
        image={wrapperimg}
      />
      <div className="mt-10">
        <ServiceCards />
      </div>
    </div>
  )
}

export default Services
