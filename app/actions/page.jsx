"use client";

import { useState, useEffect } from "react";

export default function ActionsPage() {
  const [user, setUser] = useState(null);
  const [action, setAction] = useState("");
  const [actions, setActions] = useState([]);

  const fetchActions = async () => {
    const res = await fetch("/api/actions");
    const data = await res.json();
    setActions(data);
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));

    fetchActions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch("/api/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: action }),
    });
    if (res.ok) {
      setAction("");
      fetchActions();
      window.dispatchEvent(new Event("userUpdated")); // update header points
    }
  };

  if (!user) return <p>Please log in to log actions.</p>;

  return (
    <div>
      <h2>Log an Action</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Describe your eco-friendly action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          required
        />
        <button type="submit">Log Action</button>
      </form>

      <h3>Recent Actions</h3>
      <ul>
        {actions.map((a) => (
          <li key={a.id}>{a.description}</li>
        ))}
      </ul>
    </div>
  );
}
