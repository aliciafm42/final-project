"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/profile");
  };

  return (
    <nav className="navbar">
      <div className="logo"><span>🌿</span> EcoTrack</div>
      <div className="nav-links">
        <a href="/">Home</a>
        {user && <>
          <a href="/dashboard">Dashboard</a>
          <a href="/actions">Log Actions</a>
          <a href="/goals">Goals</a>
          <a href="/recommendations">Recommendations</a>
          <span>{user.experienceLevel === "beginner" ? "🌱 Beginner" : "🌳 Experienced"}</span>
        </>}
        <a href="/profile">{user ? "Profile" : "Login/Register"}</a>
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
