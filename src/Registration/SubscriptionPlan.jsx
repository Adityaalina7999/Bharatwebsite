import React, { useState, useEffect } from 'react'
import axios from '../Api/axiosInstance'
import useRegistration from './RegistrationContext/useRegistration'
import { FaArrowLeft } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const SubscriptionPlan = ({ onNext, onBack }) => {
  const { updateFormData, formData } = useRegistration()
  const [billingCycle, setBillingCycle] = useState(
    formData.planType || 'monthly'
  )
  const [selectedPlan, setSelectedPlan] = useState(formData.plan || '')
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('/subscription-plans')
        if (res.data.success) {
          setPlans(res.data.data)
        }
      } catch (error) {
        console.error('Error fetching subscription plans:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const handleSelectPlan = () => {
    const planDetails = plans.find(
      (p) => p._id === selectedPlan && p.price_type === billingCycle
    )

    if (!planDetails) return

    updateFormData({
      planType: billingCycle,
      plan: selectedPlan,
      selectedPlanDetails: {
        _id: planDetails._id,
        name: planDetails.name,
        mrp: planDetails.mrp,
        price: planDetails.price,
        features: planDetails.features,
        price_type: planDetails.price_type,
      },
      subscriptionPlans: [planDetails._id],
    })

    onNext()
  }

  const filteredPlans = plans.filter((p) => p.price_type === billingCycle)

  return (
    <div className="max-w-md mx-auto px-6 py-4 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-sm text-gray-600">
          <FaArrowLeft className="mr-2" size={18} />
        </button>
        <button className="text-sm text-gray-500" onClick={onNext}>
          Skip
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Subscription Plan
      </h2>
      <p className="text-sm text-gray-400 mb-6 mt-3">
        Choose a plan that fits your goals. Get more job visibility, instant
        payouts, priority support, and exclusive bonuses.
      </p>

      {/* Plan Toggle */}
      <div className="bg-gray-100 rounded-full p-1 flex items-center justify-between w-64 mx-auto mb-6 relative">
        <div
          className={`absolute top-1 left-1 w-28 h-8 bg-blue-900 rounded-full transition-transform duration-300 ${
            billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'
          }`}
        ></div>

        <button
          onClick={() => setBillingCycle('monthly')}
          className={`w-1/2 z-10 text-sm font-semibold py-1 transition-colors duration-300 ${
            billingCycle === 'monthly' ? 'text-white' : 'text-gray-700'
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBillingCycle('yearly')}
          className={`w-1/2 z-10 text-sm font-semibold py-1 transition-colors duration-300 flex items-center justify-center gap-1 ${
            billingCycle === 'yearly' ? 'text-white' : 'text-gray-700'
          }`}
        >
          Yearly
          {billingCycle === 'yearly' && (
            <span className="bg-white text-blue-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
              40% OFF
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading plans...</p>
      ) : filteredPlans.length === 0 ? (
        <p className="text-center text-gray-500">No plans available</p>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          onSlideChange={
            (swiper) => setSelectedPlan(filteredPlans[swiper.activeIndex]._id) // store id instead of name
          }
        >
          {filteredPlans.map((plan) => (
            <SwiperSlide key={plan._id}>
              <div
                className={`${
                  selectedPlan === plan._id
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-800'
                } p-5 rounded-2xl shadow-lg mb-8 transition-all duration-300`}
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>

                <div className="flex items-center gap-2 text-sm mt-1 mb-2">
                  {plan.mrp !== plan.price && (
                    <span
                      className={`line-through ${
                        selectedPlan === plan._id
                          ? 'text-gray-300'
                          : 'text-gray-500'
                      }`}
                    >
                      ₹{plan.mrp}
                    </span>
                  )}
                  <span className="text-2xl font-bold">₹{plan.price}</span>
                  <span className="text-sm">/{billingCycle}</span>
                </div>

                <p
                  className={`text-sm mb-4 ${
                    selectedPlan === plan._id
                      ? 'text-gray-100'
                      : 'text-gray-600'
                  }`}
                >
                  {plan.discription}
                </p>

                <hr
                  className={`${
                    selectedPlan === plan._id
                      ? 'border-gray-700'
                      : 'border-gray-300'
                  } mb-4`}
                />

                <ul className="text-sm space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedPlan(plan._id)
                    handleSelectPlan()
                  }}
                  className={`mt-6 w-full ${
                    selectedPlan === plan._id
                      ? 'bg-white text-blue-900'
                      : 'bg-blue-900 text-white'
                  } font-semibold py-2 rounded-full shadow hover:opacity-90 transition`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default SubscriptionPlan
