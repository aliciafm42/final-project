"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ActionsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user's goals
  const fetchGoals = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/actions?userId=${user.id}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const data = await res.json();
      // Ensure progress is always a number
      const normalizedGoals = (data.goals || []).map(g => ({
        ...g,
        progress: g.progress ?? 0
      }));
      setGoals(normalizedGoals);
    } catch (err) {
      console.error("Error fetching goals:", err);
      setError("Failed to load goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add progress locally
  const addProgressLocal = (goalId, increment) => {
    const inc = Number(increment);
    if (!inc || inc <= 0) return;

    setGoals(prevGoals =>
      prevGoals.map(g => {
        if (g.id === goalId) {
          const newProgress = Math.min((g.progress || 0) + inc, 10);
          return { ...g, progress: newProgress };
        }
        return g;
      })
    );
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  // Not logged in UI
  if (!user) {
    return (
      <div className="page-contain" style={{ textAlign: "center" }}>
        <h1>Set Your Eco Goals</h1>
        <p>Start small, stay consistent, and watch your eco-friendly impact grow over time.</p>
        <Link
          href="/profile"
          className="green-button"
          style={{ marginTop: "30px", display: "inline-block" }}
        >
          Login or Register
        </Link>
      </div>
    );
  }

  // Logged in UI
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Eco-Friendly Goals</h2>
      {loading && <p>Loading your goals...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && goals.length === 0 && <p>No goals yet. Add some in your profile!</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {goals.map(goal => {
          const progress = goal.progress ?? 0;
          const maxAdd = 10 - progress;

          return (
            <li
              key={goal.id}
              style={{
                backgroundColor: "#DDF0D7",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ flex: 1 }}>{goal.text}</span>
                <span>{progress}/10</span>

                <input
                  type="number"
                  min="1"
                  max={maxAdd.toString()}
                  placeholder="Add number"
                  style={{ width: "60px", padding: "5px" }}
                  onChange={e => {
                    const val = Math.min(Number(e.target.value), maxAdd);
                    if (val > 0) {
                      addProgressLocal(goal.id, val);
                      e.target.value = "";
                    }
                  }}
                />
              </div>

              <div
                style={{
                  height: "8px",
                  backgroundColor: "#a8e6a1",
                  borderRadius: "4px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(progress / 10) * 100}%`,
                    height: "100%",
                    backgroundColor: "#2e8b57",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
