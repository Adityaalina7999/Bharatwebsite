import React, { useEffect, useState } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import axios from '../Api/axiosInstance'
import { FaArrowLeft } from 'react-icons/fa'

const Services = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()
  console.log('services formData', formData)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    formData.services || []
  )
  const [otherService, setOtherService] = useState(formData.otherService || '')
  const [categories, setCategories] = useState([])

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/categories`
        )

        if (response.data.success) {
          setCategories(response.data.data.categories)
        } else {
          console.error('Failed to fetch categories')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  // Toggle category selection by ID
  const toggleService = (category) => {
    setSelectedCategoryIds((prev) => {
      const exists = prev.find((c) => c._id === category._id)
      if (exists) {
        return prev.filter((c) => c._id !== category._id)
      } else {
        return [...prev, category]
      }
    })
  }

  // const handleNext = () => {
  //   updateFormData({
  //     category: selectedCategoryIds, // ✅ Now this contains [{ _id, name, image }]
  //     otherService: otherService.trim() || '',
  //   })

  //   setOtherService('')
  //   onNext()
  // }

  const handleNext = async () => {
    try {
      // Prepare the data to send to backend with full category objects
      const updatedData = {
        ...formData,
        data: {
          partner: {
            ...formData.data?.partner,
            category: selectedCategoryIds,
          },
          user: {
            ...formData.data?.user,
            name: formData.data?.user?.name, // preserve name
          },
        },
      }

      console.log('Final payload being sent', updatedData)

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/webpartner/profileUpdate`,
        updatedData,
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('Response:', res)
      if (res.data.success) {
        // Save updated data to local formData context for UI usage
        updateFormData(updatedData)
        onNext()
      } else {
        alert(res.data.message || 'Failed to save services')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong while saving your services')
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 pt-4 pb-10 rounded-xl shadow-lg min-h-screen">
      <button className="text-gray-600 mb-4 text-left" onClick={onBack}>
        <FaArrowLeft />
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        What Services Do You Offer?
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Choose the categories you’re skilled in.
      </p>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search Service Plumber, Electrician etc."
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Grid of dynamic categories */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {categories.map((category) => (
          <div key={category._id} className="flex flex-col items-center">
            <button
              onClick={() => toggleService(category)}
              className={`flex flex-col items-center p-6 rounded-full border ${
                selectedCategoryIds.find((c) => c._id === category._id)
                  ? 'border-blue-900 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 object-cover rounded-full"
              />
            </button>
            <span className="text-sm font-semibold text-gray-700 text-center">
              {category.name}
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
