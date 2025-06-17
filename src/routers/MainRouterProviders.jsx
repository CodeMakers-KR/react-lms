import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import SampleDashboard from "../components/dashboard/SampleDashboard.jsx";
import { Install } from "../components/install/Install.jsx";
import { MainMenuList } from "../components/asides/MainMenu.jsx";
import { StudentList } from "../components/contents/students/StudentList.jsx";

const MainRouterProvider = () => {
  const router = createBrowserRouter([
    { path: "/install", element: <Install /> },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "sample",
          element: <SampleDashboard />,
        },
        { path: "students", element: <StudentList /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRouterProvider;
