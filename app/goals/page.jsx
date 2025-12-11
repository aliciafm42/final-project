"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GoalsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

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
    try {
      const res = await fetch("/api/goals/list?userId=" + user.id);
      const data = await res.json();
      const normalizedGoals = (data.goals || []).map((g) =>
        typeof g === "string" ? { id: g, text: g } : g
      );
      setGoals(normalizedGoals);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    }
  };

  // Toggle card selection
  const toggleSelection = (action) => {
    setSelectedGoals((prev) =>
      prev.includes(action) ? prev.filter((g) => g !== action) : [...prev, action]
    );
  };

  // Add selected goals
  const handleAddSelectedGoals = async () => {
    if (!selectedGoals.length) return;

    const addedGoals = [];
    for (let text of selectedGoals) {
      if (goals.some((g) => g.text === text)) continue;

      try {
        const res = await fetch("/api/goals/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, userId: user.id }),
        });
        const data = await res.json();
        if (res.ok) addedGoals.push({ id: data.goal.id || text, text });
      } catch (err) {
        console.error("Failed to add goal:", err);
      }
    }

    setGoals([...goals, ...addedGoals]);
    setSelectedGoals([]);
  };

  // Delete a goal
  const handleDeleteGoal = async (goalId) => {
    try {
      await fetch("/api/goals/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: goalId, userId: user.id }),
      });
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-20 text-red-600">
        Please login to view goals.
      </p>
    );

  // Show only actions not already added
  const availableActions = sustainableActions.filter(
    (action) => !goals.some((g) => g.text === action)
  );

  return (
    <div className="page-contain max-w-5xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Pick Your Sustainable Goals
      </h2>

      {/* Sustainable Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 justify-items-center">
        {availableActions.length === 0 && (
          <p className="text-gray-600">You’ve added all available goals!</p>
        )}
        {availableActions.map((action) => {
          const isSelected = selectedGoals.includes(action);
          return (
            <div
              key={action}
              onClick={() => toggleSelection(action)}
              className={`cursor-pointer p-6 w-64 border rounded-lg transition-all duration-300 ${
                isSelected
                  ? "bg-green-100 border-green-700 shadow-xl"
                  : "bg-white border-green-700 hover:shadow-lg hover:bg-green-50"
              }`}
            >
              <p className="text-green-700 font-medium text-lg">{action}</p>
            </div>
          );
        })}
      </div>

      {/* Confirm Button */}
      {selectedGoals.length > 0 && (
        <button
          onClick={handleAddSelectedGoals}
          className="bg-green-700 text-white font-bold px-10 py-3 rounded-lg hover:bg-green-800 transition mb-8"
        >
          Add Selected Goals
        </button>
      )}

      {/* Current Goals List */}
      <h3 className="text-2xl font-semibold mb-4">Your Goals:</h3>
      {goals.length === 0 ? (
        <p className="text-gray-600">No goals added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {goals.map((g) => (
            <div
              key={g.id}
              className="p-6 border rounded-lg shadow bg-white text-green-700 font-medium text-center w-64 flex justify-between items-center"
            >
              <span>{g.text}</span>
              <button
                onClick={() => handleDeleteGoal(g.id)}
                className="text-red-600 font-bold hover:text-red-800 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
