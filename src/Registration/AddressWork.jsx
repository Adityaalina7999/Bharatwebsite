import React, { useState } from 'react'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa'
import axios from '../Api/axiosInstance'

const libraries = ['places']

const AddressWork = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()
  const [autocomplete, setAutocomplete] = useState(null)

  const [addressInfo, setAddressInfo] = useState({
    address: formData.address?.address || '',
    country: formData.address?.country || 'India',
    state: formData.address?.state || '',
    city: formData.address?.city || '',
    pincode: formData.address?.pincode || '',
    serviceAreaDistance: formData.address?.distance || 40,
    latitude: formData.address?.latitude || null,
    longitude: formData.address?.longitude || null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddressInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDistanceChange = (e) => {
    setAddressInfo((prev) => ({
      ...prev,
      serviceAreaDistance: parseInt(e.target.value, 10),
    }))
  }

  const handleNext = async () => {
    try {
      // Save in context
      updateFormData({ address: addressInfo })

      // Send to backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/webpartner/workLocationUpdate`,
        addressInfo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      console.log('Work location updated:', res.data)
      if (res.data.success) {
        onNext()
      } else {
        alert(res.data.message || 'Failed to update work location')
      }
    } catch (err) {
      console.error(err)
      alert('Error updating work location')
    }
  }

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      const lat = place.geometry?.location?.lat()
      const lng = place.geometry?.location?.lng()

      // Extract city, state, pincode from address_components
      let city = ''
      let state = ''
      let country = ''
      let pincode = ''

      place.address_components?.forEach((component) => {
        const types = component.types
        if (types.includes('locality')) {
          city = component.long_name
        }
        if (types.includes('administrative_area_level_1')) {
          state = component.long_name
        }
        if (types.includes('country')) {
          country = component.long_name
        }
        if (types.includes('postal_code')) {
          pincode = component.long_name
        }
      })

      setAddressInfo((prev) => ({
        ...prev,
        address: place.formatted_address || '',
        latitude: lat || null,
        longitude: lng || null,
        city: city || prev.city,
        state: state || prev.state,
        country: country || prev.country,
        pincode: pincode || prev.pincode,
      }))
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md min-h-screen">
        <button
          onClick={onBack}
          className="text-gray-600 mb-4 text-left flex items-center"
        >
          <FaArrowLeft className="mr-2" />
        </button>

        <h2 className="text-2xl font-bold mb-1 text-gray-900">
          Where Do You Work?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose the areas where you can accept jobs.
        </p>

        {/* Address with Google Autocomplete */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <div className="relative">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter Address"
                value={addressInfo.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm"
              />
            </Autocomplete>
            <FaMapMarkerAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Country + State */}
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            > 
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={addressInfo.country}
              onChange={handleChange}
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
          <select
            id="state"
            name="state"
            value={addressInfo.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select state</option>
            <option value={addressInfo.state}>{addressInfo.state}</option>
          </select>
        </div>

        {/* City + Pincode */}
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City / Town
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter City"
              value={addressInfo.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter Pin"
              value={addressInfo.pincode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Distance Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Areas Distance
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={addressInfo.distance}
            onChange={handleDistanceChange}
            className="w-full accent-blue-700"
          />
          <div className="text-right text-sm text-gray-600 mt-1">
            {addressInfo.serviceAreaDistance} km
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-800 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
        >
          Next
        </button>
      </div>
    </LoadScript>
  )
}

export default AddressWork
