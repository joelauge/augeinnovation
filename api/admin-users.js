// Vercel serverless function: GET /api/admin/users
import fetch from 'node-fetch';

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_API_URL = 'https://api.clerk.dev/v1/users';
const ADMIN_EMAILS = ['joelauge@gmail.com', 'pierre@augeinnovation.com'];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Admin authentication (simple header check)
  const adminEmail = req.headers['x-admin-email'];
  if (!ADMIN_EMAILS.includes(adminEmail)) {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  try {
    const response = await fetch(CLERK_API_URL, {
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users from Clerk');
    }
    const users = await response.json();
    // Map users to include only relevant info and approval status
    const mappedUsers = users.map(u => ({
      id: u.id,
      email: u.email_addresses?.[0]?.email_address || '',
      firstName: u.first_name,
      lastName: u.last_name,
      approvalStatus: u.public_metadata?.approvalStatus || 'pending',
    }));
    return res.status(200).json({ users: mappedUsers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 