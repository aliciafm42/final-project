import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = Number(url.searchParams.get("userId"));

    if (!userId) {
      return new Response(
        JSON.stringify([
          {
            id: 0,
            title: "No recommendations yet",
            description: "No userId provided.",
            imageUrl: null,
            link: null,
          },
        ]),
        { status: 400 }
      );
    }

    // Fetch the user to get experienceLevel
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, experienceLevel: true },
    });

    if (!user?.experienceLevel) {
      return new Response(
        JSON.stringify([
          {
            id: 0,
            title: "No recommendations yet",
            description: "Complete your profile to see recommendations.",
            imageUrl: null,
            link: null,
          },
        ]),
        { status: 200 }
      );
    }

    // Fetch recommendations based on user's experienceLevel
    const recommendations = await prisma.recommendation.findMany({
      where: { experienceLevel: user.experienceLevel },
      orderBy: { createdAt: "desc" },
    });

    if (!recommendations.length) {
      return new Response(
        JSON.stringify([
          {
            id: 0,
            title: "No recommendations yet",
            description: "No recommendations available for your experience level yet.",
            imageUrl: null,
            link: null,
          },
        ]),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify(recommendations), { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify([
        {
          id: 0,
          title: "No recommendations yet",
          description: "Something went wrong while fetching recommendations.",
          imageUrl: null,
          link: null,
        },
      ]),
      { status: 500 }
    );
  }
}
