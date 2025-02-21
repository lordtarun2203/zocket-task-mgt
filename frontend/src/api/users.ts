const API_URL = "http://localhost:8080"; // Change if backend runs on a different port

// Fetch all users
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users.");
  return res.json();
}

// Create a new user
export async function createUser(user: { name: string; email: string }) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to create user.");
  return res.json();
}

// Delete a user
export async function deleteUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user.");
}
