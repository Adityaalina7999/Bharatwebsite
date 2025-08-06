import React, { useEffect, useState } from 'react'
import axios from '../Api/axiosInstance'
import useRegistration from './RegistrationContext/useRegistration'

// Service icons
import AC from '../../public/Registration/AC.svg'
import Beauty from '../../public/Registration/Beauty.svg'
import Appliance from '../../public/Registration/Appliance.svg'
import Painter from '../../public/Registration/painter.svg'
import Cleaning from '../../public/Registration/cleaning.svg'
import Plumber from '../../public/Registration/Plimber.svg'
import Electrician from '../../public/Registration/Electricion.svg'
import Shifting from '../../public/Registration/Shifting.svg'
import Men from '../../public/Registration/Men.svg'

// Map service names to icons
const serviceIcons = {
  'AC Repair': AC,
  Beauty,
  Appliance,
  Painter,
  Cleaning,
  Plumber,
  Electrician,
  Shifting,
  "Men's Salon": Men,
}

const ServicesType = ({ onNext }) => {
  const { formData, updateFormData } = useRegistration()
  useEffect(() => {
    console.log('Updated form data:', formData)
  }, [formData])
  console.log('Updated form data services:', formData)
  const selectedServices = formData.services || []

  const [categoryTypes, setCategoryTypes] = useState([]) // [{ _id, name }]
  const [subCategories, setSubCategories] = useState({}) // { service: { categoryTypeId: [subcat objects] } }
  const [selectedSubTypes, setSelectedSubTypes] = useState(
    formData.serviceTypes || {}
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

  // Fetch subcategories by service + categoryType
  useEffect(() => {
    const fetchAllSubCategories = async () => {
      const result = {}

      for (const service of selectedServices) {
        result[service._id] = {}

        for (const category of categoryTypes) {
          try {
            const res = await axios.get(
              '/sub-categories/getSubCategoryByTypeAndCategoryId',
              {
                params: {
                  categoryId: service._id,
                  type: category._id,
                },
              }
            )

            const subcats = res.data?.data || []
            result[service._id][category._id] = subcats
          } catch (err) {
            console.error(
              'Failed fetching for',
              service.name,
              category.name,
              err
            )
          }
        }
      }
      setSubCategories(result)
    }

    if (categoryTypes.length > 0) {
      fetchAllSubCategories()
    }
  }, [selectedServices, categoryTypes])

  const toggleSubType = (service, categoryTypeId, subcat) => {
    setSelectedSubTypes((prev) => {
      const prevService = prev[service] || {}
      const currentList = new Set(
        prevService[categoryTypeId]?.map((item) => item._id) || []
      )

      const exists = currentList.has(subcat._id)

      let newList
      if (exists) {
        newList = prevService[categoryTypeId].filter(
          (item) => item._id !== subcat._id
        )
      } else {
        newList = [...(prevService[categoryTypeId] || []), subcat]
      }

      return {
        ...prev,
        [service]: {
          ...prevService,
          [categoryTypeId]: newList,
        },
      }
    })
  }

  const handleNext = () => {
    updateFormData({ serviceTypes: selectedSubTypes })
    onNext()
  }

  const isSelected = (service, categoryTypeId, subcatId) => {
    return selectedSubTypes?.[service]?.[categoryTypeId]?.some(
      (item) => item._id === subcatId
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md min-h-screen">
      <button className="text-gray-600 mb-4 text-left">{'<'} Back</button>

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
              src={serviceIcons[service.name]}
              alt={service.name}
              className="w-6 h-6 mr-2"
            />
            <h3 className="text-md font-semibold">{service.name}</h3>
          </div>

          {categoryTypes.map((category) => (
            <div key={category._id} className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                {category.name}
              </h4>

              <div className="flex flex-wrap gap-2">
                {(subCategories[service._id]?.[category._id] || []).map(
                  (subcat) => (
                    <button
                      key={subcat._id}
                      onClick={() =>
                        toggleSubType(service._id, category._id, subcat)
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        isSelected(service._id, category._id, subcat._id)
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {subcat.name}
                    </button>
                  )
                )}
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

export default ServicesType
