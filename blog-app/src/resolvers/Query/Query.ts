import type { PrismaClient } from "../../../generated/prisma/client";

export const Query = {
  user: async (p: any, args: any, { prisma }: { prisma: PrismaClient }) => {
    console.log(p, args, { prisma });
    const user = await prisma.user.findMany();
    console.log(user);
    return user;
  },
  users: async (p: any, args: any, { prisma }: { prisma: PrismaClient }) => {
    return await prisma.user.findMany();
  },
  posts: async (p: any, args: any, { prisma }: { prisma: PrismaClient }) => {
    const posts = await prisma.post.findMany();
    return posts;
  },
};
