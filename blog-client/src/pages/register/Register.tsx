import { type FormEvent } from "react";

const Register = () => {
  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      bio: formData.get("bio"),
    });
  };

  return (
    <form
      onSubmit={handleRegister}
      className="fieldset bg-base-200 border-base-300 rounded-box mx-auto my-8 w-full max-w-sm border p-4"
    >
      <legend className="fieldset-legend">Create account</legend>

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

      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        className="input w-full"
        placeholder="you@example.com"
        autoComplete="email"
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
        autoComplete="new-password"
        required
      />

      <label className="label" htmlFor="bio">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        className="textarea w-full"
        placeholder="A little about you"
        rows={3}
      />

      <button type="submit" className="btn btn-neutral mt-4">
        Register
      </button>
    </form>
  );
};

export default Register;
