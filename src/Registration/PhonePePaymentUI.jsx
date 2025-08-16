import React, { useState } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import { useNavigate } from 'react-router-dom'

import phonepe from '../../public/Phonepe.svg'
export default function PhonePePaymentUI() {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { formData } = useRegistration()
  const totalPayable = formData?.totalPayable || 0

  const handlePayment = () => {
    setTimeout(() => {
      setIsModalOpen(true)
    }, 500)
  }

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      {/* Mobile wrapper */}
      <div className="w-full max-w-sm bg-white flex flex-col min-h-screen shadow-lg">
        {/* Top Logo */}
        <div className="flex justify-center items-center space-x-1 mt-5">
          <img src={phonepe} alt="PhonePe" className="w-40" />
          <span className="bg-purple-100 text-purple-800 text-[10px] font-semibold px-1.5 rounded">
            PG
          </span>
        </div>

        {/* Merchant Card */}
        <div className="mt-5 px-4">
          <div className="flex justify-between items-center border rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">
                bw
              </div>
              <div>
                <p className="font-semibold">Bharat Worker</p>
                <p className="text-xs text-gray-500">1 item</p>
              </div>
            </div>
            <p className="font-semibold">₹{totalPayable}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-4 px-4">
          <div className="border rounded-2xl overflow-hidden">
            <div className="flex items-center p-4 space-x-3">
              <img
                src="https://img.icons8.com/color/48/upi.png"
                alt="UPI"
                className="w-6 h-6"
              />
              <div>
                <p className="font-medium text-sm">UPI ID</p>
                <p className="text-xs text-gray-500">
                  Use UPI for quick payments
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 space-x-3">
              <img
                src="https://img.icons8.com/color/48/bank.png"
                alt="Bank"
                className="w-6 h-6"
              />
              <div>
                <p className="font-medium text-sm">Net Banking</p>
                <p className="text-xs text-gray-500">
                  Select from a list of banks
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 space-x-3">
              <img
                src="https://img.icons8.com/color/48/bank-card-back-side.png"
                alt="Cards"
                className="w-6 h-6"
              />
              <div>
                <p className="font-medium text-sm">Credit & Debit Cards</p>
                <p className="text-xs text-gray-500">Save & pay via cards</p>
              </div>
            </div>
            <p className="text-blue-500 text-xs text-center py-2 cursor-pointer">
              See more
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Bottom Section */}
        <div className="border-t px-4 py-4">
          <div className="flex justify-between mb-2">
            <p className="text-gray-500 text-sm">To Pay</p>
            <p className="font-semibold">₹{totalPayable}</p>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-[#003366] text-white py-3 rounded-full font-semibold text-sm"
          >
            Pay now
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-2xl text-center w-80">
              <img
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                alt="Success"
                className="w-20 mx-auto mb-3"
              />
              <h2 className="text-lg font-bold">Payment Successful</h2>
              <p className="text-gray-500 text-sm mb-4">
                Your payment was successful! You can now continue using the
                application.
              </p>
              <button
                onClick={() => navigate('/AppDownloadPage')}
                className="bg-[#003366] text-white px-5 py-2 rounded-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
