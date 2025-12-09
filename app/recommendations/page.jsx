"use client";

import { useState, useEffect } from "react";

export default function RecommendationsPage() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();
      if (userData.user) {
        setUser(userData.user);
        const recRes = await fetch("/api/recommendations");
        const recData = await recRes.json();
        setRecommendations(recData);
      }
    };
    fetchData();
  }, []);

  if (!user) return <p>Please log in to view recommendations.</p>;

  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((r) => (
          <li key={r.id}>{r.text}</li>
        ))}
      </ul>
    </div>
  );
}
