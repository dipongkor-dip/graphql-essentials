import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Post from "../../components/post/Post";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      content
      title
      createdAt
      updatedAt
      author {
        name
        email
      }
    }
  }
`;

export interface PostI {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string | number;
  updatedAt: string | number;
}

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-center gap-3 text-slate-600">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
            <span className="text-sm font-medium tracking-wide uppercase">Loading posts</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Error</p>
          <p className="mt-2 text-base text-red-700">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {data.posts.map((post: PostI) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
