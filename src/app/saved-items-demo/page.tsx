'use client'

import { SavedItemsList } from '@/components/saved-items'

// Mock data for demonstration
const mockSavedItems = [
  {
    _id: '1',
    createdAt: '2024-01-15T10:30:00Z',
    content: {
      _id: 'article-1',
      _type: 'article',
      title: 'Goldman Sachs Sees Brent Crude Falling to Low $50s by Late 2026 - Oil & Gas Middle East',
      slug: { current: 'goldman-sachs-brent-crude-forecast' },
      accessType: 'premium' as const,
      dek: 'Investment bank predicts significant price decline in oil markets',
      publishedAt: '2024-01-15T08:00:00Z',
      authors: [{ _id: 'author-1', name: 'travis-richards' }],
      sectors: [{ _id: 'sector-1', title: 'Oil & Gas' }]
    }
  },
  {
    _id: '2',
    createdAt: '2024-01-14T15:45:00Z',
    content: {
      _id: 'article-2',
      _type: 'article',
      title: 'Renewable Energy Investments Surge in Middle East Markets',
      slug: { current: 'renewable-energy-investments-middle-east' },
      accessType: 'login' as const,
      dek: 'New funding initiatives drive green energy transformation',
      publishedAt: '2024-01-14T12:00:00Z',
      authors: [{ _id: 'author-2', name: 'sarah-johnson' }],
      sectors: [{ _id: 'sector-2', title: 'Renewable Energy' }]
    }
  },
  {
    _id: '3',
    createdAt: '2024-01-13T09:20:00Z',
    content: {
      _id: 'interview-1',
      _type: 'interview',
      title: 'CEO Interview: Future of Energy Storage Technologies',
      slug: { current: 'ceo-interview-energy-storage' },
      accessType: 'free' as const,
      dek: 'Exclusive conversation with industry leaders',
      publishedAt: '2024-01-13T10:00:00Z',
      authors: [{ _id: 'author-3', name: 'michael-chen' }],
      sectors: [{ _id: 'sector-3', title: 'Energy Storage' }]
    }
  },
  {
    _id: '4',
    createdAt: '2024-01-12T14:15:00Z',
    content: {
      _id: 'article-3',
      _type: 'article',
      title: 'Saudi Arabia Announces Major Solar Power Initiative',
      slug: { current: 'saudi-arabia-solar-power-initiative' },
      accessType: 'premium' as const,
      dek: 'Kingdom invests $50 billion in renewable energy projects',
      publishedAt: '2024-01-12T11:30:00Z',
      authors: [{ _id: 'author-4', name: 'ahmed-al-rasheed' }],
      sectors: [{ _id: 'sector-4', title: 'Solar Energy' }]
    }
  }
]

export default function SavedItemsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Items UI Demo</h1>
          <p className="text-gray-600">Professional saved content interface inspired by premium media websites</p>
        </div>

        {/* Saved Content Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">SAVED CONTENT</h2>
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          
          <SavedItemsList items={mockSavedItems} />
        </div>

        {/* Features Showcase */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Professional Design</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clean, minimalist card layout</li>
                <li>• Category labels and author information</li>
                <li>• External link indicators</li>
                <li>• Access type badges (Premium/Login Required)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Elements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hover effects and smooth transitions</li>
                <li>• Delete functionality with confirmation</li>
                <li>• Responsive design for all devices</li>
                <li>• Professional typography and spacing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
