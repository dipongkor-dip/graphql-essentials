import DataLoader from "dataloader";
import { prisma } from "..";
import type { User } from "../../generated/prisma/client";

const batchUsers = async (ids: number[]): Promise<Array<User | Error>> => {
  // Implementation for batching user lookups
  console.log("ids", ids);

  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
  });

  const userObject: { [key: number]: User } = {};
  users.forEach((user) => (userObject[user.id] = user));

  console.log("userObject", userObject);

  //@ts-ignore
  return ids.map((id) => userObject[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User | Error>(batchUsers);
