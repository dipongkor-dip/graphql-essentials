import { Outlet, useLocation } from "react-router";
import Navbar from "../Navbar";


const Layout = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={`w-full flex-1 ${isDashboard ? "" : "mx-auto max-w-6xl"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;