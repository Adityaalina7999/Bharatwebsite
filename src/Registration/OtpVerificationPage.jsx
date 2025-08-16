import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import axiosInstance from '../Api/axiosInstance'
import { auth } from '../Firebase/Setup'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
console.log('API URL', import.meta.env.VITE_API_BASE_URL)

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  // Get phone/email from localStorage
  const phone = localStorage.getItem('phone')
  const email = localStorage.getItem('emailForSignIn')

  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // --- Verify Phone OTP ---
  const verifyPhoneOtp = async (otpCode) => {
    try {
      const result = await window.confirmationResult.confirm(otpCode)
      const firebaseToken = await result.user.getIdToken()
      console.log('Firebase ID Token:', firebaseToken)

      const response = await axiosInstance.post(
        `${API_BASE_URL}/webpartner/webotpVerification`,
        { phone }
      )

      const data = response.data
      if (data.success) {
        localStorage.setItem('jwt', data.data.token)
        navigate('/AboutYouForm')
      } else {
        alert(data.message || 'OTP verification failed')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      alert('Invalid OTP or session expired')
    }
  }

  // --- Verify Email Link ---
  const verifyEmailLink = async () => {
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        )
        const firebaseToken = await result.user.getIdToken()
        console.log('Email login success, token:', firebaseToken)

        localStorage.setItem('jwt', firebaseToken)
        navigate('/AboutYouForm')
      } else {
        alert('Invalid or expired email link.')
      }
    } catch (error) {
      console.error('Email link verification error:', error)
      alert('Email verification failed')
    }
  }

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('')

    if (phone) {
      if (otpCode.length < 6) {
        alert('Please enter the full OTP')
        return
      }
      await verifyPhoneOtp(otpCode)
    } else if (email) {
      await verifyEmailLink()
    } else {
      alert('No phone or email found in session')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[375px] h-[812px] bg-white shadow-md rounded-xl px-4 pt-8 pb-6 flex flex-col justify-between">
        <div>
          <button className="rounded-full flex items-center justify-center mb-6">
            <FaArrowLeft className="mr-2" size={18} />
          </button>

          <h2 className="text-2xl font-bold mb-2">Verification Code</h2>

          {phone ? (
            <p className="text-gray-500 mb-6">
              We’ve sent a 6-digit OTP to{' '}
              <span className="font-medium">+91 {phone}</span>
            </p>
          ) : (
            <p className="text-gray-500 mb-6">
              We’ve sent a verification link to{' '}
              <span className="font-medium">{email}</span>
            </p>
          )}

          {/* Show OTP boxes only if Phone login */}
          {phone && (
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          )}

          {/* Timer (only for Phone OTP) */}
          {phone && (
            <p className="text-center text-gray-500 text-sm mb-6">
              Code expires in:{' '}
              <span className="font-medium">
                0:{timer.toString().padStart(2, '0')}
              </span>
            </p>
          )}

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-blue-900 text-white py-3 rounded-full font-semibold text-lg"
          >
            Next
          </button>

          {/* Resend (only for Phone OTP) */}
          {phone && (
            <p className="text-center text-gray-500 text-sm mt-6">
              Didn’t receive OTP?{' '}
              <button
                onClick={() => setTimer(30)}
                disabled={timer !== 0}
                className={`font-medium ${
                  timer === 0
                    ? 'text-blue-700'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Resend Code
              </button>
            </p>
          )}
        </div>

        <div className="text-center text-sm text-gray-400">
          {phone ? 'Code sent' : 'Email link sent'}
        </div>
      </div>
    </div>
  )
}

export default OtpVerificationPage
