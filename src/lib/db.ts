import { PrismaClient } from "@prisma/client";

// attach a global variable to avoid re‑creating the client during
// hot‑reload in development (see https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices)

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
