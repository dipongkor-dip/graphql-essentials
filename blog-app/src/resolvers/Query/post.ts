import type { PrismaInstance } from "./Query";

export const postResolvers = {
  posts: async (p: any, args: any, { prisma }: PrismaInstance) => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  },
  post: async (p: any, { id }: { id: string }, { prisma }: PrismaInstance) => {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return post;
  },
};
