"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, fetchUser } = useAuth();
  const [points, setPoints] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const calculatePoints = async () => {
      if (!user) return setPoints(0);

      const res = await fetch("/api/actions");
      const actions = await res.json();

      const totalPoints = actions.reduce(
        (sum, a) => sum + (user.experienceLevel === "beginner" ? 20 : 10),
        0
      );
      setPoints(totalPoints);
    };
    calculatePoints();
  }, [user]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await fetchUser(); // refresh auth state
    router.push("/profile");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>🌿</span> EcoTrack
      </div>

      <div className="nav-links">
        <a href="/">Home</a>

        {user && (
          <>
            <a href="/dashboard">Dashboard</a>
            <a href="/actions">Log Actions</a>
            <a href="/goals">Goals</a>
            <a href="/recommendations">Recommendations</a>
            <span className="user-info">
              {user.experienceLevel === "beginner" ? "🌱 Beginner" : "🌳 Experienced"}
              <span className="points-badge">{points} pts</span>
            </span>
          </>
        )}

        <a href="/profile">{user ? "Profile" : "Login/Register"}</a>
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
