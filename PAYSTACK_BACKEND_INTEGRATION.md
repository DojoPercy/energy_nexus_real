# Paystack Backend Integration with Sanity CMS

This document outlines the complete backend integration between Paystack and Sanity CMS for managing user subscriptions in EnergyNexus.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Sanity CMS    │
│   (React)       │◄──►│   (Next.js)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Paystack      │    │   Webhooks      │    │   User Data     │
│   (Payments)    │◄──►│   (Events)      │    │   (Subscriptions)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📊 Database Schema (Sanity CMS)

### 1. User Schema
```typescript
{
  _type: 'user',
  name: string,
  email: string,
  authProvider: string,
  auth0Sub: string,
  createdAt: datetime
}
```

### 2. Subscription Plan Schema
```typescript
{
  _type: 'subscriptionPlan',
  name: string,
  slug: { current: string },
  description: string,
  price: number, // in kobo
  currency: string, // 'ghs' for Ghana
  interval: string, // 'month' | 'year'
  features: string[],
  isActive: boolean,
  isPopular: boolean,
  paystackPlanCode: string,
  paystackPlanId: string
}
```

### 3. User Subscription Schema
```typescript
{
  _type: 'userSubscription',
  user: reference,
  plan: reference,
  status: 'active' | 'canceled' | 'past_due' | 'unpaid',
  paystackSubscriptionId: string,
  paystackCustomerId: string,
  paystackCustomerCode: string,
  currentPeriodStart: datetime,
  currentPeriodEnd: datetime,
  canceledAt: datetime,
  createdAt: datetime
}
```

## 🔧 Backend Services

### 1. Paystack API Service (`src/lib/paystack-api.ts`)

**Features:**
- Create and manage subscription plans
- Handle customer creation and management
- Process subscription creation and updates
- Verify transactions
- Initialize payments

**Key Methods:**
```typescript
// Create subscription plan
await paystackAPI.createPlan({
  name: 'Monthly Access',
  interval: 'monthly',
  amount: 2500, // 25.00 GHS in kobo
  currency: 'GHS'
})

// Create customer
await paystackAPI.createCustomer({
  email: 'user@example.com',
  first_name: 'John',
  last_name: 'Doe'
})

// Create subscription
await paystackAPI.createSubscription({
  customer: 'CUS_customer_code',
  plan: 'PLN_plan_code',
  authorization: 'AUTH_authorization_code'
})
```

### 2. Sanity Subscription Service (`src/lib/sanity-subscription.ts`)

**Features:**
- Create and update user subscriptions
- Manage subscription status
- Handle subscription cancellation/reactivation
- Sync with Paystack data

**Key Methods:**
```typescript
// Create user subscription
await sanitySubscriptionService.createUserSubscription({
  userEmail: 'user@example.com',
  paystackSubscriptionId: 'sub_123',
  paystackCustomerId: 'cus_123',
  paystackCustomerCode: 'CUS_123',
  planCode: 'PLN_monthly',
  status: 'active',
  currentPeriodStart: '2024-01-01',
  currentPeriodEnd: '2024-02-01'
})

// Check active subscription
const hasActive = await sanitySubscriptionService.hasActiveSubscription('user@example.com')

// Cancel subscription
await sanitySubscriptionService.cancelSubscription('user@example.com')
```

## 🔄 API Routes

### 1. Subscription Management (`/api/subscription`)

**GET** - Fetch user subscription details
```typescript
// Response
{
  subscription: {
    _id: 'sub_123',
    status: 'active',
    plan: {
      name: 'Annual Access',
      price: 25000,
      currency: 'ghs'
    },
    currentPeriodStart: '2024-01-01',
    currentPeriodEnd: '2025-01-01'
  }
}
```

**POST** - Create new subscription
```typescript
// Request body
{
  paystackSubscriptionId: 'sub_123',
  paystackCustomerId: 'cus_123',
  paystackCustomerCode: 'CUS_123',
  planCode: 'PLN_annual',
  status: 'active',
  currentPeriodStart: '2024-01-01',
  currentPeriodEnd: '2025-01-01'
}
```

**PUT** - Update subscription (cancel/reactivate)
```typescript
// Request body
{
  action: 'cancel' | 'reactivate'
}
```

### 2. Paystack Webhook (`/api/paystack/webhook`)

**Handles Paystack Events:**
- `subscription.create` - New subscription created
- `subscription.disable` - Subscription cancelled
- `invoice.payment_successful` - Payment successful
- `invoice.payment_failed` - Payment failed
- `charge.success` - One-time payment successful

**Webhook Security:**
```typescript
// Verify webhook signature
const hash = crypto
  .createHmac('sha512', PAYSTACK_WEBHOOK_SECRET)
  .update(body)
  .digest('hex')

if (hash !== signature) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
}
```

### 3. Plan Management (`/api/paystack/create-plans`)

**POST** - Create plans in both Paystack and Sanity
**GET** - List all Paystack plans

## 🔐 Authentication & Security

### 1. Auth0 Integration
- User authentication via Auth0
- Session management for API routes
- Protected subscription endpoints

### 2. Webhook Security
- HMAC SHA-512 signature verification
- Environment-based webhook secrets
- Request validation and sanitization

### 3. API Security
- Environment variable protection
- Rate limiting (recommended)
- Input validation and sanitization

## 📱 Frontend Integration

### 1. Subscription Checkout
```typescript
// User selects plan and initiates payment
const { initializePayment } = usePaystack({
  publicKey: PAYSTACK_CONFIG.publicKey,
  email: userEmail,
  amount: ghsToKobo(selectedPlan.price),
  onSuccess: (reference) => {
    // Redirect to success page
    router.push(`/subscribe/success?reference=${reference.reference}`)
  }
})
```

### 2. Subscription Management
```typescript
// Fetch user subscription
const response = await fetch('/api/subscription')
const { subscription } = await response.json()

// Cancel subscription
await fetch('/api/subscription', {
  method: 'PUT',
  body: JSON.stringify({ action: 'cancel' })
})
```

## 🚀 Deployment Setup

### 1. Environment Variables
```env
# Paystack Configuration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_TOKEN=your_api_token

# Auth0 Configuration
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=https://yourdomain.com
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
```

### 2. Paystack Dashboard Configuration
1. **Create Plans:**
   - Monthly Access: ₵25.00/month
   - Annual Access: ₵250.00/year

2. **Configure Webhook:**
   - URL: `https://yourdomain.com/api/paystack/webhook`
   - Events: All subscription and payment events

3. **Test Mode:**
   - Use test keys for development
   - Test with Paystack test cards
   - Verify webhook delivery

### 3. Sanity Studio Setup
1. **Create Subscription Plans:**
   - Use the setup script or create manually
   - Update Paystack plan codes after creation

2. **Configure API Token:**
   - Create token with read/write permissions
   - Add to environment variables

## 🧪 Testing

### 1. Test Cards (Ghana)
```
Successful Payment: 4084084084084081
Failed Payment: 4084084084084085
Insufficient Funds: 4084084084084082
```

### 2. Webhook Testing
```bash
# Test webhook locally using ngrok
ngrok http 3000

# Update webhook URL in Paystack dashboard
# Test with Paystack webhook testing tool
```

### 3. Integration Testing
1. Create test subscription
2. Verify Sanity data creation
3. Test webhook event handling
4. Verify subscription status updates

## 📊 Monitoring & Analytics

### 1. Paystack Dashboard
- Monitor transaction success rates
- Track subscription metrics
- View payment method distribution
- Monitor failed payments

### 2. Sanity Analytics
- Track subscription creation/updates
- Monitor user engagement
- Analyze subscription churn
- Track revenue metrics

### 3. Application Logs
- Webhook event processing
- API request/response logging
- Error tracking and alerting
- Performance monitoring

## 🔄 Data Flow

### 1. Subscription Creation Flow
```
User selects plan → Paystack payment → Webhook event → Sanity update → User access granted
```

### 2. Payment Success Flow
```
Payment successful → Webhook notification → Sanity status update → User notification
```

### 3. Subscription Cancellation Flow
```
User cancels → API call → Paystack disable → Webhook event → Sanity update → Access revoked
```

## 🛠️ Maintenance

### 1. Regular Tasks
- Monitor webhook delivery
- Check subscription status sync
- Update plan pricing if needed
- Review failed payment handling

### 2. Error Handling
- Webhook retry logic
- Failed payment recovery
- Data consistency checks
- User notification system

### 3. Scaling Considerations
- Database indexing for queries
- API rate limiting
- Caching strategies
- Load balancing for webhooks

## 📞 Support & Troubleshooting

### Common Issues
1. **Webhook not receiving events:**
   - Check webhook URL configuration
   - Verify signature validation
   - Check server logs for errors

2. **Subscription not syncing:**
   - Verify Paystack plan codes
   - Check Sanity API permissions
   - Review webhook event handling

3. **Payment failures:**
   - Check Paystack dashboard
   - Verify customer data
   - Review payment method validation

### Debug Tools
- Paystack webhook testing tool
- Sanity Studio for data inspection
- Application logs and monitoring
- Network request inspection

---

This backend integration provides a robust, scalable solution for managing Paystack subscriptions with Sanity CMS, ensuring data consistency and providing a seamless user experience.
