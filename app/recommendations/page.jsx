"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    if (!user) return;
    const res = await fetch("/api/recommendations?userId=" + user.id);
    const data = await res.json();
    setRecommendations(data.recommendations || []);
  };

  useEffect(() => { fetchRecommendations(); }, [user]);

  if (!user) return <p>Please login to view recommendations.</p>;

  return (
    <div className="page-container">
      <h2>Eco Tips & Recommendations</h2>
      <ul>{recommendations.map((r) => <li key={r.id}>{r.text}</li>)}</ul>
    </div>
  );
}
