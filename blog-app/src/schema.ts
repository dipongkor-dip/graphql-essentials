export const typeDefs = `#graphql  
  type Query {
    user: User,
    users: [User],
    posts : [Post]
  }

  type Mutation{
    signup(
      name : String!,
      email: String!,
      password: String!
    ): AuthPayload

    signin(
      email: String!,
      password: String!
    ): AuthPayload

    addPost(
      title: String,
      content: String
    ): PostPayload
  }

  type AuthPayload{
    userError: String
    token: String
  }

  type PostPayload{
    userError: String
    post: Post
  }

  type User {
    id: ID!,
    name: String!,
    email: String!,
    posts : [Post]
  }

  type Post{
    id: ID!
    title: String,
    content: String,
    author: User,
    published: Boolean,
    createdAt: String!
    updatedAt: String!
  }

  type Profile{
    id: ID!,
    bio: String!,
    createdAt: String!,
    user : User!
  }
`;
