import { PrismaClient } from "@prisma/client";

// Prisma Client をシングルトンで管理する
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db; // 開発環境ではグローバル変数に保持
}
