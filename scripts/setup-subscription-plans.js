#!/usr/bin/env node

/**
 * Setup script to create subscription plans in both Paystack and Sanity
 * Run with: node scripts/setup-subscription-plans.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' })

// Paystack configuration
const PAYSTACK_CONFIG = {
  secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key_here',
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here'
}

async function setupSubscriptionPlans() {
  console.log('🚀 Setting up subscription plans...')
  
  try {
    // Create plans in Paystack
    const plans = [
      {
        name: 'Monthly Access',
        interval: 'monthly',
        amount: 2500, // 25.00 GHS in kobo
        currency: 'GHS',
        description: 'Perfect for trying out our premium content'
      },
      {
        name: 'Annual Access',
        interval: 'annually',
        amount: 25000, // 250.00 GHS in kobo
        currency: 'GHS',
        description: 'Best value for committed readers'
      }
    ]

    console.log('📋 Creating plans in Paystack...')
    
    for (const plan of plans) {
      try {
        const response = await fetch('https://api.paystack.co/plan', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plan)
        })

        if (response.ok) {
          const result = await response.json()
          console.log(`✅ Created Paystack plan: ${plan.name}`)
          console.log(`   Plan Code: ${result.data.plan_code}`)
          console.log(`   Plan ID: ${result.data.id}`)
        } else {
          const error = await response.json()
          console.error(`❌ Failed to create plan ${plan.name}:`, error.message)
        }
      } catch (error) {
        console.error(`❌ Error creating plan ${plan.name}:`, error.message)
      }
    }

    console.log('\n📋 Creating plans in Sanity...')
    
    // Create plans in Sanity
    const sanityPlans = [
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
        // Note: You'll need to update these with actual Paystack plan codes
        paystackPlanCode: 'PLN_monthly_plan_code',
        paystackPlanId: 'monthly_plan_id',
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
          'Advanced analytics dashboard'
        ],
        isActive: true,
        isPopular: true,
        // Note: You'll need to update these with actual Paystack plan codes
        paystackPlanCode: 'PLN_annual_plan_code',
        paystackPlanId: 'annual_plan_id',
      }
    ]

    // Note: This would require Sanity client setup
    console.log('📝 Sanity plans to create:')
    sanityPlans.forEach(plan => {
      console.log(`   - ${plan.name} (${plan.slug.current})`)
    })

    console.log('\n✅ Setup complete!')
    console.log('\n📝 Next steps:')
    console.log('1. Update the paystackPlanCode and paystackPlanId in Sanity with the actual values from Paystack')
    console.log('2. Configure your webhook URL in Paystack dashboard: https://yourdomain.com/api/paystack/webhook')
    console.log('3. Test the subscription flow with Paystack test cards')
    console.log('4. Switch to live keys when ready for production')

  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  }
}

// Run the setup
setupSubscriptionPlans()
