'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  CreditCardIcon,
  CalendarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

interface Subscription {
  id: string
  status: 'active' | 'cancelled' | 'past_due' | 'incomplete'
  plan: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  amount: number
  currency: string
}

export default function SubscriptionPage() {
  const { user, isLoading: userLoading } = useUser()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userLoading && user?.email) {
      fetchSubscription()
    }
  }, [user, userLoading])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription')
      if (response.ok) {
        const data = await response.json()
        if (data.subscription) {
          setSubscription({
            id: data.subscription.paystackSubscriptionId,
            status: data.subscription.status,
            plan: data.subscription.plan.name,
            currentPeriodStart: data.subscription.currentPeriodStart,
            currentPeriodEnd: data.subscription.currentPeriodEnd,
            cancelAtPeriodEnd: data.subscription.status === 'canceled',
            amount: data.subscription.plan.price / 100, // Convert from kobo
            currency: data.subscription.plan.currency.toUpperCase()
          })
        }
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscriptionAction = async (action: 'cancel' | 'reactivate') => {
    try {
      const response = await fetch('/api/subscription', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        // Refresh subscription data
        await fetchSubscription()
      } else {
        console.error('Failed to update subscription')
      }
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
      case 'cancelled':
        return <XCircleIcon className="w-6 h-6 text-red-500" />
      case 'past_due':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
      default:
        return <ClockIcon className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your EnergyNexus subscription and billing</p>
        </div>

        {subscription ? (
          <div className="space-y-6">
            {/* Subscription Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(subscription.status)}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {subscription.plan}
                    </h2>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₵{subscription.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {subscription.currency} per {subscription.plan.toLowerCase().includes('annual') ? 'year' : 'month'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Current Period</p>
                    <p className="font-medium text-gray-900">
                      {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCardIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Subscription ID</p>
                    <p className="font-mono text-sm text-gray-900">{subscription.id}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Subscription</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {subscription.status === 'active' && !subscription.cancelAtPeriodEnd ? (
                  <button 
                    onClick={() => handleSubscriptionAction('cancel')}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                  >
                    Cancel Subscription
                  </button>
                ) : subscription.cancelAtPeriodEnd ? (
                  <button 
                    onClick={() => handleSubscriptionAction('reactivate')}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Reactivate Subscription
                  </button>
                ) : (
                  <Link
                    href="/subscribe"
                    className="px-6 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200 text-center"
                  >
                    Subscribe Now
                  </Link>
                )}
                
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Update Payment Method
                </button>
                
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Download Invoice
                </button>
              </div>
            </motion.div>

            {/* Billing History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Annual Access - January 2024</p>
                    <p className="text-sm text-gray-500">Paid on Jan 1, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₵250.00</p>
                    <p className="text-sm text-emerald-600">Paid</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Annual Access - January 2023</p>
                    <p className="text-sm text-gray-500">Paid on Jan 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₵250.00</p>
                    <p className="text-sm text-emerald-600">Paid</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCardIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
            <p className="text-gray-600 mb-6">
              You don't have an active subscription. Subscribe now to access premium content.
            </p>
            <Link
              href="/subscribe"
              className="inline-flex items-center px-6 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200"
            >
              View Subscription Plans
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
