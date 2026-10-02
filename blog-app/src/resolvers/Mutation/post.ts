import type { PrismaInstance } from "./Mutation";

export interface AddPostArgs {
  title: string;
  content: string;
}

export interface UpdatePostArgs {
  id: number;
  title?: string;
  content?: string;
}

export const postResolvers = {
  addPost: async (
    p: any,
    { post }: { post: AddPostArgs },
    { prisma, userInfo }: PrismaInstance,
  ) => {
    if (!userInfo || !userInfo.userId) {
      return { userError: "❌ Unauthorized User" };
    }

    const { title, content } = post;

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

  updatePost: async (
    p: any,
    { id, post }: { id: string; post: UpdatePostArgs },
    { prisma, userInfo }: PrismaInstance,
  ) => {
    if (!userInfo || !userInfo.userId) {
      return { userError: "❌ Unauthorized User" };
    }
    const postId = Number(id); // Convert id to number

    const { title, content } = post;

    if (!title && !content) {
      return { userError: "At least one of title or content is required" };
    }

    try {
      const existingPost = await prisma.post.findUnique({ where: { id: postId } });

      if (!existingPost) {
        return { userError: "Post not found" };
      }

      if (existingPost.authorId !== userInfo.userId) {
        return { userError: "❌ Unauthorized User" };
      }

      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: title ?? existingPost.title,
          content: content ?? existingPost.content,
        },
      });

      return { post: updatedPost };
    } catch (error) {
      return { userError: "Failed to update post" };
    }
  },

  deletePost: async (
    p: any,
    { id }: { id: string },
    { prisma, userInfo }: PrismaInstance,
  ) => {
    if (!userInfo || !userInfo.userId) {
      return { userError: "❌ Unauthorized User" };
    }

    try {
      const postId = Number(id); // Convert id to number
      const existingPost = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!existingPost) {
        return { userError: "Post not found" };
      }

      if (existingPost.authorId !== userInfo.userId) {
        return { userError: "❌ Unauthorized User" };
      }

      const deletedPost = await prisma.post.delete({
        where: { id: postId },
      });

      return { post: deletedPost };
    } catch (error) {
      return { userError: "Failed to delete post" };
    }
  },
};
