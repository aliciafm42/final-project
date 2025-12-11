import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password, experienceLevel } = await req.json();

    if (!email || !password || !experienceLevel) {
      return new Response(
        JSON.stringify({ error: "Missing fields: email, password, and experienceLevel are required." }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already associated with an account." }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        experienceLevel,
      },
    });

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          experienceLevel: user.experienceLevel,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
