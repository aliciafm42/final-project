"use client"; // we need client-side interactivity for the form

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export default function EditProfilePage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// Fetch the existing profile
useEffect(() => {
  async function fetchProfile() {
    try {
      const res = await fetch(`/api/profiles/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }
  fetchProfile();
}, [id]);

// Handle update submission
const handleUpdate = async (formData) => {
  try {
    const res = await fetch(`/api/profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Update failed");
    router.push("/profiles"); // go back to profiles list
  } catch (err) {
    console.error(err);
    setError("Failed to update profile");
  }
};

  return (
    <div>
      <h1>Edit Profile</h1>
      <ProfileForm type="edit" profile={profile} onSubmit={handleUpdate} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
