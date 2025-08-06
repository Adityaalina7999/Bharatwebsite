import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FiCamera, FiCalendar } from 'react-icons/fi'

import useRegistration from './RegistrationContext/useRegistration'

const AboutYouForm = ({ onNext }) => {
  const context = useRegistration()

  console.log('Registration context:', context) // Should NOT be undefined
  const { formData, updateFormData } = context
  useEffect(() => {
    console.log('Updated form data:', formData)
  }, [formData])
  console.log('Updated form data:', formData)

  const [localData, setLocalData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    // Pre-fill form if returning to this step
    setLocalData(formData)
  }, [formData])

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    updateFormData(localData)
    onNext() // move to next step
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 pt-4 pb-10 rounded-xl shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 text-start">
        Tell Us About You
      </h2>
      <p className="text-sm text-gray-500 text-start mb-5 mt-3">
        Help customers know who you are.
      </p>

      <div className="flex justify-center mb-4 relative">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-[38%] bg-blue-600 p-1.5 rounded-full text-white cursor-pointer">
          <FiCamera size={16} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-800">Full Name</label>
          <input
            type="text"
            name="name"
            value={localData.name}
            onChange={handleChange}
            placeholder="Akshay"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="text-sm font-medium text-gray-800">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="text"
              name="dob"
              placeholder="DD-MM-YYYY"
              value={localData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm pr-10"
            />
            <FiCalendar className="absolute top-3 right-3 text-gray-500" />
          </div>
        </div>

        {/* Mobile Number with Flag */}
        <div>
          <label className="text-sm font-medium text-gray-800">
            Mobile Number
          </label>
          <PhoneInput
            country={'in'}
            value={localData.phone}
            onChange={(phone) => setLocalData({ ...localData, phone })}
            inputStyle={{
              width: '100%',
              height: '38px',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-800">Email</label>
          <input
            type="email"
            name="email"
            value={localData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-4 w-full bg-blue-800 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AboutYouForm
