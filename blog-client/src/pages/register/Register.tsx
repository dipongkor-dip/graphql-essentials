import { type FormEvent, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router";
import { setAuthCookie } from "../../apollo-client";

const SIGNUP = gql`
  mutation Register(
    $name: String!
    $bio: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, bio: $bio, email: $email, password: $password) {
      token
      userError
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const bio = String(formData.get("bio") ?? "").trim();

    if (!name || !email || !password || !bio) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await signup({
        variables: { name, bio, email, password },
      });

      console.log(response)

      const result = response.data?.signup;

      if (result?.token) {
        setAuthCookie(result.token);
        setMessage("Account created successfully. Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 800);
        return;
      }

      setMessage(result?.userError ?? "Registration failed. Please try again.");
    } catch (submitError) {
      setMessage(submitError instanceof Error ? submitError.message : "Registration failed.");
    }
  };

  return (
    <div className="mx-auto w-full min-w-md px-4 py-12 sm:px-6 bg-base-200">
      <form
        onSubmit={handleRegister}
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Join us</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Create account</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-xl border-2 px-3 py-2.5"
              placeholder="Your Name"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-xl border-2 px-3 py-2.5"
              placeholder="Your Email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-xl border-2 px-3 py-2.5"
              placeholder="Password"
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="w-full rounded-xl border-2 px-3 py-2.5"
              placeholder="A little about you"
              rows={3}
            />
          </div>
        </div>

        {(message || error) && (
          <p className={`mt-4 text-sm ${error ? "text-red-600" : "text-emerald-600"}`}>
            {message ?? error?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 py-2 rounded-md"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
