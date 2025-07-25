const API_BASE = "https://augeinnovation.vercel.app/api";

// Get the current admin's email from Clerk
function getAdminEmail() {
  // Get the current user from Clerk
  if (window.Clerk && window.Clerk.user) {
    return window.Clerk.user.emailAddresses?.[0]?.emailAddress || '';
  }
  return '';
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/admin-users`, {
    headers: { "x-admin-email": getAdminEmail() }
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()).users;
}

export async function approveUser(userId) {
  const res = await fetch(`${API_BASE}/admin-approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-email": getAdminEmail()
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error("Failed to approve user");
  return await res.json();
}

export async function rejectUser(userId) {
  const res = await fetch(`${API_BASE}/admin-reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-email": getAdminEmail()
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error("Failed to reject user");
  return await res.json();
} 