const axios = require('axios');

// Xero API configuration
const XERO_CLIENT_ID = process.env.XERO_CLIENT_ID;
const XERO_CLIENT_SECRET = process.env.XERO_CLIENT_SECRET;
const XERO_TENANT_ID = process.env.XERO_TENANT_ID;
const XERO_REDIRECT_URI = process.env.XERO_REDIRECT_URI;

// Email configuration (using Netlify's built-in email service or external service)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sales@aiinnovation.com';

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const requestData = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'organization',
      'billingAddress', 'productId', 'productTitle', 'productPrice', 'total'
    ];
    
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Missing required field: ${field}` })
        };
      }
    }

    // Create Xero invoice
    const invoiceResult = await createXeroInvoice(requestData);
    
    // Send confirmation email
    await sendConfirmationEmail(requestData);
    
    // Send notification to admin
    await sendAdminNotification(requestData, invoiceResult);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Invoice request submitted successfully',
        invoiceId: invoiceResult.invoiceId,
        reference: invoiceResult.reference
      })
    };

  } catch (error) {
    console.error('Error processing invoice request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

async function createXeroInvoice(requestData) {
  try {
    // Get Xero access token (you'll need to implement OAuth2 flow)
    const accessToken = await getXeroAccessToken();
    
    // Prepare invoice data for Xero
    const invoiceData = {
      Type: 'ACCREC',
      Contact: {
        Name: requestData.organization,
        EmailAddress: requestData.email,
        Addresses: [
          {
            AddressType: 'STREET',
            AddressLine1: requestData.billingAddress
          }
        ],
        Phones: [
          {
            PhoneType: 'MOBILE',
            PhoneNumber: requestData.phone
          }
        ]
      },
      LineItems: [
        {
          Description: requestData.productTitle,
          Quantity: requestData.quantity,
          UnitAmount: requestData.productPrice,
          AccountCode: '200', // Sales account code (you'll need to set this up in Xero)
          TaxType: 'OUTPUT'
        }
      ],
      Reference: `AI-INV-${Date.now()}`,
      Status: 'DRAFT',
      CurrencyCode: 'USD',
      CurrencyRate: 1,
      Date: new Date().toISOString().split('T')[0],
      DueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      LineAmountTypes: 'Exclusive',
      SubTotal: requestData.total,
      TotalTax: 0, // Calculate based on your tax requirements
      Total: requestData.total
    };

    // Add special requirements as a note if provided
    if (requestData.specialRequirements) {
      invoiceData.LineItems.push({
        Description: 'Special Requirements',
        Quantity: 1,
        UnitAmount: 0,
        AccountCode: '200',
        TaxType: 'OUTPUT'
      });
    }

    // Create invoice in Xero
    const response = await axios.post(
      `https://api.xero.com/api.xro/2.0/Invoices`,
      invoiceData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Xero-tenant-id': XERO_TENANT_ID,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      invoiceId: response.data.Invoices[0].InvoiceID,
      reference: response.data.Invoices[0].Reference,
      status: 'success'
    };

  } catch (error) {
    console.error('Error creating Xero invoice:', error);
    throw new Error('Failed to create invoice in Xero');
  }
}

async function getXeroAccessToken() {
  // This is a simplified version. In production, you'll need to implement the full OAuth2 flow
  // For now, we'll use a stored refresh token or client credentials flow
  
  try {
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

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Xero access token:', error);
    throw new Error('Failed to authenticate with Xero');
  }
}

async function sendConfirmationEmail(requestData) {
  try {
    // You can use Netlify's built-in email service or integrate with services like SendGrid, Mailgun, etc.
    const emailData = {
      to: requestData.email,
      from: ADMIN_EMAIL,
      subject: 'Invoice Request Received - AI Innovation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">Invoice Request Received</h2>
          <p>Dear ${requestData.firstName} ${requestData.lastName},</p>
          <p>Thank you for your invoice request for our ${requestData.productTitle}.</p>
          <p><strong>Request Details:</strong></p>
          <ul>
            <li>Product: ${requestData.productTitle}</li>
            <li>Quantity: ${requestData.quantity}</li>
            <li>Total: $${requestData.total.toLocaleString()}</li>
            <li>Organization: ${requestData.organization}</li>
          </ul>
          <p>We will create your invoice in our system and email it to you within 24 hours.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>AI Innovation Team</p>
        </div>
      `
    };

    // For now, we'll just log the email data
    // In production, integrate with your preferred email service
    console.log('Confirmation email data:', emailData);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error here as it's not critical
    return { success: false };
  }
}

async function sendAdminNotification(requestData, invoiceResult) {
  try {
    const emailData = {
      to: ADMIN_EMAIL,
      from: 'noreply@aiinnovation.com',
      subject: 'New Invoice Request - AI Innovation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">New Invoice Request</h2>
          <p><strong>Customer Details:</strong></p>
          <ul>
            <li>Name: ${requestData.firstName} ${requestData.lastName}</li>
            <li>Email: ${requestData.email}</li>
            <li>Phone: ${requestData.phone}</li>
            <li>Organization: ${requestData.organization}</li>
          </ul>
          <p><strong>Product Details:</strong></p>
          <ul>
            <li>Product: ${requestData.productTitle}</li>
            <li>Quantity: ${requestData.quantity}</li>
            <li>Total: $${requestData.total.toLocaleString()}</li>
          </ul>
          <p><strong>Invoice Details:</strong></p>
          <ul>
            <li>Invoice ID: ${invoiceResult.invoiceId}</li>
            <li>Reference: ${invoiceResult.reference}</li>
          </ul>
          <p><strong>Special Requirements:</strong></p>
          <p>${requestData.specialRequirements || 'None'}</p>
          <p><strong>Delivery Date:</strong></p>
          <p>${requestData.deliveryDate || 'Not specified'}</p>
        </div>
      `
    };

    // For now, we'll just log the email data
    // In production, integrate with your preferred email service
    console.log('Admin notification email data:', emailData);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    // Don't throw error here as it's not critical
    return { success: false };
  }
} 