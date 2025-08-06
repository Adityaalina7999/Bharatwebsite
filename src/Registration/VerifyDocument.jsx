import React, { useState } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'

const VerifyDocument = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()

  const [idType, setIdType] = useState(
    formData.documents?.idType || 'Aadhar Card'
  )
  const [idNumber, setIdNumber] = useState(formData.documents?.idNumber || '')
  const [frontImage, setFrontImage] = useState(
    formData.documents?.frontImage || null
  )
  const [backImage, setBackImage] = useState(
    formData.documents?.backImage || null
  )
  const [certificateImage, setCertificateImage] = useState(
    formData.documents?.certificateImage || null
  )

  const handleImageChange = (e, setter) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setter(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    updateFormData({
      documents: {
        idType,
        idNumber,
        frontImage,
        backImage,
        certificateImage,
      },
    })
    onNext()
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md min-h-screen">
      {/* Back and Skip */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-sm text-gray-600">
          <FaArrowLeft className="mr-2" />
        </button>
        <button className="text-sm text-blue-700">Skip</button>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Verify Your Identity
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload your ID and certificates to get verified faster.
      </p>

      {/* Select Government ID */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Government ID
      </label>
      <select
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
        value={idType}
        onChange={(e) => setIdType(e.target.value)}
      >
        <option value="Aadhar Card">Aadhar Card</option>
        <option value="PAN Card">PAN Card</option>
        <option value="Voter ID">Voter ID</option>
        <option value="Driving License">Driving License</option>
      </select>

      {/* Enter ID Number */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter ID No.
      </label>
      <input
        type="text"
        placeholder="Enter ID Number"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
      />

      {/* Upload Front Side */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Front Side
        </label>
        {frontImage ? (
          <div className="relative border-2 border-dashed border-blue-400 rounded-md p-2">
            <img src={frontImage} alt="Front" className="w-full rounded-md" />
            <button
              className="absolute top-1 right-2 text-red-600 text-sm"
              onClick={() => setFrontImage(null)}
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-blue-400 rounded-md px-3 py-6 text-center text-sm text-gray-400 cursor-pointer block">
            Upload ID Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, setFrontImage)}
            />
          </label>
        )}
      </div>

      {/* Upload Back Side */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Back Side
        </label>
        <label className="border-2 border-dashed border-blue-400 rounded-md px-3 py-6 text-center text-sm text-gray-400 cursor-pointer block">
          {backImage ? (
            <img src={backImage} alt="Back" className="w-full rounded-md" />
          ) : (
            'Upload ID Image'
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setBackImage)}
          />
        </label>
      </div>

      {/* Upload Work License or Certificate */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Work License or Certificates
        </label>
        <label className="border-2 border-dashed border-blue-400 rounded-md px-3 py-6 text-center text-sm text-gray-400 cursor-pointer block">
          {certificateImage ? (
            <img
              src={certificateImage}
              alt="Certificate"
              className="w-full rounded-md"
            />
          ) : (
            'Upload ID Image'
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setCertificateImage)}
          />
        </label>
      </div>
      <p className="text-sm text-gray-400 mb-4 text-center">
        Documents will be review by the admin with in 24 hours.
      </p>
      {/* Save & Continue */}
      <button
        onClick={handleNext}
        className="w-full bg-blue-800 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
      >
        Save & Continue
      </button>
    </div>
  )
}

export default VerifyDocument
