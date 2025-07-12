import { PrismaClient } from "@prisma/trend-snap";

const globalForPrisma = globalThis as unknown as {
  prismaDarkRoom: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prismaDarkRoom ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaDarkRoom = prisma;
}

export default prisma;
