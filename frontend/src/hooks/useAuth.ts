"use client";
import { useState, useEffect } from "react";
import { login, logout, getCurrentUser } from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      const data = await login(email, password);
      setUser(data);
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return { user, loading, error, handleLogin, handleLogout };
}
