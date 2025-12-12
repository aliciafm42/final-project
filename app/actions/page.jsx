"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ActionsPage() {
  const { user } = useAuth();
  const [action, setAction] = useState("");
  const [actions, setActions] = useState([]);

  const fetchActions = async () => {
    if (!user) return;
    const res = await fetch("/api/actions/list?userId=" + user.id);
    const data = await res.json();
    setActions(data.actions || []);
  };

  const handleAddAction = async () => {
    if (!action) return;
    const res = await fetch("/api/actions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: action, userId: user.id }),
    });
    const data = await res.json();
    if (res.ok) {
      setActions([...actions, data.action]);
      setAction("");
    }
  };

  useEffect(() => { fetchActions(); }, [user]);

  // UI for users not logged in
// UI for users not logged in
if (!user) {
  return (
    <div className="page-contain" style={{ textAlign: "center" }}>
      <h1>Eco Actions Tracker</h1>
      <p>
        Track your daily eco-friendly habits and make a positive impact on the planet! Recycle, save energy, and see your progress over time.
      </p>
      <Link 
        href="/profile" 
        className="green-button" 
        style={{ marginTop: "30px", display: "inline-block" }} // added bigger gap
      >
        Login or Register
      </Link>
    </div>
  );
}


  // UI for logged in users
  return (
    <div className="page-container">
      <h2>Log Daily Eco-Friendly Actions</h2>
      <input
        type="text"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        placeholder="e.g., Recycled paper"
        className="input-field"
      />
      <button onClick={handleAddAction} className="green-button">
        Add Action
      </button>

      <ul style={{ marginTop: "20px", paddingLeft: "0", listStyle: "none" }}>
        {actions.map((a) => (
          <li
            key={a.id}
            style={{
              backgroundColor: "#DDF0D7",
              padding: "10px 15px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
