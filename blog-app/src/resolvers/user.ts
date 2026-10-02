import type { PrismaClient } from "../../generated/prisma/client";

export interface PrismaInstance {
  prisma: PrismaClient;
  userInfo?: {
    userId: number;
  };
}

export const User = {
  posts: async (p: { id: number }, args: any, c: PrismaInstance) => {
    return await c.prisma.post.findMany({ where: { authorId: p.id } });
  },
};

export const Profile = {
  user: async (p: { id: number }, args: any, c: PrismaInstance) => {
    return await c.prisma.user.findUnique({ where: { id: p.id } });
  },
};
