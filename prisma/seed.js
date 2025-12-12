import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const beginnerUser = await prisma.user.upsert({
    where: { email: "beginner@example.com" },
    update: {},
    create: {
      email: "beginner@example.com",
      password: "password",
      experienceLevel: "BEGINNER",
    },
  });

  const intermediateUser = await prisma.user.upsert({
    where: { email: "intermediate@example.com" },
    update: {},
    create: {
      email: "intermediate@example.com",
      password: "password",
      experienceLevel: "INTERMEDIATE",
    },
  });

  const experiencedUser = await prisma.user.upsert({
    where: { email: "experienced@example.com" },
    update: {},
    create: {
      email: "experienced@example.com",
      password: "password",
      experienceLevel: "EXPERIENCED",
    },
  });

  // Create global recommendations (userId = null)
  await prisma.recommendation.createMany({
    data: [
      {
        title: "Save Energy Tips",
        description: "Simple energy-saving tips for beginners.",
        experienceLevel: "BEGINNER",
      },
      {
        title: "Composting Guide",
        description: "Intermediate composting techniques.",
        experienceLevel: "INTERMEDIATE",
      },
      {
        title: "Sustainable Travel",
        description: "Advanced tips for sustainable travel.",
        experienceLevel: "EXPERIENCED",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
