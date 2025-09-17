'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircleIcon, StarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function SubscribeSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [reference, setReference] = useState<string | null>(null)

  useEffect(() => {
    const ref = searchParams.get('reference')
    setReference(ref)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircleIcon className="w-12 h-12 text-emerald-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to The Boardroom Magazine Premium!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your subscription has been activated successfully. You now have unlimited access to all premium content.
            </p>
          </motion.div>

          {/* Reference Number */}
          {reference && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-50 rounded-lg p-4 mb-6"
            >
              <p className="text-sm text-gray-500 mb-1">Transaction Reference</p>
              <p className="font-mono text-sm text-gray-900">{reference}</p>
            </motion.div>
          )}

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-brand-blue bg-opacity-5 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-gray-700">Check your email for subscription confirmation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-gray-700">Access premium articles and exclusive content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-700">Join our exclusive member community</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200"
            >
              <StarIcon className="w-5 h-5 mr-2" />
              Explore Premium Content
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/my-account"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Manage Subscription
            </Link>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@theboardroommagazine.com" className="text-brand-blue hover:underline">
                support@theboardroommagazine.com
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function SubscribeSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
      </div>
    }>
      <SubscribeSuccessContent />
    </Suspense>
  )
}
