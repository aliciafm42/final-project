import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("authToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // delete cookie
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
