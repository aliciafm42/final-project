import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    const actions = await prisma.action.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" }, // optional: latest first
    });

    return new Response(JSON.stringify(actions), { status: 200 });
  } catch (err) {
    console.error("GET /api/actions error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
