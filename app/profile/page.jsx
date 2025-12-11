"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [activeForm, setActiveForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("BEGINNER");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

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
        if (data.error.includes("Email")) setEmailError(data.error);
        else setMessage(data.error || "Registration failed");
        return;
      }

      login(data.user);
      setMessage("Registration successful!");
    } catch (err) {
      setMessage("Registration failed: " + err.message);
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-[#e0f7f1] to-[#a8e6cf]">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <h2 className="text-5xl font-bold mb-6 text-[#2e8b57]">
            Welcome, {user.email.split("@")[0]}!
          </h2>
          <p className="text-[#3a7ca5] text-xl mb-6">
            Experience Level: <span className="font-semibold">{user.experienceLevel || "Beginner"}</span>
          </p>
          <p className="text-green-600 font-semibold text-xl">You are successfully logged in!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-[#e0f7f1] to-[#a8e6cf]">
      <div className="w-full max-w-md bg-white p-12 rounded-3xl shadow-2xl">
        {activeForm === "login" && (
          <form className="flex flex-col gap-8" onSubmit={handleLogin}>
            <h2 className="text-4xl font-bold text-[#2e8b57] text-center">Welcome Back!</h2>
            <p className="text-gray-500 text-center text-xl mb-4">Log in to continue your adventure</p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-6 border border-gray-300 rounded-2xl text-xl focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-6 border border-gray-300 rounded-2xl text-xl focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
            />

            <button
              type="submit"
              className="p-6 bg-gradient-to-r from-[#2e8b57] to-[#3cb371] text-white rounded-2xl text-xl font-semibold hover:scale-105 transition-transform"
            >
              Login
            </button>

            <button
              type="button"
              className="p-6 text-[#2e8b57] underline text-xl hover:text-[#3cb371]"
              onClick={() => {
                setActiveForm("register");
                setMessage("");
              }}
            >
              Don't have an account? Register
            </button>
          </form>
        )}

        {activeForm === "register" && (
          <form className="flex flex-col gap-8" onSubmit={handleRegister}>
            <h2 className="text-4xl font-bold text-[#3cb371] text-center">Join Us!</h2>
            <p className="text-gray-500 text-center text-xl mb-4">Create your account and start exploring</p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-6 border border-gray-300 rounded-2xl text-xl focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
            />
            {emailError && <p className="text-red-600 text-lg">{emailError}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-6 border border-gray-300 rounded-2xl text-xl focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
            />

            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="p-6 border border-gray-300 rounded-2xl text-xl focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="EXPERIENCED">Experienced</option>
            </select>

            <button
              type="submit"
              className="p-6 bg-gradient-to-r from-[#3cb371] to-[#2e8b57] text-white rounded-2xl text-xl font-semibold hover:scale-105 transition-transform"
            >
              Register
            </button>

            <button
              type="button"
              className="p-6 text-[#2e8b57] underline text-xl hover:text-[#3cb371]"
              onClick={() => {
                setActiveForm("login");
                setMessage("");
              }}
            >
              Already have an account? Login
            </button>
          </form>
        )}

        {message && (
          <p className={`mt-8 text-center ${message.includes("failed") ? "text-red-600" : "text-green-600"} text-xl`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
