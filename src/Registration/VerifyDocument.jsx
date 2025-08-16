import React, { useState } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'
import axios from '../Api/axiosInstance'

const VerifyDocument = ({ onNext, onBack }) => {
  const { formData } = useRegistration()

  const [idType, setIdType] = useState(
    formData.documents?.idType || 'Aadhar Card'
  )
  const [idNumber, setIdNumber] = useState(formData.documents?.idNumber || '')
  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)
  const [certificateFile, setCertificateFile] = useState(null)

  const handleFileChange = (e, setter) => {
    if (e.target.files[0]) setter(e.target.files[0])
  }

  const removeFile = (setter) => setter(null)

  const handleSubmit = async () => {
    try {
      // Validation
      if (idType === 'Aadhar Card') {
        const aadharRegex = /^[0-9]{12}$/
        if (!aadharRegex.test(idNumber)) {
          alert('Please enter a valid 12-digit Aadhar number.')
          return
        }
      }

      if (idType === 'PAN Card') {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
        if (!panRegex.test(idNumber)) {
          alert('Please enter a valid PAN number (e.g., ABCDE1234F).')
          return
        }
      }

      const formDataObj = new FormData()

      if (idType === 'Aadhar Card') {
        formDataObj.append('aadharNo', idNumber)
        formDataObj.append('isAadharCard', 'true')
        if (frontFile) formDataObj.append('aadharFront', frontFile)
        if (backFile) formDataObj.append('aadharBack', backFile)
      }
      if (idType === 'PAN Card') {
        formDataObj.append('panNo', idNumber)
        formDataObj.append('isPanCard', 'true')
        if (frontFile) formDataObj.append('panFront', frontFile)
        if (backFile) formDataObj.append('panBack', backFile)
      }
      if (certificateFile) {
        formDataObj.append('experienceCertificates', certificateFile)
      }

      const res = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/webpartner/uploadPartnerDocuments`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (res.data.success) onNext()
      else alert(res.data.message)
    } catch (err) {
      console.error(err)
      alert('Error uploading documents')
    }
  }

  const UploadBox = ({ file, setFile, label }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium mb-2">{label}</label>
      {file ? (
        <div className="border-2 border-dashed border-blue-400 rounded-lg h-20 flex items-center justify-between px-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="max-h-full max-w-full rounded"
              />
            </div>
          </div>
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => removeFile(setFile)}
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-blue-400 rounded-lg h-20 flex items-center justify-center text-gray-400 text-xs cursor-pointer">
          upload ID Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, setFile)}
          />
        </label>
      )}
    </div>
  )

  return (
    <div className="max-w-sm mx-auto p-5 min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-5">
        <button onClick={onBack} className="flex items-center text-gray-600">
          <FaArrowLeft className="mr-1" size={16} />
        </button>
        <button className="text-sm text-gray-500" onClick={onNext}>
          Skip
        </button>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold">Verify Your Identity</h2>
      <p className="text-sm text-gray-500 mb-6">
        Upload your ID and certificates to get verified faster.
      </p>

      {/* Select ID */}
      <label className="block text-sm font-medium mb-2">
        Select Government ID
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-5"
        value={idType}
        onChange={(e) => setIdType(e.target.value)}
      >
        <option value="Aadhar Card">Aadhar Card</option>
        <option value="PAN Card">PAN Card</option>
      </select>

      {/* ID No */}
      <label className="block text-sm font-medium mb-2">Enter ID No.</label>
      <input
        type="text"
        placeholder={
          idType === 'Aadhar Card'
            ? 'Enter 12-digit Aadhar'
            : 'Enter PAN (ABCDE1234F)'
        }
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-5 uppercase"
        value={idNumber}
        onChange={(e) =>
          setIdNumber(e.target.value.toUpperCase().replace(/\s/g, ''))
        }
      />

      {/* File Uploads */}
      <UploadBox file={frontFile} setFile={setFrontFile} label="Front Side" />
      <UploadBox file={backFile} setFile={setBackFile} label="Back Side" />
      <UploadBox
        file={certificateFile}
        setFile={setCertificateFile}
        label="Work License or Certificates"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-[#003366] text-white py-3 rounded-full text-sm font-medium"
      >
        Save & Continue
      </button>
    </div>
  )
}

export default VerifyDocument
