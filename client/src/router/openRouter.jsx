import ErrorPage from "../ErrorPage";
import OpenLayout from "../layout/OpenLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const openRouter = [
  {
    path: "/",
    element: <OpenLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
];
