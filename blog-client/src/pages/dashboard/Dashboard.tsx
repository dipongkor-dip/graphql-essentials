import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuthCookie } from "../../apollo-client";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = getAuthCookie();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="w-full py-4">
      <div className="rounded-2xl border p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Overview</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-3 text-base text-slate-600">
          Welcome to your dashboard. Use the sidebar to manage your profile and posts.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
