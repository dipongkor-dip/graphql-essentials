import { type FormEvent, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router";
import { setAuthCookie } from "../../apollo-client";

const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      userError
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [signin, { loading, error }] = useMutation(SIGNIN);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      const response = await signin({ variables: { email, password } });
      const result = response.data?.signin;

      if (result?.token) {
        setAuthCookie(result.token);
        setMessage("Login successful. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 600);
        return;
      }

      setMessage(result?.userError ?? "Login failed.");
    } catch (submitError) {
      setMessage(
        submitError instanceof Error ? submitError.message : "Login failed.",
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:px-6">
      <form
        onSubmit={handleLogin}
        className="rounded-2xl border p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Login</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-indigo-400 focus:ring-2 "
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-xl border  px-3 py-2.5 outline-none transition focus:border-indigo-400  focus:ring-2 "
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        {(message || error) && (
          <p
            className={`mt-4 text-sm ${error ? "text-red-600" : "text-emerald-600"}`}
          >
            {message ?? error?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
