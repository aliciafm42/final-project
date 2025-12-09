import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const recommendations = await prisma.recommendation.findMany({ where: { userId: user.id } });

  // Example: Add extra beginner tips
  if (user.experienceLevel === "beginner") {
    recommendations.push({ id: "tip1", text: "Start with simple actions like recycling or reducing plastic!" });
  }

  return new Response(JSON.stringify(recommendations), { status: 200 });
}

// Optional: POST to create new recommendation (admin use)
export async function POST(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { text } = await req.json();
  if (!text) return new Response(JSON.stringify({ error: "Text required" }), { status: 400 });

  const rec = await prisma.recommendation.create({ data: { text, userId: user.id } });
  return new Response(JSON.stringify(rec), { status: 201 });
}
