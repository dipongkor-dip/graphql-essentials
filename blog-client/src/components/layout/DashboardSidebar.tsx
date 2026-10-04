import { NavLink, useNavigate } from "react-router";
import { clearAuthCookie } from "../../apollo-client";

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthCookie();
    navigate("/");
  };

  return (
    <aside className="min-h-full w-72 border-r border-base-300 bg-base-200 p-4">
      <div className="mb-5 px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
          Workspace
        </p>
        <h2 className="mt-1 text-lg font-bold">Dashboard</h2>
      </div>
      <ul className="menu w-full gap-1 p-0">
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "menu-active" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "menu-active" : ""
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/posts"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "menu-active" : ""
            }
          >
            My Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/create-post"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "menu-active" : ""
            }
          >
            Create Post
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/published-posts"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "menu-active" : ""
            }
          >
            Published Posts
          </NavLink>
        </li>
        <li className="mt-4 border-t border-base-300 pt-2">
          <button type="button" onClick={handleLogout} className="text-error">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
