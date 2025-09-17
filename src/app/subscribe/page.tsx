'use client'

import React, { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useUser } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'

// Dynamically import PaystackPayment to avoid SSR issues
const PaystackPayment = dynamic(() => import('@/components/PaystackPayment'), {
  ssr: false
})

interface SubscriptionPlan {
  id: string
  name: string
  price: number // in GHS
  originalPrice?: number
  interval: 'monthly' | 'annual'
  description: string
  features: string[]
  popular?: boolean
  savings?: string
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Access',
    price: 25.00, // 25 GHS
    interval: 'monthly',
    description: 'Perfect for trying out our premium content',
    features: [
      'Unlimited access to all articles',
      'Premium interviews & reports',
      'Exclusive industry insights',
      'Mobile & desktop access',
      'Email support'
    ]
  },
  {
    id: 'annual',
    name: 'Annual Access',
    price: 250.00, // 250 GHS
    originalPrice: 300.00, // 25 * 12 = 300
    interval: 'annual',
    description: 'Best value for committed readers',
    features: [
      'Everything in Monthly',
      'Priority customer support',
      'Early access to new features',
      'Exclusive member events',
      'Download articles for offline reading',
      'Advanced analytics dashboard'
    ],
    popular: true,
    savings: 'Save 17%'
  }
]

export default function SubscribePage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(subscriptionPlans[1]) // Default to annual
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const user = useUser();
  const userEmailData = user?.user?.email;

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePayment = async () => {
    if (!userEmailData) {
      redirect('/auth/login')
      return
    }
    // Payment will be handled by the PaystackPayment component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Subscription
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get unlimited access to premium energy industry content, exclusive interviews, and in-depth analysis.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subscription Plans */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {subscriptionPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: plan.id === 'monthly' ? 0 : 0.1 }}
                  className={`relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    selectedPlan.id === plan.id
                      ? 'border-brand-blue shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${plan.popular ? 'ring-2 ring-brand-blue ring-opacity-20' : ''}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">
                          ₵{plan.price.toFixed(2)}
                        </span>
                        <span className="text-gray-500 ml-2">
                          /{plan.interval === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {plan.originalPrice && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg text-gray-400 line-through">
                            ₵{plan.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm font-medium text-emerald-600">
                            {plan.savings}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan.id === plan.id
                        ? 'border-brand-blue bg-brand-blue'
                        : 'border-gray-300'
                    }`}>
                      {selectedPlan.id === plan.id && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{selectedPlan.name}</span>
                    <span className="font-semibold text-gray-900">
                      ₵{selectedPlan.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {selectedPlan.originalPrice && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Original Price</span>
                      <span className="text-gray-400 line-through">
                        ₵{selectedPlan.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-brand-blue">
                        ₵{selectedPlan.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Billed {selectedPlan.interval === 'monthly' ? 'monthly' : 'annually'}
                    </p>
                  </div>
                </div>

                

                {/* Payment Button */}
                {isClient && userEmailData ? (
                  <PaystackPayment
                    email={userEmailData}
                    amount={selectedPlan.price}
                    onSuccess={(reference) => {
                      router.push(`/subscribe/success?reference=${reference.reference}`)
                    }}
                    onClose={() => {
                      setIsLoading(false)
                    }}
                  >
                    {({ handlePayment, isLoading: paymentLoading }) => (
                      <button
                        onClick={handlePayment}
                        disabled={paymentLoading}
                        className="w-full bg-brand-blue text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-vibrant-blue transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {paymentLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Subscribe Now</span>
                            <StarIcon className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </PaystackPayment>
                ) : (
                  <button
                    onClick={handlePayment}
                    disabled={!isClient}
                    className="w-full bg-brand-blue text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-vibrant-blue transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe Now</span>
                    <StarIcon className="w-5 h-5" />
                  </button>
                )}

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>Instant Access</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Powered by Paystack • Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}