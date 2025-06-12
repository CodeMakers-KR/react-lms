import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";

const MainRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <Dashboard /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRouterProvider;
