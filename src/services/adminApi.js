const API_BASE = "https://augeinnovation.vercel.app/api";

export async function fetchUsers(userEmail) {
  console.log("Admin API: using userEmail header:", userEmail);
  console.log("Admin API: userEmail type:", typeof userEmail);
  console.log("Admin API: userEmail length:", userEmail?.length);
  
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