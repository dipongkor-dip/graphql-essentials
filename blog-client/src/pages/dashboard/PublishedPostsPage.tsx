import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getAuthCookie } from "../../apollo-client";
import { GET_MY_POSTS, PUBLISH_POST } from "./queries";

interface PostI {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  published: boolean;
}

const PublishedPostsPage = () => {
  const navigate = useNavigate();
  const token = getAuthCookie();
  const [publishPost, { loading: publishing }] = useMutation(PUBLISH_POST);
  const [publishError, setPublishError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { loading, error, data } = useQuery(GET_MY_POSTS, { skip: !token });

  const handlePublish = async (id: string) => {
    setPublishError(null);
    try {
      const response = await publishPost({
        variables: { id },
        refetchQueries: [{ query: GET_MY_POSTS }],
        awaitRefetchQueries: true,
      });

      setPublishError(response.data?.publishPost?.userError ?? null);
    } catch (mutationError) {
      setPublishError(
        mutationError instanceof Error
          ? mutationError.message
          : "Could not publish this post.",
      );
    }
  };

  if (!token) return null;

  if (loading) {
    return <p className="py-8 text-sm text-slate-500">Loading your posts...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="py-8 text-sm text-red-700">
        {error.message}
      </p>
    );
  }

  const posts: PostI[] = data?.myPosts ?? [];

  return (
    <section className="w-full py-4">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Your writing
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Your posts</h1>
        </div>
        <Link
          to="/dashboard/create-post"
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Create post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border-y border-slate-200 py-10">
          <p className="font-medium">No posts yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Create a post to see it here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {publishError && (
            <p role="alert" className="py-3 text-sm text-red-700">
              {publishError}
            </p>
          )}
          {posts.map((post) => (
            <article key={post.id} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-semibold">
                  <Link
                    to={`/dashboard/posts/${post.id}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time className="text-xs text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {post.content}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {post.published ? "Published" : "Draft"}
                </span>
                {!post.published && (
                  <button
                    type="button"
                    disabled={publishing}
                    onClick={() => void handlePublish(post.id)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-60 cursor-pointer"
                  >
                    {publishing ? "Publishing..." : "Publish"}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PublishedPostsPage;
