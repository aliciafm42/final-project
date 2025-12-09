"use client";

import { useState, useEffect } from "react";

export default function GoalsPage() {
  const [user, setUser] = useState(null);
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch("/api/goals");
    const data = await res.json();
    setGoals(data);
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));

    fetchGoals();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: goal }),
    });
    if (res.ok) {
      setGoal("");
      fetchGoals();
    }
  };

  if (!user) return <p>Please log in to view goals.</p>;

  return (
    <div>
      <h2>Your Goals</h2>
      <form onSubmit={handleAddGoal}>
        <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="New goal" required />
        <button type="submit">Add Goal</button>
      </form>

      <ul>
        {goals.map((g) => (
          <li key={g.id}>
            {g.title} - {g.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
