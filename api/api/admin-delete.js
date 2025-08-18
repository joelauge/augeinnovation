import fetch from 'node-fetch';

const ADMIN_EMAILS = ['joelauge@gmail.com', 'pierre@augeinnovation.com'];
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = [
    'https://augeinnovation.com',
    'https://www.augeinnovation.com',
    'https://joelauge.github.io'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-email');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminEmail = req.headers['x-admin-email'];
  console.log('Backend: Received adminEmail header:', adminEmail);
  console.log('Backend: Request body:', req.body);

  if (!ADMIN_EMAILS.includes(adminEmail)) {
    console.log('Backend: Access denied - email not in admin list:', adminEmail);
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('Backend: Deleting user with ID:', userId);

    // Delete user from Clerk
    const deleteResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Backend: Clerk delete response status:', deleteResponse.status);

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.text();
      console.log('Backend: Clerk delete error:', errorData);
      return res.status(deleteResponse.status).json({ 
        error: `Failed to delete user from Clerk: ${deleteResponse.status}` 
      });
    }

    console.log('Backend: User deleted successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'User deleted successfully' 
    });

  } catch (error) {
    console.error('Backend: Error deleting user:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
} 