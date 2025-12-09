// components/Profile/SettingsForm.jsx
"use client"; // Required in Next.js 13+ if using state

import { useState } from "react";

export default function SettingsForm() {
  const [username, setUsername] = useState("Alicia Martinez");
  const [email, setEmail] = useState("alicia@example.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: handle updating user settings
    alert(`Settings updated!\nUsername: ${username}\nEmail: ${email}`);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h3>Update Your Profile</h3>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
}
