"use client";
import { useState } from "react";
import { createTask } from "../api/tasks";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createTask(title, description);
      setTitle("");
      setDescription("");
      onTaskCreated(); // Refresh task list
    } catch (err) {
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Task</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-white border border-gray-500 rounded-md text-black placeholder-gray-500 focus:ring focus:ring-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-white border border-gray-500 rounded-md text-black placeholder-gray-500 focus:ring focus:ring-blue-500"
          placeholder="Enter task description"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-500"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
