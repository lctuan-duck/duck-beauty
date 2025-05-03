import { PrismaClient } from "@prisma/auth";

const globalForPrisma = globalThis as unknown as {
  prismaAuth: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prismaAuth ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaAuth = prisma;
}

export default prisma;
