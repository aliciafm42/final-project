import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HTTP-only cookie
    const cookie = serialize("authToken", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return new Response(JSON.stringify({ message: "Login successful", user: { id: user.id, email: user.email } }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
  }
}
