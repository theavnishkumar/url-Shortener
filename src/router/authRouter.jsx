import ErrorPage from "../ErrorPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const authRouter = [
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
];
