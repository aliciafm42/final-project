"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GoalsPage() {
  const { user } = useAuth();
  const [customGoal, setCustomGoal] = useState("");
  const [goals, setGoals] = useState([]);

  // Predefined sustainable action cards
  const sustainableActions = [
    "Bike to work/school 3x/week",
    "Reduce meat consumption",
    "Use reusable bags",
    "Plant a tree",
    "Compost kitchen waste",
    "Avoid single-use plastics",
    "Use public transport",
    "Buy local products",
    "Save energy at home",
  ];

  // Fetch user's goals from Neon database
  const fetchGoals = async () => {
    if (!user) return;
    const res = await fetch("/api/goals/list?userId=" + user.id);
    const data = await res.json();
    setGoals(data.goals || []);
  };

  // Add goal (custom or from card) to database
  const handleAddGoal = async (text) => {
    if (!text) return;
    const res = await fetch("/api/goals/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId: user.id }),
    });
    const data = await res.json();
    if (res.ok) {
      setGoals([...goals, data.goal]);
      setCustomGoal("");
    }
  };

  useEffect(() => { fetchGoals(); }, [user]);

  if (!user) return <p className="text-center mt-20 text-red-600">Please login to view goals.</p>;

  return (
    <div className="page-contain max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Set Your Sustainable Goals</h2>

      {/* Custom Goal Input */}
      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          value={customGoal}
          onChange={(e) => setCustomGoal(e.target.value)}
          placeholder="Add your own goal..."
          className="flex-1 p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={() => handleAddGoal(customGoal)}
          className="bg-green-700 text-white font-bold px-6 py-3 rounded hover:bg-green-800 transition"
        >
          Add
        </button>
      </div>

      {/* Predefined Sustainable Action Cards */}
      <h3 className="text-xl font-semibold mb-4">Pick from Suggested Actions:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {sustainableActions.map((action) => (
          <div
            key={action}
            onClick={() => handleAddGoal(action)}
            className="cursor-pointer p-4 border rounded-lg shadow hover:shadow-lg transition hover:bg-green-50"
          >
            <p className="text-green-700 font-medium">{action}</p>
          </div>
        ))}
      </div>

      {/* Current Goals List */}
      <h3 className="text-xl font-semibold mb-4">Your Goals:</h3>
      {goals.length === 0 ? (
        <p className="text-gray-600">No goals added yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {goals.map((g) => (
            <li
              key={g.id}
              className="p-4 border rounded-lg shadow bg-white text-green-700 font-medium text-center"
            >
              {g.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
