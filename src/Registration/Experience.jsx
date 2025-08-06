import React, { useState, useEffect } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'

const Experience = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()
  useEffect(() => {
    console.log('Updated form data:', formData)
  }, [formData])
  console.log('Updated form data services:', formData)
  const serviceTypes = formData.serviceTypes || {}

  // Flatten service types into list of selected items
  const selectedItems = []
  Object.entries(serviceTypes).forEach(([serviceId, categories]) => {
    Object.values(categories).forEach((subcatList) => {
      subcatList.forEach((subcat) => {
        selectedItems.push({
          serviceId,
          serviceName:
            formData.services?.find((s) => s._id === serviceId)?.name || '',
          subCategoryId: subcat._id,
          subCategoryName: subcat.name,
        })
      })
    })
  })

  const [experienceData, setExperienceData] = useState({})

  useEffect(() => {
    // Prefill data if exists
    if (formData.experienceData) {
      setExperienceData(formData.experienceData)
    }
  }, [formData.experienceData])

  const handleInputChange = (subCategoryId, value) => {
    setExperienceData((prev) => ({
      ...prev,
      [subCategoryId]: {
        ...prev[subCategoryId],
        experience: value,
      },
    }))
  }

  const handleFileUpload = (subCategoryId, file) => {
    setExperienceData((prev) => ({
      ...prev,
      [subCategoryId]: {
        ...prev[subCategoryId],
        file,
      },
    }))
  }

  const handleNext = () => {
    updateFormData({ experienceData })
    onNext()
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md min-h-screen">
      <button
        onClick={onBack}
        className="text-gray-600 mb-4 text-left flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-1 text-gray-900">
        Select Your Experience
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose the type of service you specialize in. This helps us connect you
        with the right requests.
      </p>

      {selectedItems.map((item, index) => (
        <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="font-medium text-gray-800">
              {item.serviceName}
            </span>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            {item.subCategoryName} Experience
          </label>
          <input
            type="text"
            placeholder="e.g. 2 Years - 6 Months"
            value={experienceData[item.subCategoryId]?.experience || ''}
            onChange={(e) =>
              handleInputChange(item.subCategoryId, e.target.value)
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work License or Certificates
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer bg-gray-50">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                handleFileUpload(item.subCategoryId, e.target.files[0])
              }
              className="hidden"
              id={`upload-${index}`}
            />
            <label
              htmlFor={`upload-${index}`}
              className="text-sm text-gray-500 cursor-pointer"
            >
              {experienceData[item.subCategoryId]?.file?.name || 'Upload Image'}
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={handleNext}
        className="w-full mt-4 bg-blue-800 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
      >
        Next
      </button>
    </div>
  )
}

export default Experience
