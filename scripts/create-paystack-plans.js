#!/usr/bin/env node

/**
 * Simple script to create Paystack subscription plans
 * Run with: node scripts/create-paystack-plans.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

if (!PAYSTACK_SECRET_KEY) {
  console.error('❌ PAYSTACK_SECRET_KEY not found in environment variables')
  console.log('Please add PAYSTACK_SECRET_KEY to your .env.local file')
  process.exit(1)
}

async function createPaystackPlans() {
  console.log('🚀 Creating Paystack subscription plans...')
  
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
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan)
      })

      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Created Paystack plan: ${plan.name}`)
        console.log(`   Plan Code: ${result.data.plan_code}`)
        console.log(`   Plan ID: ${result.data.id}`)
        console.log(`   Amount: ${result.data.amount} kobo (${result.data.amount / 100} GHS)`)
        console.log('')
      } else {
        const error = await response.json()
        console.error(`❌ Failed to create plan ${plan.name}:`, error.message)
      }
    } catch (error) {
      console.error(`❌ Error creating plan ${plan.name}:`, error.message)
    }
  }

  console.log('✅ Paystack plan creation complete!')
  console.log('')
  console.log('📝 Next steps:')
  console.log('1. Copy the Plan Codes from above')
  console.log('2. Update the paystackPlanCode in your Sanity subscription plans')
  console.log('3. Configure your webhook URL in Paystack dashboard')
  console.log('4. Test the subscription flow')
}

// Run the script
createPaystackPlans().catch(console.error)
