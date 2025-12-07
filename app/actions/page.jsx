"use client";
import { useState, useEffect } from "react";

export default function Actions() {
  const [actions, setActions] = useState([]);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch("/api/actions")
      .then((res) => res.json())
      .then(setActions);
  }, []);

  const addAction = async () => {
    const res = await fetch("/api/actions", {
      method: "POST",
      body: JSON.stringify({ description: desc }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setActions([...actions, await res.json()]);
      setDesc("");
    }
  };

  return (
    <main>
      <h1>Log Actions</h1>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="What did you do today?"
      />
      <button onClick={addAction}>Add Action</button>
      <ul>
        {actions.map((a) => (
          <li key={a.id}>{a.description}</li>
        ))}
      </ul>
    </main>
  );
}
