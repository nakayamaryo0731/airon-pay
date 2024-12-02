import { PrismaClient } from "@prisma/client";

// Prisma Client をシングルトンで管理する
const db = new PrismaClient();

export { db };
