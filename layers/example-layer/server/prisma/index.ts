import { PrismaClient } from '@prisma/example';

const globalForPrisma = globalThis as unknown as {
  prismaExample: PrismaClient | undefined; // TODO: change this name: prismaExample
};

export const prisma =
  globalForPrisma.prismaExample ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaExample = prisma;
}

export default prisma;
