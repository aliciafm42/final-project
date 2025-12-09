"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!user) return;
      const res = await fetch("/api/recommendations");
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    }
    fetchRecommendations();
  }, [user]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Recommendations</h1>

      {user ? (
        recommendations.length > 0 ? (
          <ul>
            {recommendations.map((r, i) => (
              <li key={i}>{r.text}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations yet.</p>
        )
      ) : (
        <p>
          Login to see personalized recommendations. Guests can explore other
          features.
        </p>
      )}
    </div>
  );
}
