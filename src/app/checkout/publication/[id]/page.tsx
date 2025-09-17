'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0'
import { client } from '@/sanity/lib/client'
import { getPublicationBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
   
  CheckIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from 'lucide-react'

interface Publication {
  _id: string
  title: string
  slug: { current: string }
  hero?: {
    image?: any
  }
  price?: number
  currency?: string
  fullPdf?: any
}

export default function PublicationCheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading: userLoading } = useUser()
  const [publication, setPublication] = useState<Publication | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchPublication()
    }
  }, [params.id])

  const fetchPublication = async () => {
    try {
      setLoading(true)
      // For now, we'll use a mock publication since we need the ID
      // In a real implementation, you'd fetch by ID or slug
      const mockPublication: Publication = {
        _id: params.id as string,
        title: 'Energy Industry Report 2024',
        slug: { current: 'energy-industry-report-2024' },
        price: 25,
        currency: 'GHS',
        fullPdf: {
          asset: {
            url: '/sample-publication.pdf'
          }
        }
      }
      setPublication(mockPublication)
    } catch (error) {
      console.error('Error fetching publication:', error)
      setError('Failed to load publication details')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!user) {
      router.push('/auth/login?returnTo=' + encodeURIComponent(window.location.pathname))
      return
    }

    if (!publication) return

    setIsProcessing(true)
    try {
      // Initialize Paystack payment
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amount: (publication.price || 0) * 100, // Convert to kobo
          currency: 'GHS',
          reference: `pub_${publication._id}_${Date.now()}`,
          metadata: {
            publicationId: publication._id,
            publicationTitle: publication.title,
            userId: user.sub,
            type: 'publication_purchase'
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url
      } else {
        throw new Error(data.message || 'Payment initialization failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError('Payment initialization failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Publication not found'}</p>
          <Link href="/publications" className="bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-vibrant-blue transition-colors">
            Back to Publications
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/publications/${publication.slug.current}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Publication</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Publication Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-28 flex-shrink-0">
                  {publication.hero?.image ? (
                    <Image
                      src={urlFor(publication.hero.image).width(200).height(280).url()}
                      alt={publication.title}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{publication.title}</h2>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-green" />
                      <span>Full PDF download</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-green" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-green" />
                      <span>High-quality images</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{publication.title}</span>
                  <span className="font-medium">₵{publication.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing fee</span>
                  <span className="font-medium">₵0</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">₵{publication.price}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 bg-brand-blue text-white px-6 py-4 rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="w-5 h-5" />
                    <span>Pay with Paystack</span>
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-green" />
                  <span>Secure payment powered by Paystack</span>
                </div>
              </div>

              {/* User Info */}
              {user && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Purchasing as: <span className="font-medium">{user.email}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
