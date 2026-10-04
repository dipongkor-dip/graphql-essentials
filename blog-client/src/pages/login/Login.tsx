import { type FormEvent } from "react";

const Login = () => {
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log({
      username: formData.get("username"),
      password: formData.get("password"),
    });
  };

  return (
    <form
      onSubmit={handleLogin}
      className="fieldset bg-base-200 border-base-300 rounded-box mx-auto my-8 w-full max-w-sm border p-4"
    >
      <legend className="fieldset-legend">Login</legend>

      <label className="label" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        className="input w-full"
        placeholder="Username"
        autoComplete="username"
        required
      />

      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="input w-full"
        placeholder="Password"
        autoComplete="current-password"
        required
      />

      <button type="submit" className="btn btn-neutral mt-4">
        Login
      </button>
    </form>
  );
};

export default Login;
