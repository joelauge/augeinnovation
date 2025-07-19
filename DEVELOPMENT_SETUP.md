# 🔧 Development Setup Guide

## 🚨 Current Issue

The application is running but showing errors because the environment variables aren't configured. This is normal for a new setup!

## ✅ Quick Fix

### 1. Create Environment File

Create a `.env.local` file in your project root with these placeholder values:

```env
# Clerk.dev Authentication - Replace with your actual key
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Stripe Payments - Replace with your actual key
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# Xero Integration (for Netlify Functions) - Replace with your actual credentials
XERO_CLIENT_ID=your_xero_client_id_here
XERO_CLIENT_SECRET=your_xero_client_secret_here
XERO_TENANT_ID=your_xero_tenant_id_here
XERO_REDIRECT_URI=https://yourdomain.com/auth/callback

# Email Configuration
ADMIN_EMAIL=sales@aiinnovation.com
```

### 2. Get Real API Keys

#### Clerk.dev Setup (Required for Authentication)
1. Go to [clerk.dev](https://clerk.dev) and create an account
2. Create a new application
3. Go to API Keys in the dashboard
4. Copy your publishable key
5. Replace `pk_test_your_clerk_key_here` with your actual key

#### Stripe Setup (Required for Payments)
1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to Developers → API Keys
3. Copy your publishable key
4. Replace `pk_test_your_stripe_key_here` with your actual key

### 3. Restart Development Server

After creating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm start
```

## 🎯 What Each Error Means

### Clerk Error
```
The publishableKey passed to Clerk is invalid
```
- **Cause**: Using placeholder key instead of real Clerk key
- **Fix**: Get real key from Clerk dashboard

### Stripe Warning
```
You may test your Stripe.js integration over HTTP
```
- **Cause**: Using HTTP instead of HTTPS (normal for development)
- **Fix**: This is just a warning, works fine in development

### Manifest Icon Error
```
Error while trying to use the following icon from the Manifest
```
- **Cause**: Missing logo files
- **Fix**: Add logo files or ignore (not critical for development)

## 🚀 Development Workflow

### 1. With Real API Keys (Recommended)
- Set up Clerk and Stripe accounts
- Use real API keys
- Test full functionality including authentication and payments

### 2. With Placeholder Keys (Quick Testing)
- Use placeholder keys
- Test UI and navigation
- Skip authentication and payment features
- Focus on design and layout

## 🔧 Alternative: Mock Mode

If you want to test without setting up accounts, I can create a mock mode that bypasses authentication and payments. Would you like me to implement this?

## 📱 Testing the Invoice Request Feature

### With Real Setup
1. Set up Xero app and get credentials
2. Configure Netlify functions
3. Test full invoice creation flow

### With Mock Setup
1. Test form UI and validation
2. Test form submission (will show success message)
3. Skip actual Xero integration

## 🎨 UI Testing (Works Now!)

Even with the API errors, you can still test:
- ✅ Landing page design
- ✅ Navigation and routing
- ✅ Product pages layout
- ✅ Invoice request form UI
- ✅ Responsive design
- ✅ Animations and transitions

## 🔄 Next Steps

1. **Choose your approach**:
   - Set up real API keys for full testing
   - Use mock mode for UI testing
   - Continue with current setup for design review

2. **For full functionality**:
   - Follow the setup guides in `XERO_INTEGRATION.md`
   - Set up all environment variables
   - Test complete user flow

3. **For deployment**:
   - Follow `DEPLOYMENT_CHECKLIST.md`
   - Set up hosting platform
   - Configure production environment variables

## 💡 Pro Tips

- **Development**: Use `.env.local` for local development
- **Production**: Set environment variables in hosting platform
- **Testing**: Use test keys from Clerk and Stripe
- **Security**: Never commit real API keys to Git

The application is working correctly - it just needs the API keys configured! 🎯 