// Vercel serverless function: POST /api/admin/reject
import fetch from 'node-fetch';

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_API_URL = 'https://api.clerk.dev/v1/users';
const ADMIN_EMAILS = ['joelauge@gmail.com', 'pierre@augeinnovation.com'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://augeinnovation.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-email');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Admin authentication (simple header check)
  const adminEmail = req.headers['x-admin-email'];
  if (!ADMIN_EMAILS.includes(adminEmail)) {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const response = await fetch(`${CLERK_API_URL}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: { approvalStatus: 'rejected' }
      })
    });
    if (!response.ok) {
      throw new Error('Failed to reject user');
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 