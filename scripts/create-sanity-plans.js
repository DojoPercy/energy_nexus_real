#!/usr/bin/env node

/**
 * Script to create subscription plans in Sanity CMS
 * Run with: node scripts/create-sanity-plans.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN

if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error('❌ Sanity configuration not found')
  console.log('Please add NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN to your .env.local file')
  process.exit(1)
}

async function createSanityPlans() {
  console.log('🚀 Creating Sanity subscription plans...')
  
  const plans = [
    {
      _type: 'subscriptionPlan',
      name: 'Monthly Access',
      slug: { current: 'monthly-access' },
      description: 'Perfect for trying out our premium content',
      price: 2500, // 25.00 GHS in kobo
      currency: 'ghs',
      interval: 'month',
      features: [
        'Unlimited access to all articles',
        'Premium interviews & reports',
        'Exclusive industry insights',
        'Mobile & desktop access',
        'Email support'
      ],
      isActive: true,
      isPopular: false,
      paystackPlanCode: 'PLN_monthly_plan_code', // Update with actual Paystack plan code
      paystackPlanId: 'monthly_plan_id', // Update with actual Paystack plan ID
    },
    {
      _type: 'subscriptionPlan',
      name: 'Annual Access',
      slug: { current: 'annual-access' },
      description: 'Best value for committed readers',
      price: 25000, // 250.00 GHS in kobo
      currency: 'ghs',
      interval: 'year',
      features: [
        'Everything in Monthly',
        'Priority customer support',
        'Early access to new features',
        'Exclusive member events',
        'Download articles for offline reading',
        'Advanced analytics dashboard',
        'AI Summarizer'
      ],
      isActive: true,
      isPopular: true,
      paystackPlanCode: 'PLN_annual_plan_code',
      paystackPlanId: 'annual_plan_id', 
    }
  ]

  console.log('📋 Creating plans in Sanity...')
  
  for (const plan of plans) {
    try {
      const response = await fetch(`https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/production`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SANITY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mutations: [
            {
              create: plan
            }
          ]
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Created Sanity plan: ${plan.name}`)
        console.log(`   Document ID: ${result.results[0].id}`)
        console.log(`   Slug: ${plan.slug.current}`)
        console.log('')
      } else {
        const error = await response.json()
        console.error(`❌ Failed to create plan ${plan.name}:`, error.message)
      }
    } catch (error) {
      console.error(`❌ Error creating plan ${plan.name}:`, error.message)
    }
  }

  console.log('✅ Sanity plan creation complete!')
  console.log('')
  console.log('📝 Next steps:')
  console.log('1. Update the paystackPlanCode and paystackPlanId with actual Paystack values')
  console.log('2. Verify the plans in your Sanity Studio')
  console.log('3. Test the subscription flow')
}

// Run the script
createSanityPlans().catch(console.error)
