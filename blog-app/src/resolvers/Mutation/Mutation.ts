import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../../utils/jwt";
import type { PrismaClient } from "../../../generated/prisma/client";
import { userInfo } from "os";

export interface PrismaInstance {
  prisma: PrismaClient;
  userInfo?: {
    userId: number;
  };
}

export interface CreateUserArgs {
  name: string;
  email: string;
  password: string;
}

export interface SignInArgs {
  email: string;
  password: string;
}

export interface AddPostArgs {
  title?: string | null;
  content?: string | null;
}

export const Mutation = {
  signup: async (p: any, args: CreateUserArgs, { prisma }: PrismaInstance) => {
    const password = await bcrypt.hash(args.password, 10);

    try {
      const newUser = await prisma.user.create({
        data: { name: args.name, email: args.email, password },
      });

      const token: string = generateToken(newUser.id);
      return { token };
    } catch (error: any) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      )
        return { userError: "Email already exists" };

      return { userError: "Failed to create user" };
    }
  },

  signin: async (p: any, args: SignInArgs, { prisma }: PrismaInstance) => {
    const user = await prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      return { userError: "User not found", token: null };
    }

    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
      return { userError: "Invalid password", token: null };
    }

    const token: string = generateToken(user.id);
    return { token };
  },

  addPost: async (
    p: any,
    args: AddPostArgs,
    { prisma, userInfo }: PrismaInstance,
  ) => {
    if (!userInfo || !userInfo.userId) {
      return { userError: "❌ Unauthorized User" };
    }

    const { title, content } = args;

    if (!title || !content) {
      return { userError: "Title and content are required" };
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userInfo.userId },
      });

      if (!user) {
        return { userError: "User not found" };
      }

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published: true,
          authorId: user.id, // Use the actual user ID from the token
        },
      });

      return { post: newPost };
    } catch (error) {
      return { userError: "Failed to create post" };
    }
  },
};
