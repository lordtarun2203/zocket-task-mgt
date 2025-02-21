"use client";
import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api/users";

export default function UserList() {
  const [users, setUsers] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await getUsers();

      // Ensure IDs are strings
      data = data.map((user: any, index: number) => ({
        ...user,
        id: user.id ? String(user.id) : `user-${index}`, // Fallback key
      }));

      console.log("Fetched users:", data);
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAddUser = async () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError(null);

    try {
      const addedUser = await createUser(newUser);

      if (!addedUser.id) {
        console.error("Error: Added user has no ID", addedUser);
        setError("Failed to add user: No ID returned from backend.");
        return;
      }

      setUsers((prevUsers) => [...prevUsers, addedUser]); // ✅ Update state with new user
      setNewUser({ name: "", email: "" }); // ✅ Clear input fields
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  // Delete user
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add User Form */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 bg-white text-black rounded-md placeholder-gray-500 border border-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 bg-white text-black rounded-md placeholder-gray-500 border border-gray-400"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      {loading ? (
        <p className="text-white">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li
              key={user.id} // ✅ Ensured unique key
              className="border-b border-gray-700 py-2 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
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
