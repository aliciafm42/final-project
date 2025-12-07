"use client";
import { useState, useEffect } from "react";

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then(setRecs);
  }, []);

  return (
    <main>
      <h1>Recommendations</h1>
      <ul>
        {recs.map((r) => (
          <li key={r.id}>{r.text}</li>
        ))}
      </ul>
    </main>
  );
}
