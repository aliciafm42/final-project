// app/api/recommendations/route.js
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify([]), { status: 400 });
    }

    const recommendations = await prisma.recommendation.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(recommendations), { status: 200 });
  } catch (err) {
    console.error("GET /api/recommendations error:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
