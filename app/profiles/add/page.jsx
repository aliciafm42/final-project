"use client";
import ProfileForm from "@/components/ProfileForm";

export default function AddProfilePage() {
  return (
    <div className="container">
      <h1>Add Profile</h1>
      <ProfileForm type="add" profile={null} onSubmit={() => {}} />
    </div>
  );
}
