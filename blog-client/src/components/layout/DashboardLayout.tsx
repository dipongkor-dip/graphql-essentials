import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer mx-auto min-h-[calc(100vh-72px)] w-full max-w-6xl lg:h-[calc(100dvh-72px)] lg:min-h-0 lg:drawer-open">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-w-0 px-4 py-4 sm:px-6 lg:h-full lg:overflow-y-auto lg:px-8">
        <div className="mb-3 lg:hidden">
          <label
            htmlFor="dashboard-sidebar"
            className="btn btn-ghost drawer-button"
          >
            Menu
          </label>
        </div>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
      <div className="drawer-side z-40 lg:sticky lg:top-0 lg:h-full lg:overflow-y-auto">
        <label
          htmlFor="dashboard-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <DashboardSidebar></DashboardSidebar>
      </div>
    </div>
  );
};

export default DashboardLayout;
