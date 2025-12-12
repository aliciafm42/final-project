"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-green-100 shadow-md">
      {/* Left side — EcoTrack Logo */}
      <div className="logo text-xl font-bold text-green-700 flex items-center gap-2">
        <Link href="/">
          <span>🌿 EcoTrack</span>
        </Link>
      </div>

      {/* Right side navigation links */}
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/goals">Goals</Link>
        <Link href="/actions">Actions</Link>
        <Link href="/recommendations">Recommendations</Link>

        {/* Show user info when logged in */}
        {user && (
          <div className="user-info flex items-center gap-2">
            <span>{user.email}</span>
            <span className="points-badge bg-green-200 text-green-800 px-2 py-1 rounded">
              {user.experienceLevel || 0} pts
            </span>
          </div>
        )}

        {/* Show Login or Logout */}
        {!user ? (
          <Link href="/profile" className="text-green-700 font-medium">
            Login/Register
          </Link>
        ) : (
          <button
            onClick={logout}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
