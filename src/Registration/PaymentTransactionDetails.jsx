import React, { useState } from 'react'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'
import axios from '../Api/axiosInstance'

const PaymentTransactionDetails = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRegistration()
  const planData = formData.selectedPlanDetails || {}
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)

  const handleApplyPromo = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('You must be logged in to apply a promo code.')
        return
      }

      const { data } = await axios.post(
        '/webpartner/add-subscription-plan',
        {
          referralOrCoupon: promoCode.trim(),
          subscriptionplans: planData._id,
          planPrice: planData.price,
          totalPayable: planData.price, // backend applies discount
          codeType: 'coupon code', // or "referral code"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const coupon = data.data[0] // first coupon in array
        console.log('couponcoupon', coupon)
        let discountValue = 0

        if (coupon.discountType === '%') {
          discountValue = (planData.price * coupon.discountAmount) / 100
        } else {
          discountValue = coupon.discountAmount
        }
        console.log('discountValue discountValue', discountValue)
        setDiscount(discountValue)
        setCouponApplied(true)
      } else {
        alert(data.message || 'Invalid code')
        setDiscount(0)
        setCouponApplied(false)
      }
    } catch (err) {
      console.error(err)
      alert('Error applying promo')
    }
  }

  const totalPayable = (planData.price || 0) - discount

  const handleProceed = async () => {
    try {
      const endpoint = couponApplied
        ? '/webpartner/add-subscription-plan'
        : '/webpartner/subscription-without-code'

      const body = {
        subscriptionplans: planData._id,
        planPrice: planData.price,
        totalPayable: totalPayable,
      }

      if (couponApplied) {
        body.referralOrCoupon = promoCode.trim()
        body.codeType = 'coupon code'
      }

      const { data } = await axios.post(endpoint, body)

      if (data.success) {
        updateFormData({
          ...formData,
          totalPayable: totalPayable,
        })
        onNext()
      } else {
        alert(data.message || 'Failed to proceed with subscription')
      }
    } catch (err) {
      console.error(err)
      alert('Error while proceeding to subscription')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 mb-4"
      >
        <FaArrowLeft className="mr-2" size={18} />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold">Payment Transaction Details</h2>
      <p className="text-sm text-gray-500 mb-4">
        View full details of your payment including amount, status, method, and
        date of transaction.
      </p>

      {/* Plan Card */}
      <div className="border rounded-lg p-4 flex gap-4 items-start">
        <div className="bg-blue-100 p-2 rounded">
          <span className="text-blue-500 text-2xl">💎</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {planData.mrp !== planData.price && (
              <span className="line-through text-gray-400 text-sm">
                ₹{planData.mrp}
              </span>
            )}
            <span className="text-lg font-semibold">₹{planData.price}</span>
            <span className="text-sm text-gray-500">
              /{planData.billingCycle}
            </span>
          </div>
          <h3 className="font-semibold mt-1">{planData.name}</h3>
          <p className="text-sm text-gray-500">
            {(planData.features || []).join(', ')}
          </p>
          <button className="text-blue-500 text-sm mt-1 underline">
            Edit Plan
          </button>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6">
        <label className="text-sm font-medium">Add promo code</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Example: SAVE50"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={handleApplyPromo}
            className="bg-blue-500 text-white px-4 rounded-lg"
          >
            Apply
          </button>
        </div>
        {couponApplied && (
          <div className="bg-yellow-100 text-yellow-800 text-sm py-2 px-3 rounded mt-2">
            🎉 Congrats! Coupon Applied: ₹{discount} OFF
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Price Summary</h4>
        <div className="flex justify-between text-sm py-1">
          <span>Plan Price</span>
          <span>₹{planData.price}</span>
        </div>
        <div className="flex justify-between text-sm py-1 text-red-500">
          <span>Discount ({promoCode || '—'})</span>
          <span>- ₹{discount}</span>
        </div>
        <div className="flex justify-between font-semibold text-base mt-2 border-t pt-2">
          <span>Total Payable</span>
          <span className="text-blue-500">₹{totalPayable}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border rounded-lg py-2 text-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleProceed}
          className="flex-1 bg-blue-600 text-white rounded-lg py-2"
        >
          Proceed
        </button>
      </div>
    </div>
  )
}

export default PaymentTransactionDetails
