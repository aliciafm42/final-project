"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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

  if (!user) return <p>Please login to view actions.</p>;

  return (
    <div className="page-container">
      <h2>Log Daily Eco-Friendly Actions</h2>
      <input value={action} onChange={(e) => setAction(e.target.value)} placeholder="e.g., Recycled paper" />
      <button onClick={handleAddAction}>Add Action</button>
      <ul>{actions.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
    </div>
  );
}
