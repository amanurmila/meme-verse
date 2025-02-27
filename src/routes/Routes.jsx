import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Explore from "../pages/Explore";
import MemeDetails from "../pages/MemeDetails";
import UploadMeme from "../pages/UploadMeme";
import UserDashboard from "../pages/UserDashboard";
import ErrorPage from "../pages/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: `/memeDetails/:id`,
        element: <MemeDetails />,
      },
      {
        path: "Upload",
        element: <UploadMeme />,
      },
      {
        path: "userDashboard",
        element: <UserDashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
