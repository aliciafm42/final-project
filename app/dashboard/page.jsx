import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const reqHeaders = headers();
  const user = getUserFromRequest({ headers: reqHeaders });

  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  return <div>Welcome {dbUser.email}, your level is {dbUser.experienceLevel}</div>;
}
