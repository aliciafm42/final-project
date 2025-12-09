"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { login, user } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regExperience, setRegExperience] = useState("");
  const [message, setMessage] = useState("");

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.user);
      setMessage("Login successful!");
    } else {
      setMessage(data.error);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regExperience) {
      setMessage("Please select your experience level");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: regEmail,
        password: regPassword,
        experience: regExperience,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.user);
      setMessage("Account created!");
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      {!user && (
        <>
          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          {/* Registration Form */}
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <label>Experience Level</label>
            <select
              value={regExperience}
              onChange={(e) => setRegExperience(e.target.value)}
              required
            >
              <option value="">Select your level</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="EXPERIENCED">Experienced</option>
            </select>
            <button type="submit">Create Account</button>
          </form>
        </>
      )}

      {user && (
        <div>
          <h2>Welcome {user.email}</h2>
          <p>Experience Level: {user.experienceLevel}</p>
        </div>
      )}

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
