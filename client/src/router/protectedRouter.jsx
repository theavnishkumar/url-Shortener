import ErrorPage from "../ErrorPage";
import CreateURL from "../pages/CreateURL";
import MainLayout from "../layout/MainLayout";
import Profile from "../pages/Profile";
import ViewURL from "../pages/ViewURL";
import Analytics from "../pages/Analytics";
import { AnalyticsID } from "../pages/AnalyticsID";
import Privacy from "../pages/Privacy";

export const protectedRouter = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/create",
        element: <CreateURL />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/view",
        element: <ViewURL />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/analytics/:id",
        element: <AnalyticsID />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
    ],
  },
];
