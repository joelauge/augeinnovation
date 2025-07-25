const API_BASE = "https://augeinnovation.vercel.app/api";

export async function fetchUsers(userEmail) {
  console.log("🔍 DEBUG: Admin API fetchUsers called");
  console.log("🔍 DEBUG: userEmail value:", userEmail);
  console.log("🔍 DEBUG: userEmail type:", typeof userEmail);
  console.log("🔍 DEBUG: userEmail length:", userEmail?.length);
  console.log("🔍 DEBUG: Is joelauge@gmail.com?", userEmail === 'joelauge@gmail.com');
  console.log("🔍 DEBUG: Is pierre@augeinnovation.com?", userEmail === 'pierre@augeinnovation.com');
  
  const res = await fetch(`${API_BASE}/admin-users`, {
    headers: { "x-admin-email": userEmail }
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()).users;
}

export async function approveUser(userId, userEmail) {
  console.log("Admin API: approveUser - userEmail:", userEmail);
  
  const res = await fetch(`${API_BASE}/admin-approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-email": userEmail
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error("Failed to approve user");
  return await res.json();
}

export async function rejectUser(userId, userEmail) {
  console.log("Admin API: rejectUser - userEmail:", userEmail);
  
  const res = await fetch(`${API_BASE}/admin-reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-email": userEmail
    },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error("Failed to reject user");
  return await res.json();
} 