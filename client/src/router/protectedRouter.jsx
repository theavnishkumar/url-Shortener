import ErrorPage from "../ErrorPage";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";

export const protectedRouter = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/create",
        element: <Home />,
      },
    ],
  },
];
