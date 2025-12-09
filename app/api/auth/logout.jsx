export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // If using sessions or cookies, clear them here
  res.status(200).json({ message: "Logged out successfully" });
}
