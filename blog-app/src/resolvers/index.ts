import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

interface CreateUserArgs {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    user: async (p: any, args: any, c: any) => {
      console.log(p, args, c);
      const user = await prisma.user.findMany();
      console.log(user);
      return user;
    },
    users: async (p: any, args: any, c: any) => {
      return await prisma.user.findMany();
    },
    posts: async (p: any, args: any, c: any) => {
      const posts = await prisma.post.findMany();
      return posts;
    },
  },

  Mutation: {
    signup: async (p: any, args: CreateUserArgs, c: any) => {
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

    signin: async (
      p: any,
      args: { email: string; password: string },
      c: any,
    ) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        return { userError: "User not found", token: null };
      }

      const isPasswordValid = await bcrypt.compare(
        args.password,
        user.password,
      );
      if (!isPasswordValid) {
        return { userError: "Invalid password", token: null };
      }

      const token: string = generateToken(user.id);
      return { token };
    },
  },
};
