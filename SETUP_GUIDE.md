# Paystack + Sanity Integration Setup Guide

This guide will help you set up the complete Paystack subscription system with Sanity CMS integration.

## 🚀 Quick Setup

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
# Paystack Configuration (Ghana)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret_here

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

### 2. Install Dependencies

```bash
npm install @makozi/paystack-react-pay dotenv
```

### 3. Create Paystack Plans

Run the Paystack plan creation script:

```bash
node scripts/create-paystack-plans.js
```

This will create:
- Monthly Access: ₵25.00/month
- Annual Access: ₵250.00/year

**Copy the Plan Codes** from the output - you'll need them for Sanity.

### 4. Create Sanity Plans

Run the Sanity plan creation script:

```bash
node scripts/create-sanity-plans.js
```

**Important:** Update the `paystackPlanCode` and `paystackPlanId` in Sanity with the actual values from step 3.

### 5. Configure Paystack Webhook

1. Go to your Paystack Dashboard
2. Navigate to Settings > API Keys & Webhooks
3. Add webhook URL: `https://yourdomain.com/api/paystack/webhook`
4. Select these events:
   - `subscription.create`
   - `subscription.disable`
   - `invoice.payment_successful`
   - `invoice.payment_failed`
   - `charge.success`

### 6. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/subscribe`
3. Test with Paystack test cards:
   - **Successful Payment**: 4084084084084081
   - **Failed Payment**: 4084084084084085

## 📋 Detailed Setup Steps

### Paystack Account Setup

1. **Create Paystack Account**
   - Go to [paystack.com/gh](https://paystack.com/gh/)
   - Complete business verification
   - Get your API keys from Settings > API Keys & Webhooks

2. **Create Subscription Plans**
   ```bash
   # Run the setup script
   node scripts/create-paystack-plans.js
   ```

3. **Configure Webhooks**
   - Webhook URL: `https://yourdomain.com/api/paystack/webhook`
   - Events: All subscription and payment events
   - Copy the webhook secret to your `.env.local`

### Sanity CMS Setup

1. **Create Project**
   - Go to [sanity.io](https://sanity.io)
   - Create a new project
   - Get your Project ID and create an API token

2. **Create Subscription Plans**
   ```bash
   # Run the setup script
   node scripts/create-sanity-plans.js
   ```

3. **Update Plan Codes**
   - Go to your Sanity Studio
   - Find the subscription plans
   - Update `paystackPlanCode` and `paystackPlanId` with actual Paystack values

### Auth0 Setup

1. **Create Auth0 Application**
   - Go to [auth0.com](https://auth0.com)
   - Create a new application
   - Configure callback URLs
   - Get your credentials

2. **Configure Environment Variables**
   - Add all Auth0 credentials to `.env.local`
   - Ensure callback URLs are correct

## 🧪 Testing

### Test Cards (Ghana)
```
Successful Payment: 4084084084084081
Failed Payment: 4084084084084085
Insufficient Funds: 4084084084084082
```

### Test Flow
1. **Create Subscription**
   - Go to `/subscribe`
   - Select a plan
   - Use test card: 4084084084084081
   - Complete payment

2. **Verify Data**
   - Check Paystack dashboard for transaction
   - Check Sanity Studio for user subscription
   - Verify webhook events

3. **Test Management**
   - Go to `/my-account/subscription`
   - Test cancel/reactivate functionality

## 🔧 Troubleshooting

### Common Issues

1. **Webhook not receiving events**
   ```bash
   # Check webhook URL is accessible
   curl -X POST https://yourdomain.com/api/paystack/webhook
   ```

2. **Subscription not syncing**
   - Verify Paystack plan codes in Sanity
   - Check webhook signature validation
   - Review server logs

3. **Payment failures**
   - Check Paystack dashboard
   - Verify API keys are correct
   - Test with different cards

### Debug Tools

1. **Paystack Dashboard**
   - Monitor transactions
   - Check webhook delivery
   - View subscription status

2. **Sanity Studio**
   - Inspect subscription data
   - Check user records
   - Verify plan configurations

3. **Application Logs**
   - Check webhook processing
   - Review API errors
   - Monitor subscription updates

## 🚀 Production Deployment

### Pre-deployment Checklist

- [ ] Replace test API keys with live keys
- [ ] Update webhook URL to production domain
- [ ] Test complete subscription flow
- [ ] Verify webhook event handling
- [ ] Set up monitoring and alerts

### Environment Variables (Production)

```env
# Production Paystack Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key
PAYSTACK_WEBHOOK_SECRET=your_live_webhook_secret

# Production URLs
AUTH0_BASE_URL=https://yourdomain.com
```

### Monitoring

1. **Paystack Dashboard**
   - Monitor transaction success rates
   - Track subscription metrics
   - Set up payment alerts

2. **Application Monitoring**
   - Webhook delivery success
   - API response times
   - Error rates and logs

## 📞 Support

### Paystack Support
- **Documentation**: [paystack.com/docs](https://paystack.com/docs)
- **Support**: support@paystack.com
- **Status**: [status.paystack.com](https://status.paystack.com)

### Sanity Support
- **Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **Community**: [sanity.io/community](https://sanity.io/community)

### Implementation Support
- Check webhook logs for issues
- Monitor browser console for errors
- Verify API key configuration
- Test with different payment methods

---

**Note**: This integration is specifically configured for Ghana (GHS currency) and follows Paystack Ghana's requirements and best practices.
