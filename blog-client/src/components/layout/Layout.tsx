import { Outlet } from "react-router";
import Navbar from "../Navbar";


const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;