import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Posts from "../pages/posts/Posts";

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
    ],
  },
]);

export default router;
