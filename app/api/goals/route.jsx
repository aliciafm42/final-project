import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const goals = await prisma.goal.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return new Response(JSON.stringify(goals), { status: 200 });
}

export async function POST(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { title } = await req.json();
  if (!title) return new Response(JSON.stringify({ error: "Title required" }), { status: 400 });

  const goal = await prisma.goal.create({
    data: { title, userId: user.id },
  });

  return new Response(JSON.stringify(goal), { status: 201 });
}

// Optional: PATCH to mark goal as completed
export async function PATCH(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { id, completed } = await req.json();
  if (id == null) return new Response(JSON.stringify({ error: "Goal ID required" }), { status: 400 });

  const goal = await prisma.goal.updateMany({
    where: { id, userId: user.id },
    data: { completed },
  });

  return new Response(JSON.stringify(goal), { status: 200 });
}
