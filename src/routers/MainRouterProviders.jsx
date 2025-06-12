import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import SampleDashboard from "../components/dashboard/SampleDashboard.jsx";

const MainRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "sample", element: <SampleDashboard /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRouterProvider;
