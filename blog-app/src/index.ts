import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import config from "./config";
import type { DefaultArgs } from "@prisma/client/runtime/client";
import type { GlobalOmitConfig } from "../generated/prisma/internal/prismaNamespace";
import { verifyToken } from "./utils/jwt";

const adapter = new PrismaPg({ connectionString: config.databaseUrl });

const prisma = new PrismaClient({ adapter });

interface Context {
  prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>;
  userInfo?: {
    userId: number;
  };
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => {
      // const authHeader = req.headers.authorization || "";
      // const token = authHeader ? (verifyToken(authHeader) ?? undefined) : undefined;

      // if (!token) {
      //   throw new Error("Unauthorized");
      // }
      // return token ? { prisma, userInfo: token } : { prisma };


      const authHeader = req.headers.authorization;
      const token = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1];
      const userInfo = token ? (verifyToken(token) ?? undefined) : undefined;

      return userInfo ? { prisma, userInfo } : { prisma };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
