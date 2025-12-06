"use client";

export default function ProfileForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    role: initialData.role || "",
    image: initialData.image || "",
    bio: initialData.bio || "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="role" value={formData.role} onChange={handleChange} />
      <input name="image" value={formData.image} onChange={handleChange} />
      <textarea name="bio" value={formData.bio} onChange={handleChange} />

      <button type="submit">Save</button>
    </form>
  );
}
