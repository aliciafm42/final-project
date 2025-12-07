import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { email, password } = JSON.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Incorrect password" });

  res.status(200).json({ message: "Logged in", userId: user.id });
}
