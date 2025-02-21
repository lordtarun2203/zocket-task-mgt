"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../lib/api"; // ✅ Fetch only users here
import TaskList from "../components/TaskList"; // ✅ TaskList handles tasks
import UserList from "@/components/UserList"; // ✅ Ensure correct path

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">🚀 Task Management Dashboard</h1>

      {/* Users Section */}
      <div className="w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Users</h2>
        <UserList />{" "}
        {/* ✅ Now UserList (with Add/Delete buttons) is rendered */}
      </div>

      {/* Tasks Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold border-b pb-2">Tasks</h2>
        <TaskList /> {/* ✅ Uses TaskList to manage tasks dynamically */}
      </div>
    </div>
  );
}
