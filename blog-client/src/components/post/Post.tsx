import type { PostI } from "../../pages/posts/Posts";

const Post = ({ post }: { post: PostI }) => {
  const formatDate = (date: string | number) => {
    const timestamp =
      typeof date === "string" && /^\d+$/.test(date.trim())
        ? Number(date)
        : date;
    const parsedDate = new Date(timestamp);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(parsedDate);
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5">
      <div className="flex gap-4">
        <div className="min-w-xl">
          <div className="mb-2 flex items-center justify-between gap-3">
            <time className="text-xs text-slate-500">
              {formatDate(post.createdAt)}
            </time>
          </div>

          <h2 className="text-lg font-semibold leading-6 text-slate-900 sm:text-xl">
            {post.title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-[15px]">
            {post.content}
          </p>
        </div>
        <aside className="flex w-28 shrink-0 flex-col gap-2 pt-1  sm:w-32">
          <div className="w-full">
            <p className="truncate text-sm font-semibold text-slate-800">
              {post.author.name}
            </p>
            <p className="truncate text-[11px] text-slate-500">
              {post.author.email}
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default Post;
