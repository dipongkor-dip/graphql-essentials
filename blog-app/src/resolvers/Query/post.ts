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
  post: async (
    p: any,
    { id }: { id: string },
    { prisma, userInfo }: PrismaInstance,
  ) => {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post || (!post.published && post.authorId !== userInfo?.userId)) {
      return null;
    }

    return post;
  },
};
