"use client";

import { useState } from "react";

export default function ProfileForm({ profile, onSubmit, type }) {
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [major, setMajor] = useState(profile?.major || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, major });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Major"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {type === "edit" ? "Update Profile" : "Add Profile"}
      </button>
    </form>
  );
}
