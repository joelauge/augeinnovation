const axios = require('axios');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Get access token (you'll need to implement OAuth flow first)
    const accessToken = await getXeroAccessToken();
    
    // Get organizations (tenants)
    const response = await axios.get('https://api.xero.com/api.xro/2.0/Organisation', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const organizations = response.data.Organisations;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        organizations: organizations.map(org => ({
          tenantId: org.OrganisationID,
          name: org.Name,
          countryCode: org.CountryCode
        }))
      })
    };

  } catch (error) {
    console.error('Error getting Xero tenants:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to get Xero tenants',
        message: error.message
      })
    };
  }
};

async function getXeroAccessToken() {
  // This is a simplified version - you'll need to implement full OAuth flow
  const XERO_CLIENT_ID = process.env.XERO_CLIENT_ID;
  const XERO_CLIENT_SECRET = process.env.XERO_CLIENT_SECRET;
  
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