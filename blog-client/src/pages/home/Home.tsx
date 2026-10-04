import { Link } from "react-router";

const Home = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 shadow-xl sm:p-10 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
              Welcome
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Share ideas that inspire your readers.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Publish thoughtful stories, connect with creators, and build a
              community around the topics you love.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm">
            <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    Featured post
                  </p>
                  <h2 className="mt-2 text-xl font-bold">
                    Designing better digital experiences
                  </h2>
                </div>
                <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  New
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
                <div className="h-2.5 w-full rounded-full bg-slate-200" />
                <div className="h-2.5 w-5/6 rounded-full bg-slate-200" />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm font-semibold">Sarah Kim</p>
                  <p className="text-xs text-slate-500">Product Designer</p>
                </div>
                <p className="text-xs text-slate-500">2 min read</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
