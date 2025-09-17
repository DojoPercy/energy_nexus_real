'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  DownloadIcon, 
  ArrowRightIcon,
  HomeIcon,
  BookOpenIcon
} from 'lucide-react'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get transaction reference from URL params
    const reference = searchParams.get('reference')
    const trxref = searchParams.get('trxref')
    
    if (reference || trxref) {
      // In a real implementation, you'd verify the payment with Paystack
      // and fetch the purchase details
      setPurchaseDetails({
        reference: reference || trxref,
        publicationTitle: 'Energy Industry Report 2024',
        downloadUrl: '/sample-publication.pdf',
        amount: 25,
        currency: 'GHS'
      })
    }
    setLoading(false)
  }, [searchParams])

  const handleDownload = () => {
    if (purchaseDetails?.downloadUrl) {
      // Create a temporary link to download the file
      const link = document.createElement('a')
      link.href = purchaseDetails.downloadUrl
      link.download = `${purchaseDetails.publicationTitle}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-green mb-6">
            <CheckCircleIcon className="h-8 w-8 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your publication is ready for download.
          </p>

          {/* Purchase Details */}
          {purchaseDetails && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchase Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Publication:</span>
                  <span className="font-medium">{purchaseDetails.publicationTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₵{purchaseDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-mono text-sm">{purchaseDetails.reference}</span>
                </div>
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="space-y-4">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Download Publication</span>
            </button>

            <p className="text-sm text-gray-500">
              You can also access your purchase anytime from your account dashboard.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/my-account"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span>My Publications</span>
            </Link>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              <ArrowRightIcon className="w-4 h-4" />
              <span>Browse More</span>
            </Link>
          </div>

          {/* Home Link */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors duration-200"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
