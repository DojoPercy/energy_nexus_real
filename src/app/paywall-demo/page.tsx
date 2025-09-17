'use client'

import { PaywallOverlay } from '@/components/paywall'

export default function PaywallDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paywall Demo
          </h1>
          <p className="text-lg text-gray-600">
            Test different access types and paywall behaviors
          </p>
        </div>

        <div className="space-y-16">
          {/* Premium Content - Main Demo */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">INSIGHTS</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">NEWS</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Base Salary Beats Bonuses for Middle East Oil & Gas Workers
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                A recent survey reveals how employees in the Middle East's oil & gas sector view their salaries, priorities, and what drives pay satisfaction.
              </p>
              <p className="text-sm text-gray-500">By Simone Liedtke</p>
            </div>
            
            <div className="relative min-h-[600px]">
              <PaywallOverlay
                accessType="premium"
                contentId="demo-premium"
                contentType="article"
                scrollThreshold={25}
              >
                <div className="p-8 prose prose-lg max-w-none">
                  <p>This is premium content that requires an active subscription to access. The paywall will appear after you scroll down 25% of the content.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                  <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                  <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                  <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
                  <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                </div>
              </PaywallOverlay>
            </div>
          </div>

          {/* Login Required Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required Content</h2>
              <p className="text-gray-600">This content requires a free account login to continue reading.</p>
            </div>
            
            <div className="relative min-h-[400px]">
              <PaywallOverlay
                accessType="login"
                contentId="demo-login"
                contentType="article"
                scrollThreshold={30}
              >
                <div className="p-8 prose prose-lg max-w-none">
                  <p>This content requires a free account login to continue reading. The paywall will appear after you scroll down 30% of the content.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                </div>
              </PaywallOverlay>
            </div>
          </div>

          {/* Free Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Content</h2>
            <PaywallOverlay
              accessType="free"
              contentId="demo-free"
              contentType="article"
            >
              <div className="prose prose-lg max-w-none">
                <p>This is free content that everyone can read without any restrictions.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </PaywallOverlay>
          </div>
        </div>
      </div>
    </div>
  )
}

