'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import VerticalTabs, { accountTabItems } from '@/components/VerticalTabs'
import PersonalInfoTab from '@/components/account-tabs/PersonalInfoTab'
import SavedItemsTab from '@/components/account-tabs/SavedItemsTab'
import SubscriptionTab from '@/components/account-tabs/SubscriptionTab'

interface SavedItem {
  _id: string
  createdAt: string
  notes?: string
  content: {
    _id: string
    _type: string
    title: string
    slug: { current: string }
    accessType?: 'free' | 'login' | 'premium'
    dek?: string
    publishedAt?: string
    authors?: Array<{ _id: string; name: string }>
    sectors?: Array<{ _id: string; title: string }>
  }
}

export default function MyAccountPage() {
  const { user, isLoading } = useUser()
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && !isLoading) {
      fetchSavedItems()
    }
  }, [user, isLoading])

  const fetchSavedItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/saved-items')
      const data = await response.json()
      
      if (data.success) {
        setSavedItems(data.items)
      } else {
        setError(data.error || 'Failed to fetch saved items')
      }
    } catch (error) {
      console.error('Error fetching saved items:', error)
      setError('Failed to fetch saved items')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = (itemId: string) => {
    setSavedItems(prev => prev.filter(item => item._id !== itemId))
  }

  if (isLoading || loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your saved content.</p>
          <a 
            href="/auth/login" 
            className="bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchSavedItems}
            className="bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    )
  }

  // Create tabs with content
  const tabs = [
    {
      ...accountTabItems.personalInfo,
      content: <PersonalInfoTab />
    },
    {
      ...accountTabItems.savedItems,
      content: <SavedItemsTab items={savedItems} onDelete={handleDeleteItem} />,
      badge: savedItems.length
    },
    {
      ...accountTabItems.subscription,
      content: <SubscriptionTab />
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 poppins-bold">My Account</h1>
          <p className="text-xl text-gray-600">Manage your account settings, saved content, and subscription</p>
        </div>

        {/* Vertical Tabs */}
        <VerticalTabs 
          tabs={tabs} 
          defaultActiveTab="personal-info"
          className="min-h-[600px]"
        />
      </div>
    </main>
  )
}