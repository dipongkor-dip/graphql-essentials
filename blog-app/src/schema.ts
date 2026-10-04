export const typeDefs = `#graphql  
  type Query {
    me: Profile,
    myPosts: [Post],
    users: [User],
    post(id: ID!): Post,
    posts: [Post],
  }

  type Mutation{
    signup(
      name: String!,
      bio: String!,
      email: String!,
      password: String!
    ): AuthPayload

    signin(
      email: String!,
      password: String!
    ): AuthPayload

    addPost(post: PostInput!): PostPayload

    updatePost(id: ID!, post: PostInput!): PostPayload

    deletePost(id: ID!): PostPayload

    publishPost(id: ID!): PostPayload
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
    posts: [Post]
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
    user: User!
  }

  input PostInput{
    title: String,
    content: String
  }
`;
