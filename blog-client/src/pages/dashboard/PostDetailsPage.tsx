import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getAuthCookie } from "../../apollo-client";
import { GET_POST } from "./queries";

const PostDetailsPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const token = getAuthCookie();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId ?? "" },
    skip: !token || !postId,
  });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token) return null;
  if (loading) return <p className="py-8 text-sm text-slate-500">Loading post...</p>;
  if (error) return <p role="alert" className="py-8 text-sm text-red-700">{error.message}</p>;

  const post = data?.post;
  if (!post) {
    return <p className="py-8 text-sm text-slate-500">Post not found or you do not have access to it.</p>;
  }

  return (
    <article className="mx-auto w-full max-w-3xl py-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/dashboard/posts" className="text-sm font-medium text-slate-600 hover:underline">
          Back to my posts
        </Link>
        <Link
          to={`/dashboard/posts/${post.id}/edit`}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Edit post
        </Link>
      </div>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <span className="text-xs font-medium uppercase tracking-wide ">
          {post.published ? "Published" : "Draft"}
        </span>
      </div>
      <time className="text-sm">{new Date(post.createdAt).toLocaleString()}</time>
      <p className="mt-6 whitespace-pre-wrap text-base leading-8">{post.content}</p>
    </article>
  );
};

export default PostDetailsPage;