"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Left side — EcoTrack Logo */}
      <div className="logo">
        <span>🌿</span> EcoTrack
      </div>

      {/* Right side navigation links */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/goals">Goals</Link>
        <Link href="/actions">Actions</Link>
        <Link href="/recommendations">Recommendations</Link>

        {/* Show user info when logged in */}
        {user && (
          <div className="user-info">
            {user.email}
            <span className="points-badge">
              {user.experienceLevel || 0} pts
            </span>
          </div>
        )}

        {/* Show Login or Logout */}
        {!user ? (
          <Link href="/profile">Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
