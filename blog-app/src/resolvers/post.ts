import type { PrismaClient } from "../../generated/prisma/client";
import { userLoader } from "../dataLoaders/userLoader";

export interface PrismaInstance {
  prisma: PrismaClient;
  userInfo?: {
    userId: number;
  };
}

export const Post = {
  author: async (p: { authorId: number }, args: any, c: PrismaInstance) => {
    console.log("author", p.authorId);
    // return await c.prisma.user.findUnique({ where: { id: p.authorId } });

    return userLoader.load(p.authorId);
  },
};
