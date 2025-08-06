import React from 'react'
import Wrapper from '../UI/Wrapper'
import wrapperimg from '../../public/misc/1.webp'
import IconGrid from '../UI/Iconsection'

// ✅ Import react-icons
import { FaWhatsapp, FaEnvelope, FaComments, FaPhoneAlt } from 'react-icons/fa'
import ContectUsForm from '../Components/ContectUsForm'

const featureItems = [
  {
    icon: <FaPhoneAlt className="text-white text-3xl" />,
    title: "Let's Talk",
    description: '+91 98765 43210',
  },
  {
    icon: <FaEnvelope className="text-white text-3xl" />,
    title: 'Email Us',
    description: 'support@bharatworkers.in',
  },
  {
    icon: <FaWhatsapp className="text-white text-3xl" />,
    title: 'WhatsApp Support',
    description: '+91 98765 43210',
  },

  {
    icon: <FaComments className="text-white text-3xl" />,
    title: 'Live Chat',
    description: 'Available 8 AM–9 PM',
  },
]

const Contact = () => {
  return (
    <div>
      <Wrapper
        title="Contact Us Today"
        description="Have questions, feedback, or need assistance? Our team is just a call or message away. Whether you’re booking a service or want to join us as a partner, we’re ready to support you."
        image={wrapperimg}
      />

      <IconGrid
        items={featureItems}
        gridClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        iconBgColor="#012878"
        iconWrapperClass="p-6 rounded-full mb-5"
      />
      <ContectUsForm />
    </div>
  )
}

export default Contact
