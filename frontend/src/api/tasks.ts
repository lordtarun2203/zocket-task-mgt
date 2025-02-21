const API_URL = "http://localhost:8080"; // Change this if your backend URL differs

async function fetchData(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorMessage = await res.text(); // Capture error response
      throw new Error(`Error ${res.status}: ${errorMessage || "Something went wrong"}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Request failed: ${url}`, error);
    throw new Error("Network error, please try again later.");
  }
}

// ✅ Get all tasks
export async function getTasks() {
  return fetchData(`${API_URL}/tasks`);
}

// ✅ Create a task
export async function createTask(title: string, description: string) {
  return fetchData(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
}

// ✅ Update a task
export async function updateTask(id: string, title: string, description: string) {
  return fetchData(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
}

// ✅ Delete a task
export async function deleteTask(id: string) {
  return fetchData(`${API_URL}/tasks/${id}`, { method: "DELETE" });
}
