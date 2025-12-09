import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password, experienceLevel } = req.body; // no JSON.parse

  if (!email || !password || !experienceLevel) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, experienceLevel },
    });

    res.status(200).json({ user: { id: user.id, email: user.email, experienceLevel: user.experienceLevel } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
