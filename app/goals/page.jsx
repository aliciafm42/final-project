"use client";
import { useState, useEffect } from "react";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/goals")
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  const addGoal = async () => {
    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setGoals([...goals, await res.json()]);
      setTitle("");
    }
  };

  return (
    <main>
      <h1>Your Goals</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Goal"
      />
      <button onClick={addGoal}>Add Goal</button>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.title} {goal.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </main>
  );
}
