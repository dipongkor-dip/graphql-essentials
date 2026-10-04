import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getAuthCookie } from "../../apollo-client";
import { GET_ME } from "./queries";

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = getAuthCookie();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { loading, error, data } = useQuery(GET_ME, { skip: !token });

  if (!token) return null;

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error || !data?.me || data.me.userError) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          {data?.me?.userError || error?.message || "Unauthorized"}
        </div>
      </div>
    );
  }

  const profile = data.me;
  const user = profile.user;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link to="/dashboard/posts" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          View my posts
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Bio</p>
          <p className="mt-3 text-base leading-7 text-slate-600">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
