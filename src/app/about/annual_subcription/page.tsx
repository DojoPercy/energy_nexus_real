'use client'

import { CheckIcon, StarIcon, ArrowRightIcon, ShieldCheckIcon, ClockIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const monthlyFeatures = [
  "Unlimited access to all premium articles",
  "Exclusive industry interviews & reports", 
  "AI-powered content summarization",
  "Mobile & desktop access",
  "Email support",
  "Weekly industry insights newsletter"
];

const yearlyFeatures = [
  "Everything in Monthly plan",
  "Priority customer support",
  "Early access to new features",
  "Exclusive member events & webinars",
  "Download articles for offline reading",
  "Advanced analytics dashboard",
  "AI Services Enabled",
  "Complete TBY Guides series access"
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Energy Analyst",
    company: "GreenTech Solutions",
    content: "EnergyNexus has transformed how I stay informed about the energy sector. The premium content is invaluable.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Investment Director", 
    company: "Renewable Capital",
    content: "The exclusive interviews and reports give us a competitive edge in our investment decisions.",
    rating: 5
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Research Director",
    company: "Clean Energy Institute",
    content: "The AI summarization feature saves me hours of research time. Highly recommended!",
    rating: 5
  }
];

const stats = [
  { number: "10,000+", label: "Premium Articles" },
  { number: "500+", label: "Industry Experts" },
  { number: "50+", label: "Countries Covered" },
  { number: "99%", label: "Customer Satisfaction" }
];

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue via-vibrant-blue to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Premium Access
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 poppins-bold">
            Unlock Premium Energy Insights
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Get unlimited access to exclusive content, AI-powered insights, and industry-leading analysis
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E212A] mb-4 poppins-bold">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed for professionals who need reliable, in-depth energy industry insights
            </p>
            <div className="w-20 h-1 bg-brand-blue mx-auto mt-6"></div>
          </div>

          {/* Plan Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  selectedPlan === 'monthly'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-blue'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 relative ${
                  selectedPlan === 'yearly'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-blue'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-emerald-green text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
              selectedPlan === 'monthly' ? 'border-brand-blue scale-105' : 'border-gray-200'
            }`}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E212A] mb-2">Monthly Access</h3>
                    <p className="text-gray-600">Perfect for trying out our premium content</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-brand-blue">₵25</div>
                    <div className="text-gray-500">per month</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {monthlyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-emerald-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/subscribe?plan=monthly">
                  <button className="w-full bg-brand-blue text-white py-4 px-6 rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200 flex items-center justify-center gap-2">
                    Choose Monthly
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Yearly Plan - Featured */}
            <div className="relative bg-white rounded-2xl shadow-xl border-2 border-brand-blue transform scale-105">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-brand-blue text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <StarIcon className="w-4 h-4" />
                  Most Popular
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E212A] mb-2">Annual Access</h3>
                    <p className="text-gray-600">Best value for committed professionals</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-brand-blue">₵250</div>
                    <div className="text-gray-500">per year</div>
                    <div className="text-sm text-emerald-green font-medium">Save ₵50</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {yearlyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-emerald-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/subscribe?plan=yearly">
                  <button className="w-full bg-brand-blue text-white py-4 px-6 rounded-lg font-semibold hover:bg-vibrant-blue transition-colors duration-200 flex items-center justify-center gap-2">
                    Choose Yearly
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-green" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-emerald-green" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-emerald-green" />
                <span>10,000+ Subscribers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E212A] mb-4 poppins-bold">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our premium subscribers say about their experience
            </p>
            <div className="w-20 h-1 bg-brand-blue mx-auto mt-6"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-[#1E212A]">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-brand-blue">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E212A] mb-4 poppins-bold">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mt-6"></div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E212A] mb-4">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access to premium content until the end of your current billing period.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E212A] mb-4">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, debit cards, and mobile money payments through our secure Paystack integration.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E212A] mb-4">Is there a free trial available?</h3>
              <p className="text-gray-600">Yes! New subscribers get a 7-day free trial to explore all premium features before being charged.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E212A] mb-4">How often is new content published?</h3>
              <p className="text-gray-600">We publish new premium content daily, including exclusive interviews, in-depth reports, and industry analysis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 poppins-bold">
            Ready to Unlock Premium Insights?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of energy professionals who rely on EnergyNexus for industry-leading insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscribe?plan=yearly">
              <button className="bg-white text-brand-blue py-4 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white py-4 px-8 rounded-lg font-semibold hover:bg-white hover:text-brand-blue transition-colors duration-200">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}