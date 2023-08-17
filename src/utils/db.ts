import { PrismaClient, type User } from "@prisma/client";

export const createUser = async (user: Omit<User, "id" | "updated_at">) => {
  const prisma = new PrismaClient();
  const dbUser = await prisma.user.create({
    data: { ...user },
  });
  await prisma.$disconnect();
  return dbUser;
};
