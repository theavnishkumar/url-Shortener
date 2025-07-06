import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { openRouter } from "./router/openRouter.jsx";
import { protectedRouter } from "./router/protectedRouter.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";
import { adminRouter } from "./router/adminRouter.jsx";

const queryClient = new QueryClient();
const route = createBrowserRouter([
  ...adminRouter,
  ...openRouter,
  ...protectedRouter,
  {
    path: "/:shortId",
    element: <RedirectPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
