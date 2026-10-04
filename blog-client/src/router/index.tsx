import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import Home from "../pages/home/Home";
import Posts from "../pages/posts/Posts";
import Dashboard from "../pages/dashboard/Dashboard";
import ProfilePage from "../pages/dashboard/ProfilePage";
import MyPostsPage from "../pages/dashboard/MyPostsPage";
import CreatePostPage from "../pages/dashboard/CreatePostPage";
import PublishedPostsPage from "../pages/dashboard/PublishedPostsPage";
import PostDetailsPage from "../pages/dashboard/PostDetailsPage";
import EditPostPage from "../pages/dashboard/EditPostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts",
        Component: Posts,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "posts",
            element: <MyPostsPage />,
          },
          {
            path: "posts/:postId",
            element: <PostDetailsPage />,
          },
          {
            path: "posts/:postId/edit",
            element: <EditPostPage />,
          },
          {
            path: "create-post",
            element: <CreatePostPage />,
          },
          {
            path: "published-posts",
            element: <PublishedPostsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
