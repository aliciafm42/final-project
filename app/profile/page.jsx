"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const bodyData = isRegister ? { email, password, experienceLevel } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        setMessage(isRegister ? "Registered!" : "Logged in!");
        setEmail(""); setPassword(""); setExperienceLevel("");
        router.push("/dashboard");
      } else {
        setMessage(data.error || "Error");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="profile-page">
      <div className="toggle-buttons">
        <button onClick={() => setIsRegister(false)} disabled={!isRegister}>Login</button>
        <button onClick={() => setIsRegister(true)} disabled={isRegister}>Register</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        {isRegister && (
          <>
            <label>Are you new to sustainability?</label>
            <select value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} required>
              <option value="">Select</option>
              <option value="beginner">Yes, I’m new</option>
              <option value="experienced">No, I have experience</option>
            </select>
          </>
        )}

        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
