import React from 'react'
import Wrapper from '../UI/Wrapper'
import wrapperimg from '../../public/misc/5.webp'
import BookRepair from '../Components/BookRepair'
import JoinUs from '../Components/JoinUs'
import EmpoweringAbout from '../Components/EmpoweringAbout'
import WeAreIndia from '../Components/WeAreIndia'
const About = () => {
  return (
    <div>
      <Wrapper
        title="About Us"
        description="Bharat Workers connects you with verified professionals, offering reliable, affordable, and timely workforce solutions for homes and businesses."
        image={wrapperimg}
      />
      <EmpoweringAbout />
      <JoinUs />
      <WeAreIndia />

      <BookRepair />
    </div>
  )
}

export default About
