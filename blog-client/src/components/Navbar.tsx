import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold tracking-tight  sm:text-xl">
          Blog App
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/posts"
            className="text-blue-500"
          >
            Published Posts
          </Link>
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium  transition hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-blue-600"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
