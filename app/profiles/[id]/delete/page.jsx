"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/delete-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to delete profile.");
      setLoading(false);
      return;
    }

    router.push("/profiles");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Delete Profile {id}</h1>
      <p>Are you sure you want to delete this profile? This action cannot be undone.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          background: "red",
          color: "white",
          padding: "8px 14px",
          borderRadius: "6px",
          marginRight: "10px",
        }}
      >
        {loading ? "Deleting..." : "Yes, delete"}
      </button>

      <button
        onClick={() => router.push(`/profiles/${id}`)}
        style={{
          background: "#ddd",
          padding: "8px 14px",
          borderRadius: "6px",
        }}
      >
        Cancel
      </button>
    </div>
  );
}
