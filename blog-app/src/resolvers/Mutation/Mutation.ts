import type { PrismaClient } from "../../../generated/prisma/client";

import { authResolvers } from "./auth";
import { postResolvers } from "./post";

export interface PrismaInstance {
  prisma: PrismaClient;
  userInfo?: {
    userId: number;
  };
}

export const Mutation = {
  ...authResolvers,
  ...postResolvers,
};
