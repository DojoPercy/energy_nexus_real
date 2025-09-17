'use client'

import MemberExclusives from '@/components/MemberExclusives'
import { StarIcon, CodeBracketIcon, SparklesIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function MemberExclusivesDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-blue via-vibrant-blue to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🚀 Component Demo
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 poppins-bold">
            Member Exclusives Component
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional premium content showcase with industry-leading design patterns
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">6+</div>
              <div className="text-white/80 text-sm">Premium Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80 text-sm">Responsive</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">Pro</div>
              <div className="text-white/80 text-sm">Design Quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Showcase */}
      <div className="py-8">
        <MemberExclusives maxItems={6} />
      </div>

      {/* Technical Documentation */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 poppins-bold">
              Technical Implementation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern React patterns and industry best practices
            </p>
            <div className="w-20 h-1 bg-brand-blue mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Database Query */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <CodeBracketIcon className="w-8 h-8 text-brand-blue" />
                <h3 className="text-2xl font-bold text-gray-900">Database Query</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The component uses a Sanity GROQ query to fetch premium content with intelligent filtering:
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm leading-relaxed">
{`*[_type in ["article", "interview"] && 
  accessType in ["login", "premium"]] | 
  order(publishedAt desc)[0...6] {
    _id,
    _type,
    title,
    slug,
    dek,
    publishedAt,
    accessType,
    hero,
    sectors,
    regions
  }`}
                </pre>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <SparklesIcon className="w-8 h-8 text-emerald-green" />
                <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Professional card-based layout with hover effects",
                  "Premium content badges and access indicators",
                  "Responsive grid system (mobile-first design)",
                  "Loading states with skeleton animations",
                  "Error handling and fallback content",
                  "SEO-optimized with proper meta tags",
                  "Accessibility compliant (WCAG 2.1)",
                  "Performance optimized with image lazy loading"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design Patterns */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <StarIcon className="w-8 h-8 text-brand-blue" />
              <h3 className="text-2xl font-bold text-gray-900">Design Patterns Used</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Container/Presentational</h4>
                <p className="text-gray-600 text-sm">
                  Separates data fetching logic from UI rendering for better maintainability
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-emerald-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Custom Hooks</h4>
                <p className="text-gray-600 text-sm">
                  Reusable logic for data fetching and state management
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-vibrant-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Error Boundaries</h4>
                <p className="text-gray-600 text-sm">
                  Graceful error handling with fallback UI components
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-brand-blue to-vibrant-blue rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4 poppins-bold">
                Ready to Implement?
              </h3>
              <p className="text-xl text-white/90 mb-6">
                This component is production-ready and follows industry best practices
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#component"
                  className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  <span>View Component</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                <a
                  href="/subscribe"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-blue transition-colors duration-200"
                >
                  <span>Try Premium</span>
                  <StarIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
