import React, { useState } from 'react'
// import PhoneLoginPage from './PhoneLoginPage'
// import OtpVerificationPage from './OtpVerificationPage'
import AboutYouForm from './Registration'
import Services from './Services'
import ServicesType from './ServicesType'
import Experience from './Experience'
import AddressWork from './AddressWork'
import VerifyDocument from './VerifyDocument'
import SubscriptionPlan from './SubscriptionPlan'
import PaymentTransactionDetails from './PaymentTransactionDetails'
import PhonePePaymentUI from './PhonePePaymentUI'

const steps = [
  // PhoneLoginPage,
  // OtpVerificationPage,
  AboutYouForm,
  Services,
  ServicesType,
  Experience,
  AddressWork,
  VerifyDocument,
  SubscriptionPlan,
  PaymentTransactionDetails,
  PhonePePaymentUI,
]

const RegistrationFlow = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const StepComponent = steps[stepIndex]

  const goNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
  const goBack = () => setStepIndex((prev) => Math.max(prev - 1, 0))

  return (
    <div>
      <StepComponent onNext={goNext} onBack={goBack} />
    </div>
  )
}

export default RegistrationFlow
