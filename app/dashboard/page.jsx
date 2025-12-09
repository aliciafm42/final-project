"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) {
        setUser(data.user);

        const actionsRes = await fetch("/api/actions");
        const actionsData = await actionsRes.json();
        const totalPoints = actionsData.reduce(
          (sum, a) => sum + (data.user.experienceLevel === "beginner" ? 20 : 10),
          0
        );
        setPoints(totalPoints);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <p>Hello, {user.email}</p>
      <p>Your points: {points}</p>
    </div>
  );
}
