"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GoalsPage() {
  const { user } = useAuth();
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  const handleAddGoal = async () => {
    if (!user) {
      alert("Login to save goals permanently.");
      return;
    }

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      if (res.ok) setMessage("Goal saved!");
      else setMessage("Failed to save goal.");
    } catch {
      setMessage("Server error while saving goal.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Goals</h1>
      <input
        type="text"
        placeholder="Enter a new goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button onClick={handleAddGoal}>Add Goal</button>
      {message && <p>{message}</p>}
      {!user && (
        <p style={{ fontSize: "0.9em", color: "gray" }}>
          Login to save your goals permanently.
        </p>
      )}
    </div>
  );
}
