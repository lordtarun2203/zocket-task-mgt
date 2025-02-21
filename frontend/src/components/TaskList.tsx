"use client";
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../api/tasks"; // Import createTask
import { useWebSocket } from "../hooks/useWebSocket"; // WebSocket Hook

export default function TaskList() {
  const [tasks, setTasks] = useState<{ id: string; title: string; description: string }[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" }); // New task input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage } = useWebSocket(); // WebSocket messages

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Handle real-time updates
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      try {
        const updatedTask = JSON.parse(latestMessage);
        setTasks((prevTasks) => {
          if (updatedTask.action === "delete") {
            return prevTasks.filter((task) => task.id !== updatedTask.id);
          } else if (updatedTask.action === "update") {
            return prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
          } else if (updatedTask.action === "add") {
            return [...prevTasks, updatedTask];
          }
          return prevTasks;
        });
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    }
  }, [messages]);

  // Delete task & notify server
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      sendMessage(JSON.stringify({ action: "delete", id })); // Notify server
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update UI
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  // Create new task
  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) {
      setError("Title and description cannot be empty.");
      return;
    }
    try {
      const createdTask = await createTask(newTask.title, newTask.description);
      sendMessage(JSON.stringify({ action: "add", ...createdTask })); // Notify server
      setTasks([...tasks, createdTask]); // Update UI
      setNewTask({ title: "", description: "" }); // Clear input fields
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Task List (Real-time)</h2>

      {/* ✅ Task Input Fields */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded mb-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* ✅ Task List */}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border-b border-gray-700 py-2 flex justify-between">
              <div>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-sm text-gray-400">{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
