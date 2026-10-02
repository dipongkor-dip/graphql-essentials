import { prisma } from "../prisma";

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
      console.log(p, args, c);
      const posts = await prisma.post.findMany();
      console.log(posts);
      return posts;
    },
  },

  Mutation: {
    signup: async (p: any, args: CreateUserArgs, c: any) => {
      console.log(p, args, c);
      return await prisma.user.create({ data: args });
    },
  },
};
