"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("BEGINNER");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // Separate functions: one for LOGIN, one for REGISTER
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    setEmailError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Login failed");
        return;
      }

      login(data.user);
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Login failed: " + err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Registering...");
    setEmailError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, experienceLevel }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error.includes("Email")) {
          setEmailError(data.error);
        } else {
          setMessage(data.error || "Registration failed");
        }
        return;
      }

      login(data.user);
      setMessage("Registration successful!");
    } catch (err) {
      setMessage("Registration failed: " + err.message);
    }
  };

  // Logged-in view
  if (user) {
    return (
      <div className="profile-page p-4">
        <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
        <p>Experience Level: {user.experienceLevel || "BEGINNER"}</p>
        <p className="text-green-700 font-medium mt-2">Login successful!</p>
      </div>
    );
  }

  // Login/Register UI stays EXACTLY the same style you had
  return (
    <div className="login-register-page p-4 max-w-xs">
      <h2 className="text-xl font-bold mb-4">Welcome! Please Login or Register</h2>

      <form className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        {emailError && (
          <p className="text-red-600 text-sm">{emailError}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />

        {/* Experience Level always shows when registering */}
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="EXPERIENCED">Experienced</option>
        </select>

        {/* Buttons side-by-side like original */}
        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 p-2 bg-green-700 text-white rounded"
            onClick={handleLogin}
          >
            Login
          </button>

          <span className="self-center text-gray-600">|</span>

          <button
            className="flex-1 p-2 bg-green-600 text-white rounded"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>

      {message && <p className="mt-2 text-sm text-blue-700">{message}</p>}
    </div>
  );
}
