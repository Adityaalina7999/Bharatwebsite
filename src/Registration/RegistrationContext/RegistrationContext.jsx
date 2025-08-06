import React, { createContext, useState } from 'react'

const RegistrationContext = createContext()

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    address: '',
    education: '',
    experience: '',
    documents: {},
  })

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  return (
    <RegistrationContext.Provider value={{ formData, updateFormData }}>
      {children}
    </RegistrationContext.Provider>
  )
}

// Do not export `useRegistration` from here!
export default RegistrationContext
