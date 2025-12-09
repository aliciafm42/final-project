import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  const user = getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
  return new Response(JSON.stringify({ user }), { status: 200 });
}
