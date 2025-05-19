import ErrorPage from "../ErrorPage";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";

export const mainRouter = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];
