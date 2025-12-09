import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ user: { id: user.id, email: user.email, experienceLevel: user.experienceLevel } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
