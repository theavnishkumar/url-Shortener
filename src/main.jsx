import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./ErrorPage.jsx";
import { authRouter } from "./router/authRouter.jsx";
import { mainRouter } from "./router/mainRouter.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const route = createBrowserRouter([
  ...mainRouter,
  ...authRouter,
   {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={route} />
    </AuthProvider>
  </StrictMode>
);
