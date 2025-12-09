import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const actions = await prisma.action.findMany({ where: { userId: user.id }, orderBy: { date: "desc" } });
  return new Response(JSON.stringify(actions), { status: 200 });
}

export async function POST(req) {
  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { description } = await req.json();
  if (!description) return new Response(JSON.stringify({ error: "Description required" }), { status: 400 });

  // Points system example: beginners get double points
  const points = user.experienceLevel === "beginner" ? 2 : 1;

  const action = await prisma.action.create({
    data: { description, userId: user.id },
  });

  // Optional: You could store points in user table or just calculate dynamically

  return new Response(JSON.stringify({ ...action, points }), { status: 201 });
}
