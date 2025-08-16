import React, { useState, useEffect } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'
import axios from '../Api/axiosInstance'

const Experience = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()
  const [yearsOptions, setYearsOptions] = useState([])

  const categorytype = formData.data.partner.categoryType || []
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/webpartner/get-years-experience`
        )
        if (data?.success && Array.isArray(data.data)) {
          setYearsOptions(data.data) // assuming API returns { success: true, data: [...] }
        }
      } catch (err) {
        console.error('Error fetching years of experience:', err)
      }
    }

    fetchYears()
  }, [])
  console.log('Updated form data services:', formData)
  console.log('categorytype', categorytype)
  // Group subcategories under each service (category)
  const allServices = formData.data.partner.services || [] // wherever you store full list
  console.log('allServices', allServices)

  const groupedData =
    formData.data?.partner?.category?.map((service) => {
      const subCats = allServices.filter((svc) => svc.category === service._id)

      return {
        serviceId: service._id,
        serviceName: service.name,
        serviceImage: service.image,
        subCategories: subCats,
      }
    }) || []

  const [experienceData, setExperienceData] = useState({})

  // Prefill if exists
  useEffect(() => {
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

  const handleNext = async () => {
    try {
      // Build skills array from groupedData & experienceData
      const skillsPayload = []

      groupedData.forEach((service) => {
        service.subCategories.forEach((subcat) => {
          const expInfo = experienceData[subcat._id]
          if (expInfo && expInfo.experience) {
            skillsPayload.push({
              serviceId: subcat._id,
              skill: subcat.name,
              yearOfExprence: parseInt(expInfo.experience, 10) || 0,
              experienceCertificates: expInfo.file
                ? `experienceCertificates[${subcat._id}]-${Date.now()}-${
                    expInfo.file.name
                  }`
                : null,
            })
          }
        })
      })

      // Prepare FormData for file + JSON fields
      const payload = new FormData()

      payload.append('skills', JSON.stringify(skillsPayload))

      // Make API request
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/webpartner/profileUpdate`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      // Save locally
      updateFormData({ experienceData, skills: skillsPayload })

      // Go next
      onNext()
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md min-h-screen">
      <button
        onClick={onBack}
        className="text-gray-600 mb-4 text-left flex items-center"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-1 text-gray-900">
        Select Your Experience
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose the type of service you specialize in. This helps us connect you
        with the right requests.
      </p>

      {groupedData.map((service) => (
        <div
          key={service.serviceId}
          className="mb-6 border border-gray-200 rounded-lg p-4"
        >
          {/* Category Header */}
          <div className="flex items-center mb-3">
            <img
              src={service.serviceImage}
              alt={service.serviceName}
              className="w-6 h-6 mr-2"
            />
            <h3 className="text-md font-semibold">{service.serviceName}</h3>
          </div>

          {/* Subcategories for this category */}
          {service.subCategories.map((subcat) => (
            <div key={subcat._id} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {subcat.name} Experience
              </label>
              <select
                value={experienceData[subcat._id]?.experience || ''}
                onChange={(e) => handleInputChange(subcat._id, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
              >
                <option value="">Select Years of Experience</option>
                {yearsOptions.map((year, i) => (
                  <option
                    key={year._id || year.value || i}
                    value={year.value || year}
                  >
                    {year.label || year.name || year}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work License or Certificates
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer bg-gray-50">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileUpload(subcat._id, e.target.files[0])
                  }
                  className="hidden"
                  id={`upload-${subcat._id}`}
                />
                <label
                  htmlFor={`upload-${subcat._id}`}
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  {experienceData[subcat._id]?.file?.name || 'Upload Image'}
                </label>
              </div>
            </div>
          ))}
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
