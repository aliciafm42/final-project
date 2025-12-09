import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    const goals = await prisma.goal.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" }, // optional
    });

    return new Response(JSON.stringify(goals), { status: 200 });
  } catch (err) {
    console.error("GET /api/goals error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
