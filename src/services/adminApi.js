const API_BASE = "https://augeinnovation.vercel.app/api";

export async function fetchUsers(userEmail) {
  console.log("🔍 DEBUG: Admin API fetchUsers called");
  console.log("🔍 DEBUG: userEmail value:", userEmail);
  console.log("🔍 DEBUG: userEmail type:", typeof userEmail);
  console.log("🔍 DEBUG: userEmail length:", userEmail?.length);
  console.log("🔍 DEBUG: Is joelauge@gmail.com?", userEmail === 'joelauge@gmail.com');
  console.log("🔍 DEBUG: Is pierre@augeinnovation.com?", userEmail === 'pierre@augeinnovation.com');
  
  try {
    console.log("🔍 DEBUG: Making fetch request to:", `${API_BASE}/admin-users`);
    const res = await fetch(`${API_BASE}/admin-users`, {
      headers: { "x-admin-email": userEmail }
    });
    
    console.log("🔍 DEBUG: API Response status:", res.status);
    console.log("🔍 DEBUG: API Response headers:", res.headers);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.log("🔍 DEBUG: API Error response:", errorText);
      throw new Error("Failed to fetch users");
    }
    
    const data = await res.json();
    console.log("🔍 DEBUG: API Success response:", data);
    return data.users;
  } catch (error) {
    console.log("🔍 DEBUG: API fetch error:", error);
    throw error;
  }
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

export async function deleteUser(userId, userEmail) {
  console.log("🔍 DEBUG: Admin API deleteUser called");
  console.log("🔍 DEBUG: userId:", userId);
  console.log("🔍 DEBUG: userEmail:", userEmail);
  
  try {
    const res = await fetch(`${API_BASE}/admin-delete`, {
      method: 'DELETE',
      headers: { 
        "Content-Type": "application/json",
        "x-admin-email": userEmail 
      },
      body: JSON.stringify({ userId })
    });

    console.log("🔍 DEBUG: Delete API Response status:", res.status);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.log("🔍 DEBUG: Delete API Error response:", errorData);
      throw new Error(errorData.error || 'Failed to delete user');
    }

    const data = await res.json();
    console.log("🔍 DEBUG: Delete API Success response:", data);
    return data;
  } catch (error) {
    console.log("🔍 DEBUG: Delete API fetch error:", error);
    throw error;
  }
} 