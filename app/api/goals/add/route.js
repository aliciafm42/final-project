import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { text, userId } = await req.json();

    if (!text || !userId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const goal = await prisma.goal.create({
      data: {
        text,
        userId,
      },
    });

    return new Response(JSON.stringify({ goal }), { status: 200 });
  } catch (err) {
    console.error("GOAL ADD ERROR:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
