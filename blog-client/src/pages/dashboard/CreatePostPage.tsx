import { type FormEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router";
import { getAuthCookie } from "../../apollo-client";
import { ADD_POST, GET_MY_POSTS } from "./queries";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const token = getAuthCookie();
  const [message, setMessage] = useState<string | null>(null);
  const [addPost, { loading, error }] = useMutation(ADD_POST);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    try {
      const response = await addPost({
        variables: { post: { title, content } },
        refetchQueries: [{ query: GET_MY_POSTS }],
        awaitRefetchQueries: true,
      });
      const result = response.data?.addPost;

      if (result?.userError) {
        setMessage(result.userError);
        return;
      }

      if (result?.post) {
        navigate("/dashboard/posts");
      }
    } catch {
      setMessage("Could not create the post. Please try again.");
    }
  };

  if (!token) return null;

  return (
    <section className="w-full py-4">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Writing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Create a post</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium">Title</label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            placeholder="Give your post a clear title"
            className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-slate-600"
          />
        </div>
        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            required
            rows={14}
            placeholder="Write your post..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-transparent px-4 py-3 leading-7 outline-none focus:border-slate-600"
          />
        </div>

        {(message || error) && (
          <p role="alert" className="text-sm text-red-700">
            {message ?? error?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save draft"}
        </button>
      </form>
    </section>
  );
};

export default CreatePostPage;