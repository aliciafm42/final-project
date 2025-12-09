"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("BEGINNER");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isRegistering ? "/api/auth/register" : "/api/auth/login";

      const bodyData = isRegistering
        ? { email, password, experienceLevel }
        : { email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show specific message if email is already in use
        if (data.error && data.error.includes("already in use")) {
          setMessage("This email is already registered. Please use a different email.");
        } else {
          setMessage(data.error || "Something went wrong.");
        }
        return;
      }

      login(data.user);
      setMessage(isRegistering ? "Registration successful!" : "Login successful!");
    } catch (err) {
      console.error(err);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  if (user) {
    return (
      <div className="profile-page p-4">
        <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
        <p>Experience Level: {user.experienceLevel || "BEGINNER"}</p>
        <p className="text-green-700 font-medium mt-2">Login successful!</p>
      </div>
    );
  }

  return (
    <div className="login-register-page p-4 max-w-xs">
      <h2 className="text-xl font-bold mb-4">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        {isRegistering && (
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="EXPERIENCED">Experienced</option>
          </select>
        )}
        <button
          type="submit"
          className="p-2 bg-green-700 text-white rounded mt-2"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-2 text-sm text-blue-700 cursor-pointer" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
      {message && <p className="mt-2 text-red-700">{message}</p>}
    </div>
  );
}
