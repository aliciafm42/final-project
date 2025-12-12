import prisma from "@/lib/prisma";

// GET all goals for user
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));

    if (!userId || isNaN(userId)) {
      return new Response(JSON.stringify({ error: "Invalid or missing userId" }), { status: 400 });
    }

    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ goals }), { status: 200 });
  } catch (err) {
    console.error("GET /api/actions error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// POST +1 progress safely
export async function POST(req) {
  try {
    const { goalId, userId, increment = 1 } = await req.json();

    const id = Number(goalId);
    const uid = Number(userId);
    const inc = Number(increment);

    if (!id || isNaN(id) || !uid || isNaN(uid) || isNaN(inc)) {
      return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
    }

    // Make sure the goal exists for this user
    const goal = await prisma.goal.findFirst({ where: { id, userId: uid } });
    if (!goal) {
      return new Response(JSON.stringify({ error: "Goal not found for this user" }), { status: 404 });
    }

    // Increment progress safely, max 10
    const newProgress = Math.min((goal.progress || 0) + inc, 10);

    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: { progress: newProgress },
    });

    return new Response(JSON.stringify({ goal: updatedGoal }), { status: 200 });
  } catch (err) {
    console.error("POST /api/actions error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
