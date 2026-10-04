import { type FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { Link, useNavigate, useParams } from "react-router";
import { getAuthCookie } from "../../apollo-client";
import { GET_MY_POSTS, GET_POST, UPDATE_POST } from "./queries";

const EditPostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const token = getAuthCookie();
  const [message, setMessage] = useState<string | null>(null);
  const {
    loading: loadingPost,
    error: loadError,
    data,
  } = useQuery(GET_POST, {
    variables: { id: postId ?? "" },
    skip: !token || !postId,
  });
  const [updatePost, { loading: saving, error: saveError }] =
    useMutation(UPDATE_POST);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!postId) return;

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    try {
      const response = await updatePost({
        variables: { id: postId, post: { title, content } },
        refetchQueries: [{ query: GET_MY_POSTS }],
        awaitRefetchQueries: true,
      });
      const result = response.data?.updatePost;
      if (result?.userError) {
        setMessage(result.userError);
      } else if (result?.post) {
        navigate(`/dashboard/posts/${postId}`);
      }
    } catch (submitError) {
      setMessage(
        submitError instanceof Error
          ? submitError.message
          : "Could not update the post.",
      );
    }
  };

  if (!token) return null;
  if (loadingPost)
    return <p className="py-8 text-sm text-slate-500">Loading post...</p>;
  if (loadError)
    return (
      <p role="alert" className="py-8 text-sm text-red-700">
        {loadError.message}
      </p>
    );

  const post = data?.post;
  if (!post) {
    return (
      <p className="py-8 text-sm text-slate-500">
        Post not found or you do not have access to it.
      </p>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl py-4">
      <div className="mb-6">
        <Link
          to={`/dashboard/posts/${postId}`}
          className="text-sm font-medium text-slate-600 hover:underline"
        >
          Back to post
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Edit post</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            defaultValue={post.title}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-slate-600"
          />
        </div>
        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={14}
            defaultValue={post.content}
            className="w-full resize-y rounded-lg border border-slate-300 bg-transparent px-4 py-3 leading-7 outline-none focus:border-slate-600"
          />
        </div>
        {(message || saveError) && (
          <p role="alert" className="text-sm text-red-700">
            {message ?? saveError?.message}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
};

export default EditPostPage;
