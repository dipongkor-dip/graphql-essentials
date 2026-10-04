import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getAuthCookie } from "../../apollo-client";
import { DELETE_POST, GET_MY_POSTS, PUBLISH_POST } from "./queries";

interface PostI {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  published: boolean;
}

const MyPostsPage = () => {
  const navigate = useNavigate();
  const token = getAuthCookie();
  const [publishPost, { loading: publishing }] = useMutation(PUBLISH_POST);
  const [deletePost, { loading: deleting }] = useMutation(DELETE_POST);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
    } catch (publishMutationError) {
      setPublishError(
        publishMutationError instanceof Error
          ? publishMutationError.message
          : "Could not publish this post.",
      );
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeleteError(null);
    try {
      const response = await deletePost({
        variables: { id },
        refetchQueries: [{ query: GET_MY_POSTS }],
        awaitRefetchQueries: true,
      });
      setDeleteError(response.data?.deletePost?.userError ?? null);
    } catch (deleteMutationError) {
      setDeleteError(
        deleteMutationError instanceof Error
          ? deleteMutationError.message
          : "Could not delete this post.",
      );
    }
  };

  if (!token) return null;

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border p-8 text-center shadow-sm">
          Loading posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border p-6 text-red-700 shadow-sm">
          {error.message}
        </div>
      </div>
    );
  }
  const posts = data?.myPosts || [];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My posts</h1>
        <Link
          to="/dashboard"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to profile
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          You have no posts yet.
        </div>
      ) : (
        <div className="space-y-4">
          {publishError && <p role="alert" className="text-sm text-red-700">{publishError}</p>}
          {deleteError && <p role="alert" className="text-sm text-red-700">{deleteError}</p>}
          {posts.map((post: PostI) => (
            <article
              key={post.id}
              className="rounded-2xl border p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">
                  <Link to={`/dashboard/posts/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <time className="text-xs ">
                  {new Date(post.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="text-sm leading-7">{post.content}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wide ">
                  {post.published ? "Published" : "Draft"}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/posts/${post.id}/edit`}
                    className="rounded-lg border px-3 py-2 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  {!post.published && (
                    <button
                      type="button"
                      disabled={publishing}
                      onClick={() => void handlePublish(String(post.id))}
                      className="rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-60 cursor-pointer"
                    >
                      {publishing ? "Publishing..." : "Publish"}
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => void handleDelete(String(post.id), post.title)}
                    className="rounded-lg border px-3 py-2 text-sm font-medium text-red-700 disabled:opacity-60 cursor-pointer"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
