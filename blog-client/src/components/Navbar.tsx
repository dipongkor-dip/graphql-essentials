import { Link } from "react-router";
import { getAuthCookie } from "../apollo-client";

const Navbar = () => {
  const token = getAuthCookie();
  const isLoggedIn = Boolean(token);

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold tracking-tight sm:text-xl">
          Blog App
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/posts" className="text-blue-500">
            Published Posts
          </Link>

          {isLoggedIn && (
            <Link to="/dashboard" className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              Dashboard
            </Link>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-blue-600">
                Login
              </Link>
              <Link to="/register" className="rounded-full px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
