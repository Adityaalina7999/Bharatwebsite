import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FaArrowLeft, FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const PhoneLoginPage = () => {
  const [phone, setPhone] = useState('')

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start items-center px-4 py-6">
      <div className="w-full max-w-sm">
        {/* Headings */}
        <h1 className="text-3xl font-semibold text-black mb-1">
          Welcome to Bharat Worker
        </h1>
        <p className="text-gray-500 sm:text-sm text-xs mb-6 mt-4">
          Your trusted platform to find skilled jobs nearby.
        </p>

        {/* Phone Input */}
        <label className="text-sm font-semibold text-black mb-3 mt-4">
          Phone Number
        </label>
        <PhoneInput
          country={'in'}
          value={phone}
          onChange={(phone) => setPhone(phone)}
          inputClass="!w-full !rounded-xl !pl-14 !py-3 !text-sm !border !border-gray-300"
          buttonClass="!border-none"
          containerClass="!mb-5"
        />

        {/* Login Button */}

        <Link
          to="/OtpVerificationPage"
          className="bg-[#002f6c] text-white w-full py-3 rounded-full font-semibold text-sm mb-6 flex text-center justify-center"
        >
          Log in
        </Link>

        {/* Divider */}
        <div className="flex items-center mb-6 mt-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-400">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Logins */}
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

        {/* Signup Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default PhoneLoginPage
