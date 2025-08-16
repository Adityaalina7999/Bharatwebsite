// import React, { useState, useEffect } from 'react'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import { FaFacebookF } from 'react-icons/fa'
// import { FcGoogle } from 'react-icons/fc'
// import { useNavigate } from 'react-router-dom'
// import { auth } from '../Firebase/Setup'
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// import useRegistration from './RegistrationContext/useRegistration'

// const TEST_PHONE = '917999606506' // Without '+', since react-phone-input-2 already removes it

// const PhoneLoginPage = () => {
//   const [phone, setPhone] = useState('')
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const { updateFormData } = useRegistration() // ⬅ added

//   useEffect(() => {
//     try {
//       if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//           auth,
//           'recaptcha-container',
//           {
//             size: 'invisible',
//             callback: (response) => {
//               console.log('reCAPTCHA resolved')
//             },
//           }
//         )
//         window.recaptchaVerifier.render()
//       }
//     } catch (error) {
//       console.error('RecaptchaVerifier init failed:', error)
//     }
//   }, [])

//   const onSignInSubmit = async () => {
//     if (!phone || phone.length < 10) return alert('Enter valid phone number')

//     setLoading(true)
//     const fullPhoneNumber = '+' + phone

//     try {
//       const appVerifier = window.recaptchaVerifier
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         fullPhoneNumber,
//         appVerifier
//       )

//       // ✅ Save in context
//       updateFormData({ phone })

//       // ✅ Also keep in localStorage if needed
//       localStorage.setItem('phone', phone)

//       window.confirmationResult = confirmationResult
//       navigate('/OtpVerificationPage')
//     } catch (error) {
//       console.error('SMS not sent', error)
//       alert(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-start items-center px-4 py-6">
//       <div className="w-full max-w-sm">
//         <h1 className="text-3xl font-semibold text-black mb-1">
//           Welcome to Bharat Worker
//         </h1>
//         <p className="text-gray-500 sm:text-sm text-xs mb-6 mt-4">
//           Your trusted platform to find skilled jobs nearby.
//         </p>

//         <label className="text-sm font-semibold text-black mb-3 mt-4">
//           Phone Number
//         </label>
//         <PhoneInput
//           country={'in'}
//           value={phone}
//           onChange={(phone) => setPhone(phone)}
//           inputClass="!w-full !rounded-xl !pl-14 !py-3 !text-sm !border !border-gray-300"
//           buttonClass="!border-none"
//           containerClass="!mb-5"
//         />

//         <div id="recaptcha-container"></div>

//         <button
//           onClick={onSignInSubmit}
//           disabled={loading}
//           className="bg-[#002f6c] text-white w-full py-3 rounded-full font-semibold text-sm mb-6 flex text-center justify-center"
//         >
//           {loading ? 'Sending OTP...' : 'Log in'}
//         </button>

//         <div className="flex items-center mb-6 mt-3">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-4 text-sm text-gray-400">Or continue with</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         <div className="flex gap-4 justify-center mb-6">
//           <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium">
//             <FcGoogle className="text-xl" />
//             Google
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium text-blue-600">
//             <FaFacebookF className="text-xl" />
//             Facebook
//           </button>
//         </div>

//         <p className="text-center text-sm text-gray-500">
//           Don’t have an account?{' '}
//           <span className="text-blue-600 font-medium cursor-pointer hover:underline">
//             Sign up
//           </span>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default PhoneLoginPage

// ===============================================================================================================
//
//
//
//
import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/Setup'
// import { testPhoneNumber } from '../Firebase/Setup'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import useRegistration from './RegistrationContext/useRegistration'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const PhoneLoginPage = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { updateFormData } = useRegistration()

  useEffect(() => {
    // Cleanup any existing recaptcha verifier
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    }
  }, [])

  const setupRecaptcha = () => {
    return new Promise((resolve, reject) => {
      try {
        // Clear any existing verifier
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear()
        }

        // Create new verifier
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {
              console.log('reCAPTCHA solved', response)
              resolve(response)
            },
            'expired-callback': () => {
              console.warn('reCAPTCHA expired')
              reject(new Error('reCAPTCHA expired'))
            },
            'error-callback': (error) => {
              console.error('reCAPTCHA error', error)
              reject(error)
            },
          }
        )

        // Render the verifier
        window.recaptchaVerifier
          .render()
          .then((widgetId) => {
            console.log('reCAPTCHA rendered with widget ID:', widgetId)
            window.recaptchaWidgetId = widgetId
            resolve(widgetId)
          })
          .catch(reject)
      } catch (error) {
        console.error('Error setting up reCAPTCHA:', error)
        reject(error)
      }
    })
  }

  const onSignInSubmit = async () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }

    setLoading(true)
    setError('')

    const fullPhoneNumber = '+' + phone
    console.log('Attempting to send OTP to:', fullPhoneNumber)

    try {
      // Setup reCAPTCHA
      await setupRecaptcha()

      // Wait a moment for reCAPTCHA to be ready
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const appVerifier = window.recaptchaVerifier

      if (!appVerifier) {
        throw new Error('reCAPTCHA verifier not initialized')
      }

      console.log('Sending verification code...')
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      )

      console.log('SMS sent successfully:', confirmationResult)
      window.confirmationResult = confirmationResult

      // Update form data and navigate
      updateFormData({ phone: fullPhoneNumber })
      localStorage.setItem('phone', fullPhoneNumber)
      navigate('/OtpVerificationPage')
    } catch (error) {
      console.error('Error sending OTP:', error)

      // Handle specific Firebase errors
      let errorMessage = 'Failed to send OTP. Please try again.'

      switch (error.code) {
        case 'auth/invalid-phone-number':
          errorMessage = 'Invalid phone number format'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.'
          break
        case 'auth/invalid-app-credential':
          errorMessage = 'App configuration error. Please contact support.'
          break
        case 'auth/captcha-check-failed':
          errorMessage = 'Captcha verification failed. Please try again.'
          break
        default:
          errorMessage = error.message || errorMessage
      }

      setError(errorMessage)

      // Clear the recaptcha verifier on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start items-center px-4 py-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-black mb-1">
          Welcome to Bharat Worker
        </h1>
        <p className="text-gray-500 sm:text-sm text-xs mb-6 mt-4">
          Your trusted platform to find skilled jobs nearby.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <label className="text-sm font-semibold text-black mb-3 mt-4">
          Phone Number
        </label>
        <PhoneInput
          country={'in'}
          value={phone}
          onChange={(val) => setPhone(val)}
          inputClass="!w-full !rounded-xl !pl-14 !py-3 !text-sm !border !border-gray-300"
          buttonClass="!border-none"
          containerClass="!mb-5"
          disabled={loading}
        />

        <div id="recaptcha-container"></div>

        <button
          onClick={onSignInSubmit}
          disabled={loading || !phone}
          className="bg-[#002f6c] text-white w-full py-3 rounded-full font-semibold text-sm mb-6 flex justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending OTP...' : 'Log in'}
        </button>

        <div className="flex items-center mb-6 mt-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-400">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium">
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium text-blue-600">
            <FaFacebookF className="text-xl" />
            Facebook
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default PhoneLoginPage
