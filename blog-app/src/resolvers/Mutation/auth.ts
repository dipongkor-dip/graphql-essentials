import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../../utils/jwt";
import type { PrismaInstance } from "./Mutation";

export interface CreateUserArgs {
  name: string;
  bio: string;
  email: string;
  password: string;
}

export interface SignInArgs {
  email: string;
  password: string;
}

export const authResolvers = {
  signup: async (p: any, args: CreateUserArgs, { prisma }: PrismaInstance) => {
    const password = await bcrypt.hash(args.password, 10);

    try {
      const userId = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: { name: args.name, email: args.email, password },
        });

        await tx.profile.create({
          data: { userId: newUser.id, bio: args.bio },
        });

        return newUser.id as number;
      });

      const token: string = generateToken(userId);
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
};
