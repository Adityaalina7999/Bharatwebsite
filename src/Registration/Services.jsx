import React, { useEffect, useState } from 'react'
import useRegistration from './RegistrationContext/useRegistration'

import AC from '../../public/Registration/AC.svg'
import Beauty from '../../public/Registration/Beauty.svg'
import Appliance from '../../public/Registration/Appliance.svg'
import Painter from '../../public/Registration/painter.svg'
import Cleaning from '../../public/Registration/cleaning.svg'
import Plumber from '../../public/Registration/Plimber.svg'
import Electrician from '../../public/Registration/Electricion.svg'
import Shifting from '../../public/Registration/Shifting.svg'
import Men from '../../public/Registration/Men.svg'

const serviceOptions = [
  { name: 'AC Repair', icon: AC },
  { name: 'Beauty', icon: Beauty },
  { name: 'Appliance', icon: Appliance },
  { name: 'Painter', icon: Painter },
  { name: 'Cleaning', icon: Cleaning },
  { name: 'Plumber', icon: Plumber },
  { name: 'Electrician', icon: Electrician },
  { name: 'Shifting', icon: Shifting },
  { name: "Men's Salon", icon: Men },
]

const Services = ({ onNext }) => {
  const { formData, updateFormData } = useRegistration()
  useEffect(() => {
    console.log('Updated form data:', formData)
  }, [formData])
  console.log('Updated form data services:', formData)

  const [selectedServices, setSelectedServices] = useState(
    formData.services || []
  )
  const [otherService, setOtherService] = useState(formData.otherService || '')

  const toggleService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    )
  }
  const handleNext = () => {
    let updatedServices = [...selectedServices]

    if (
      otherService.trim() &&
      !selectedServices.includes(otherService.trim())
    ) {
      updatedServices.push(otherService.trim())
    }

    updateFormData({ services: updatedServices })
    setOtherService('') // optional: clear after saving
    onNext()
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 pt-4 pb-10 rounded-xl shadow-lg min-h-screen">
      <button className="text-gray-600 mb-4 text-left">{'<'} Back</button>

      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        What Services Do You Offer?
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Choose the categories you’re skilled in.
      </p>

      {/* Search Input (optional functionality) */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search Service Plumber, Electrician etc."
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Grid of services */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {serviceOptions.map(({ name, icon }) => (
          <div className="flex flex-col items-center">
            <button
              key={name}
              onClick={() => toggleService(name)}
              className={`flex flex-col items-center p-6 rounded-full border ${
                selectedServices.includes(name)
                  ? 'border-blue-900 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <img src={icon} alt={name} className="w-7 h-7 " />
            </button>
            <span className="text-sm font-semibold text-gray-700 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Other input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Others
        </label>
        <input
          type="text"
          value={otherService}
          onChange={(e) => setOtherService(e.target.value)}
          placeholder="Enter other service"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full bg-blue-800 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
      >
        Next
      </button>
    </div>
  )
}

export default Services
