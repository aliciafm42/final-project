import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  // In a real app, you'd check session or JWT; here we just simulate
  // For simplicity, pass user ID in a query param (you can replace with cookie/session)
  const userId = req.query.userId;

  if (!userId) return res.status(200).json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: { id: true, email: true, experienceLevel: true },
  });

  res.status(200).json({ user: user || null });
}
