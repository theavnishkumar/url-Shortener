import { AdminLayout } from "../layout/AdminLayout";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { Users } from "../pages/Admin/Users";
import { UserUrls } from "../pages/Admin/UserUrls";

export const adminRouter = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:userId",
        element: <UserUrls />,
      },
    ],
  },
];
