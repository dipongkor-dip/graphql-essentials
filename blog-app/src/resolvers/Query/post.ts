import type { PrismaInstance } from "./Query";

export const postResolvers = {
  posts: async (p: any, args: any, { prisma }: PrismaInstance) => {
    console.log("posts", 0);
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  },
  post: async (p: any, { id }: { id: string }, { prisma }: PrismaInstance) => {
    console.log("post", id);
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return post;
  },
};
