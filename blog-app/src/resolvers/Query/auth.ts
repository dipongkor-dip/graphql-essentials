import type { PrismaInstance } from "./Query";

export const authResolvers = {
  me: async (p: any, args: any, { prisma, userInfo }: PrismaInstance) => {
    if (!userInfo || !userInfo.userId) {
      return { userError: "❌ Unauthorized User" };
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: userInfo.userId },
    });

    if (!profile) {
      return { userError: "Profile not found" };
    }

    return profile;
  },

  myPosts: async (p: any, args: any, { prisma, userInfo }: PrismaInstance) => {
    if (!userInfo || !userInfo.userId) {
      return [];
    }

    return await prisma.post.findMany({
      where: { authorId: userInfo.userId },
      orderBy: { createdAt: "desc" },
    });
  },

  users: async (p: any, args: any, { prisma, userInfo }: PrismaInstance) => {
    if (!userInfo || !userInfo.userId) {
      return { userError: "❌ Unauthorized User" };
    }

    return await prisma.user.findMany();
  },
};
