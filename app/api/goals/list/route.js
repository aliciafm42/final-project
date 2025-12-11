import prisma from "@/lib/prisma";

export async function GET(req) {
  const userId = req.url.includes("?") ? new URL(req.url).searchParams.get("userId") : null;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
  }

  const goals = await prisma.goal.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify({ goals }), { status: 200 });
}
