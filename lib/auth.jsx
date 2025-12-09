import jwt from "jsonwebtoken";

export function getUserFromRequest(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.split("; ").find((c) => c.startsWith("authToken="));
  if (!match) return null;

  const token = match.split("=")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, email }
  } catch {
    return null;
  }
}
