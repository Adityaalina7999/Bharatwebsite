import React, { useEffect, useState } from 'react'
import axios from '../Api/axiosInstance'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'

const ServicesType = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()
  console.log('servicesTypeee formData', formData)

  const selectedServices = formData.data?.partner?.category || []
  const [categoryTypes, setCategoryTypes] = useState([]) // [{ _id, name }]
  const [subCategories, setSubCategories] = useState({})
  const [selectedSubTypes, setSelectedSubTypes] = useState(
    formData.categorytype || []
  )

  // Fetch category types
  useEffect(() => {
    axios
      .get('/category-type')
      .then((res) => {
        const types = res.data?.data?.categoryType || []
        setCategoryTypes(types)
      })
      .catch(console.error)
  }, [])

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await axios.post('/sub-categories/getSubCategories', {
          currentPage: 1,
          pageSize: 200,
        })
        const allSubcats = res.data?.data?.subCategories || []

        const grouped = {}
        selectedServices.forEach((service) => {
          const serviceSubs = allSubcats.filter(
            (sc) => sc.category?._id === service._id
          )

          const byType = {}
          serviceSubs.forEach((sc) => {
            const typeKey =
              sc.typeOfCategory?.charAt(0).toUpperCase() +
              sc.typeOfCategory?.slice(1)

            if (!byType[typeKey]) byType[typeKey] = []
            byType[typeKey].push({
              ...sc,
              categorytypeId:
                sc.typeOfCategoryId || sc.categorytype?._id || null,
            })
          })

          grouped[service._id] = byType
        })

        setSubCategories(grouped)
      } catch (err) {
        console.error('Failed fetching subcategories', err)
      }
    }

    if (selectedServices.length > 0) {
      fetchSubCategories()
    }
  }, [selectedServices])

  const toggleSubType = (serviceId, typeKey, subcat) => {
    setSelectedSubTypes((prev) => {
      const prevService = prev[serviceId] || {}
      const currentList = new Set(
        prevService[typeKey]?.map((item) => item._id) || []
      )

      let newList
      if (currentList.has(subcat._id)) {
        newList = prevService[typeKey].filter((item) => item._id !== subcat._id)
      } else {
        newList = [...(prevService[typeKey] || []), subcat]
      }

      return {
        ...prev,
        [serviceId]: {
          ...prevService,
          [typeKey]: newList,
        },
      }
    })
  }

  const isSelected = (serviceId, typeKey, subcatId) => {
    return selectedSubTypes?.[serviceId]?.[typeKey]?.some(
      (item) => item._id === subcatId
    )
  }

  const handleNext = async () => {
    try {
      const servicesPayload = []
      const categoryTypePayload = []

      Object.entries(selectedSubTypes).forEach(([serviceId, typesObj]) => {
        Object.entries(typesObj).forEach(([typeKey, subcats]) => {
          // Match category type name with /category-type data
          const matchedType = categoryTypes.find(
            (ct) =>
              ct.name.trim().toLowerCase() === typeKey.trim().toLowerCase()
          )
          const categoryTypeId = matchedType?._id || null

          if (categoryTypeId && !categoryTypePayload.includes(categoryTypeId)) {
            categoryTypePayload.push(categoryTypeId)
          }

          subcats.forEach((subcat) => {
            servicesPayload.push({
              _id: subcat._id,
              name: subcat.name,
              description: subcat.description || '',
              category: subcat.category?._id,
              categorytype: categoryTypeId,
              pricingTiers: subcat.pricingTiers || [],
              surgePricing: subcat.surgePricing || {
                enabled: false,
                surgeMultiplier: 1,
                surgeHours: [],
              },
              partnerCommissionRate: subcat.partnerCommissionRate || 0,
              metaTitle: subcat.metaTitle || null,
              metaDescripton: subcat.metaDescripton || null,
              metaKeyword: subcat.metaKeyword || null,
              status: 'active',
            })
          })
        })
      })

      const updatedData = {
        ...formData,
        data: {
          partner: {
            ...formData.data?.partner,
            services: servicesPayload,
            categoryType: categoryTypePayload,
          },
        },
      }

      console.log('Final payload being sent (ServicesType):', updatedData)

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/webpartner/profileUpdate`,
        updatedData,
        { headers: { 'Content-Type': 'application/json' } }
      )

      
      console.log('Profile updated:', res.data)

      if (res.data.success) {
        updateFormData(updatedData)
        onNext()
      } else {
        alert(res.data.message || 'Failed to save service types')
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      alert('Something went wrong while saving your service types')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg min-h-screen">
      <button
        className="text-gray-600 mb-4 text-left flex items-center"
        onClick={onBack}
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-2xl font-bold mb-1 text-gray-900">
        Select Your Service Type
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose the type of service you specialize in. This helps us connect you
        with the right requests.
      </p>
      {selectedServices.map((service) => (
        <div
          key={service._id}
          className="mb-6 border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center mb-3">
            <img
              src={service.image}
              alt={service.name}
              className="w-6 h-6 mr-2"
            />
            <h3 className="text-md font-semibold">{service.name}</h3>
          </div>

          {Object.entries(subCategories[service._id] || {}).map(
            ([typeKey, subs]) => (
              <div key={typeKey} className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {typeKey}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {subs.map((subcat) => (
                    <button
                      key={subcat._id}
                      onClick={() =>
                        toggleSubType(service._id, typeKey, subcat)
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        isSelected(service._id, typeKey, subcat._id)
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {subcat.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
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

export default ServicesType
