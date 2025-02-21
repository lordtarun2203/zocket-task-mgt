const API_URL = "http://localhost:8080"; // Adjust if your backend URL changes

export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Include cookies (if needed)
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json(); // Expected to return user data + token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function register(username: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Registration failed");

    return res.json(); // Expected to return user data
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Ensure cookies are cleared
    });

    if (!res.ok) throw new Error("Logout failed");

    return res.json(); // Expected to return success message
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      credentials: "include", // Ensure authentication cookies are sent
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json(); // Expected to return user data
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // Return null if user is not authenticated
  }
}
