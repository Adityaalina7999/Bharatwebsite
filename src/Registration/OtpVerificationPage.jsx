import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [timer, setTimer] = useState(30)

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return

    let newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    // Auto focus next input
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 pt-6">
      <div className="w-full max-w-sm">
        {/* Back Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full border text-xl mb-6">
          <FaArrowLeft />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">Verification Code</h2>
        <p className="text-sm text-gray-500 mb-6">
          We’ve sent a 6-digit OTP to <span className="font-medium">{}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:border-blue-600"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-500 mb-6">
          Code expires in:{' '}
          <span className="font-semibold">
            0:{timer.toString().padStart(2, '0')}
          </span>
        </p>

        {/* Next Button */}
        <Link
          to="/AboutYouForm"
          className="bg-[#002f6c] text-white w-full py-3 rounded-full font-semibold text-sm mb-4 flex justify-center"
        >
          Next
        </Link>

        {/* Resend Link */}
        <p className="text-center text-sm text-gray-500">
          Did not receive OTP?{' '}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Resend Code
          </span>
        </p>
      </div>

      {/* Footer Message */}
      <div className="w-full max-w-sm mt-auto mb-4 text-center text-xs text-gray-400">
        Code sent
      </div>
    </div>
  )
}

export default OtpVerificationPage
