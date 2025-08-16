import React, { useState } from 'react'
import { auth } from '../Firebase/Setup'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { FaFacebookF, FaArrowLeft } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { HiMail } from 'react-icons/hi'
import useRegistration from './RegistrationContext/useRegistration'
import { Link } from 'react-router-dom'

const EmailSignupPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateFormData } = useRegistration()

  const handleSendOtp = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setMessage('')

    const actionCodeSettings = {
      url: `${import.meta.env.VITE_API_FRONTEND_URL}/AboutYouForm`,
      handleCodeInApp: true,
    }

    try {
      await sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings)
      updateFormData({ email: email.trim() })
      window.localStorage.setItem('emailForSignIn', email.trim())
      setMessage(
        'Verification link sent to your email. Please check your inbox.'
      )
    } catch (error) {
      console.error(error)
      setMessage(error.message || 'Error sending email. Try again.')
    } finally {
      setLoading(false)
    }
  }

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
              onChange={(e) => {
                setEmail(e.target.value)
                updateFormData({ email: e.target.value })
                if (message) setMessage('') // Clear message when typing
              }}
              className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              disabled={loading}
            />
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('sent') || message.includes('check')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* Sign Up Button */}
        <button
          onClick={handleSendOtp}
          disabled={loading || !email}
          className="w-full bg-[#002f6c] hover:bg-[#003d7a] text-white py-3 rounded-full font-semibold text-sm mb-6 flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
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
        <div className="flex gap-4 justify-center mb-8">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex-1 justify-center">
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex-1 justify-center">
            <FaFacebookF className="text-xl" />
            Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}

export default EmailSignupPage
