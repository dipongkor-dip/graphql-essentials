// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type Product {
    id: ID!,
    name: String,
    image: String,
    description: String,
    price: Float,
    quantity: Int,
    onStock: Boolean,
    category: Category,
    reviews: [Review]
  }

  type Category {
    id: ID!,
    name: String,
    title: String,
    products: [Product]
  }

  type Review{
    id: ID!,
    review: String,
    rating: Float,
    data: String,
    productId: String
  }

  type Query {
    products: [Product]
    product(productId: ID!): Product
    categories: [Category]
    category(id: ID!): Category
  }
`;
