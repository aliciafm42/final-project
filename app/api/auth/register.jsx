import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { email, password } = JSON.parse(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  res.status(200).json(user);
}
