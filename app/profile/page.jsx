"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        login(data.user); // Save user in AuthContext
        router.push("/dashboard"); // Redirect after login
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}
