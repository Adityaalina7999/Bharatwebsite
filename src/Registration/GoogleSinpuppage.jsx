import React, { useState } from 'react'
import { auth } from '../Firebase/Setup'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { FaFacebookF, FaArrowLeft } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { HiMail } from 'react-icons/hi'
import useRegistration from './RegistrationContext/useRegistration'
import { Link } from 'react-router-dom'
import axios from '../Api/axiosInstance'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const EmailSignupPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [isValidatingEmail, setIsValidatingEmail] = useState(false)
  const { updateFormData } = useRegistration()

  // Dedicated email validation function
  const validateEmailAddress = async (emailAddress) => {
    try {
      setIsValidatingEmail(true)
      setMessage('')
      setSuccess('')

      const response = await axios.post(
        `${API_BASE_URL}/webpartner/validateEmail`,
        {
          email: emailAddress,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      )

      return {
        success: response.data.success,
        emailExists: response.data.emailExists || false,
        message: response.data.message,
      }
    } catch (error) {
      console.error('Email validation error:', error)

      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          emailExists: false,
          message: 'Request timeout. Please check your internet connection.',
        }
      }

      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response

        switch (status) {
          case 409:
            // Email already exists
            return {
              success: false,
              emailExists: true,
              message: data.message || 'Email is already registered',
            }
          case 400:
            return {
              success: false,
              emailExists: false,
              message: data.message || 'Invalid email format',
            }
          case 500:
            return {
              success: false,
              emailExists: false,
              message: 'Server error. Please try again later.',
            }
          default:
            return {
              success: false,
              emailExists: false,
              message: data.message || 'Error validating email',
            }
        }
      } else if (error.request) {
        // Network error
        return {
          success: false,
          emailExists: false,
          message: 'Network error. Please check your internet connection.',
        }
      } else {
        return {
          success: false,
          emailExists: false,
          message: 'Unexpected error occurred. Please try again.',
        }
      }
    } finally {
      setIsValidatingEmail(false)
    }
  }

  const sendFirebaseEmailLink = async (emailAddress) => {
    const actionCodeSettings = {
      url: `${import.meta.env.VITE_API_FRONTEND_URL}/AboutYouForm`,
      handleCodeInApp: true,
    }

    try {
      await sendSignInLinkToEmail(auth, emailAddress, actionCodeSettings)
      return { success: true }
    } catch (error) {
      console.error('Firebase email link error:', error)

      let errorMessage = 'Error sending email. Please try again.'

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format'
          break
        case 'auth/user-disabled':
          errorMessage = 'This email has been disabled'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.'
          break
        case 'auth/quota-exceeded':
          errorMessage = 'Email quota exceeded. Please try again later.'
          break
        default:
          errorMessage = error.message || errorMessage
      }

      return { success: false, error: errorMessage }
    }
  }

  const handleSendOtp = async () => {
    // Basic email format validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setMessage('')
    setSuccess('')

    const trimmedEmail = email.trim()
    console.log('Starting email registration process for:', trimmedEmail)

    try {
      // Step 1: Validate email with backend
      console.log('Step 1: Validating email address...')
      const validationResult = await validateEmailAddress(trimmedEmail)

      if (validationResult.emailExists) {
        setMessage(validationResult.message)
        return
      }

      if (!validationResult.success) {
        setMessage(validationResult.message)
        return
      }

      console.log('Email is available for registration')
      setSuccess('Email verified. Sending verification link...')

      // Step 2: Send Firebase email link
      console.log('Step 2: Sending Firebase email link...')
      const emailResult = await sendFirebaseEmailLink(trimmedEmail)

      if (!emailResult.success) {
        throw new Error(emailResult.error)
      }

      // Step 3: Success - Update form data and show success message
      console.log('Email verification link sent successfully')
      updateFormData({ email: trimmedEmail })
      window.localStorage.setItem('emailForSignIn', trimmedEmail)

      setSuccess(
        'Verification link sent to your email. Please check your inbox and spam folder.'
      )
      setMessage('')
    } catch (error) {
      console.error('Email registration process error:', error)
      setMessage(error.message || 'Registration failed. Please try again.')
      setSuccess('')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    updateFormData({ email: value })

    // Clear messages when user starts typing
    if (message) setMessage('')
    if (success) setSuccess('')
  }

  const isButtonDisabled = loading || isValidatingEmail || !email

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start items-center px-4 py-6">
      <div className="w-full max-w-sm">
        {/* Back Button */}
        <Link
          to="/registration"
          className="flex items-center text-gray-600 mb-8 p-2 -ml-2"
        >
          <FaArrowLeft className="text-lg" />
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-black mb-2">
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Access training, get verified, and unlock higher-paying jobs with
          performance-based rewards.
        </p>

        {/* Email Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Error Message Display */}
        {message && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        {/* Success Message Display */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        {/* Sign Up Button */}
        <button
          onClick={handleSendOtp}
          disabled={isButtonDisabled}
          className="w-full bg-[#002f6c] hover:bg-[#003d7a] text-white py-3 rounded-full font-semibold text-sm mb-6 flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isValidatingEmail ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Validating email...
            </>
          ) : loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Sending...
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-400">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        {/* <div className="flex gap-4 justify-center mb-8">
          <button
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex-1 justify-center"
            disabled={isButtonDisabled}
          >
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex-1 justify-center"
            disabled={isButtonDisabled}
          >
            <FaFacebookF className="text-xl" />
            Facebook
          </button>
        </div> */}

        {/* Footer */}
        <Link
          to="/AppDownloadPage"
          className="text-center flex justify-center text-sm text-gray-500"
        >
          Already have an account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Log in
          </span>
        </Link>
      </div>
    </div>
  )
}

export default EmailSignupPage
