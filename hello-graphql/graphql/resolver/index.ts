import { db } from "../../src/db.js";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      return db.products.find((pd) => pd.id === args.productId);
    },
    categories: () => db.categories,
    category: (p: any, args: { id: string }, c: any) => {
      return db.categories.find((ct) => ct.id === args.id);
    },
  },
  Product: {
    category: (p: { categoryId: string }, arg: any, c: any) => {
      return db.categories.find((ct) => ct.id === p.categoryId);
    },
    reviews: ({ id }: { id: string }, arg: any, c: any) => {
      return db.reviews.filter((rv) => rv.productId === id);
    },
  },
  Category: {
    products: ({ id }: { id: string }, arg: any, c: any) => {
      return db.products.filter((pd) => pd.categoryId === id);
    },
  },
};
