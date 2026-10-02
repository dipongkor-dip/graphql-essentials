import type { PrismaClient } from "../../generated/prisma/client";

export interface PrismaInstance {
  prisma: PrismaClient;
  userInfo?: {
    userId: number;
  };
}

export const Post = {
  author: async (p: { authorId: number }, args: any, c: PrismaInstance) => {
    return await c.prisma.user.findUnique({ where: { id: p.authorId } });
  },
};
