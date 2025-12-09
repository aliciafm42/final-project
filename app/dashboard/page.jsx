import { headers } from "next/headers";
import { getUserFromRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const reqHeaders = headers();
  const user = getUserFromRequest({ headers: reqHeaders });

  let dbUser = null;
  if (user) {
    dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Dashboard</h1>

      {dbUser ? (
        <div>
          <p>Welcome {dbUser.email}!</p>
          <p>Your experience level is: {dbUser.experienceLevel || "Not set"}</p>
        </div>
      ) : (
        <div>
          <p>Welcome guest!</p>
          <p>
            You can explore the dashboard, but login or register to save your
            experience and goals.
          </p>
        </div>
      )}
    </div>
  );
}
