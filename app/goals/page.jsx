"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GoalsPage() {
  const { user } = useAuth();
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    if (!user) return;
    const res = await fetch("/api/goals/list?userId=" + user.id);
    const data = await res.json();
    setGoals(data.goals || []);
  };

  const handleAddGoal = async () => {
    if (!goal) return;
    const res = await fetch("/api/goals/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: goal, userId: user.id }),
    });
    const data = await res.json();
    if (res.ok) {
      setGoals([...goals, data.goal]);
      setGoal("");
    }
  };

  useEffect(() => { fetchGoals(); }, [user]);

  if (!user) return <p>Please login to view goals.</p>;

  return (
    <div className="page-container">
      <h2>Set Your Goals</h2>
      <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Bike to school 3x/week" />
      <button onClick={handleAddGoal}>Add Goal</button>
      <ul>{goals.map((g) => <li key={g.id}>{g.text}</li>)}</ul>
    </div>
  );
}
