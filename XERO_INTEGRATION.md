# Xero Integration Setup Guide

This guide will walk you through setting up the automatic invoice creation feature that integrates with Xero.

## 🎯 Overview

The "Request Invoice" feature allows customers to submit detailed information through a professional form, which automatically creates an invoice in your Xero account and sends confirmation emails.

## 🔧 Setup Options

### Option 1: Netlify Functions (Recommended)

This approach uses serverless functions to handle the Xero API integration.

#### Step 1: Set up Xero App

1. **Create a Xero App**:
   - Go to [Xero Developer Portal](https://developer.xero.com/)
   - Click "New App"
   - Choose "Web app" or "Private app" (Private is easier for single-tenant use)
   - Fill in app details:
     - App name: "AI Innovation Client Portal"
     - Description: "Invoice creation for firearms training robots"
     - Redirect URI: `https://yourdomain.com/auth/callback` (for web app)

2. **Get Your Credentials**:
   - Copy your `Client ID` and `Client Secret`
   - For Private apps, you'll also get a `Tenant ID`

3. **Configure Scopes**:
   - Enable: `offline_access`
   - Enable: `accounting.transactions`
   - Enable: `accounting.contacts`

#### Step 2: Set up Netlify Environment Variables

In your Netlify dashboard, go to Site Settings → Environment Variables and add:

```env
XERO_CLIENT_ID=your_client_id_here
XERO_CLIENT_SECRET=your_client_secret_here
XERO_TENANT_ID=your_tenant_id_here
XERO_REDIRECT_URI=https://yourdomain.com/auth/callback
ADMIN_EMAIL=sales@aiinnovation.com
```

#### Step 3: Deploy to Netlify

1. **Connect your GitHub repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Functions directory: `netlify/functions`
3. **Deploy automatically** on every push

### Option 2: Zapier Integration (Easiest)

If you prefer a no-code solution:

1. **Create a Zapier account** at [zapier.com](https://zapier.com)
2. **Create a new Zap**:
   - Trigger: Webhook (Catch Hook)
   - Action: Xero (Create Invoice)
3. **Configure the webhook** to receive form data
4. **Set up Xero action** with your credentials
5. **Update the form submission** to send to Zapier webhook

### Option 3: Make.com (Integromat)

Similar to Zapier but more powerful:

1. **Create a Make.com account**
2. **Create a new scenario**:
   - Webhook → Xero → Email
3. **Configure the integration** with your Xero credentials

## 📧 Email Integration

### Option 1: Netlify Email Service

Netlify provides built-in email functionality:

1. **Enable Netlify Email** in your dashboard
2. **Configure email templates** for confirmations
3. **Set up email routing** for admin notifications

### Option 2: SendGrid Integration

For more advanced email features:

1. **Create a SendGrid account**
2. **Get your API key**
3. **Add to environment variables**:
   ```env
   SENDGRID_API_KEY=your_api_key_here
   ```
4. **Update the function** to use SendGrid

### Option 3: Mailgun Integration

Another popular email service:

1. **Create a Mailgun account**
2. **Get your API key and domain**
3. **Add to environment variables**:
   ```env
   MAILGUN_API_KEY=your_api_key_here
   MAILGUN_DOMAIN=your_domain_here
   ```

## 🔐 Authentication Methods

### For Private Apps (Simplest)

Private apps don't require OAuth2 flow:

```javascript
// The function already uses client credentials flow
const response = await axios.post('https://identity.xero.com/connect/token', 
  new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'offline_access accounting.transactions accounting.contacts'
  }), 
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`).toString('base64')}`
    }
  }
);
```

### For Web Apps (More Secure)

Web apps require OAuth2 flow:

1. **Set up OAuth2 endpoints** in your app
2. **Implement token refresh** logic
3. **Store tokens securely** (use environment variables or secure storage)

## 📊 Xero Configuration

### Chart of Accounts Setup

Make sure you have the correct account codes in Xero:

1. **Sales Account**: Usually code `200` or `4000`
2. **Tax Account**: Set up your tax codes
3. **Bank Account**: For receiving payments

### Invoice Templates

1. **Create a custom invoice template** in Xero
2. **Add your logo and branding**
3. **Include payment terms** and instructions
4. **Set up automatic email sending**

### Contact Management

The integration will:
- Create new contacts automatically
- Update existing contacts
- Store billing and shipping addresses

## 🚀 Testing the Integration

### Test the Form

1. **Fill out the invoice request form**
2. **Submit the request**
3. **Check Netlify function logs** for any errors
4. **Verify invoice creation** in Xero
5. **Check email delivery**

### Common Issues

1. **CORS Errors**: Make sure your domain is allowed in Xero app settings
2. **Authentication Errors**: Verify your credentials are correct
3. **Permission Errors**: Ensure your app has the right scopes
4. **Email Delivery**: Check your email service configuration

## 🔄 Alternative Implementation: Direct API

If you prefer to handle everything client-side (not recommended for production):

```javascript
// In your React component
const handleInvoiceRequest = async (formData) => {
  try {
    const response = await fetch('https://api.xero.com/api.xro/2.0/Invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Xero-tenant-id': tenantId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoiceData)
    });
    
    if (response.ok) {
      // Handle success
    }
  } catch (error) {
    // Handle error
  }
};
```

## 📈 Advanced Features

### Invoice Status Tracking

Add status tracking to your invoices:

```javascript
// Update invoice status
await axios.put(`https://api.xero.com/api.xro/2.0/Invoices/${invoiceId}`, {
  Status: 'AUTHORISED'
});
```

### Payment Integration

Connect with payment gateways:

1. **Stripe integration** for online payments
2. **Bank transfer** instructions
3. **Payment reminders** and follow-ups

### Reporting and Analytics

Track invoice performance:

1. **Conversion rates** from requests to payments
2. **Average order value** by product
3. **Customer lifetime value** analysis

## 🔒 Security Considerations

### Environment Variables

Never commit sensitive data to your repository:

```bash
# Add to .gitignore
.env
.env.local
.env.production
```

### API Rate Limiting

Xero has rate limits:
- 1000 requests per minute
- Implement retry logic for failed requests
- Cache responses when possible

### Data Validation

Always validate input data:

```javascript
// Validate required fields
const requiredFields = ['firstName', 'lastName', 'email', 'organization'];
for (const field of requiredFields) {
  if (!requestData[field]) {
    throw new Error(`Missing required field: ${field}`);
  }
}
```

## 📞 Support

### Xero Support

- [Xero Developer Documentation](https://developer.xero.com/)
- [Xero API Reference](https://developer.xero.com/documentation/api/)
- [Xero Community](https://community.xero.com/)

### Netlify Support

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/get-started/)

### Email Service Support

- [SendGrid Documentation](https://sendgrid.com/docs/)
- [Mailgun Documentation](https://documentation.mailgun.com/)

## 🎯 Next Steps

1. **Choose your integration method** (Netlify Functions recommended)
2. **Set up your Xero app** and get credentials
3. **Configure environment variables** in your hosting platform
4. **Test the integration** with sample data
5. **Deploy to production** and monitor performance
6. **Set up monitoring** and error tracking
7. **Train your team** on the new workflow

The invoice request feature will streamline your sales process and provide a professional experience for your law enforcement and military clients! 