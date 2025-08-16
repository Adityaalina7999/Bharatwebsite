import React from 'react'
import Logo from '../../public/bw.png'
import { FcGoogle } from 'react-icons/fc'

import { FaFacebookF, FaMobileAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const RegistrationMethod = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* ============Logo ================*/}
      <div className="mb-6">
        <img src={Logo} alt="BW Logo" className="w-28" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-black mb-6">Let's you in</h1>

      {/* ================ Buttons ======================*/}
      <div className="w-full max-w-xs space-y-4">
        <Link
          to="/GoogleSinpuppage"
          className="w-full flex items-center gap-3 px-4 py-3 border rounded-xl text-black text-sm font-medium hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-lg" />
          Continue with Google
        </Link>

        <button className="w-full flex items-center gap-3 px-4 py-3 border rounded-xl text-black text-sm font-medium hover:bg-gray-100 transition">
          <FaFacebookF className="text-blue-600 text-lg" />
          Continue with Facebook
        </button>

        <Link
          to="/PhoneLoginPage"
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#002f6c] text-white rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          <FaMobileAlt className="text-lg" />
          Continue with Number
        </Link>
      </div>

      {/*===============================- Footer -============================*/}
      <p className="mt-6 text-sm text-gray-500">
        Already have an account?{' '}
        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
          Log in
        </span>
      </p>
    </div>
  )
}

export default RegistrationMethod
