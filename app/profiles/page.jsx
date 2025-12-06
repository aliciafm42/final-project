"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilesListPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const res = await fetch("/api/profiles", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch profiles");
        const data = await res.json();
        setProfiles(data || []); // fallback to empty array
      } catch (err) {
        console.error(err);
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profiles || profiles.length === 0) return <p>No profiles found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Profiles</h1>
      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li key={profile.id}>
            <Link
              href={`/profiles/${profile.id}`}
              className="text-blue-600 hover:underline"
            >
              {profile.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
