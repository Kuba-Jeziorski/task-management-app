import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AppLayout } from "./components/ui/app-layout";
import { MyTasksPage } from "./components/pages/my-tasks-page";
import { AwardsPage } from "./components/pages/awards-page";
import { MyDayPage } from "./components/pages/my-day-page";
import { LoginPage } from "./components/pages/login-page";
import { ProtectedRoute } from "./components/ui/protected-route";
import { UserPage } from "./components/pages/user-page";
import { AboutPage } from "./components/pages/about-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: () => <Navigate to="my-tasks" replace /> },
      { path: "my-tasks", Component: MyTasksPage },
      { path: "awards", Component: AwardsPage },
      { path: "my-day", Component: MyDayPage },
      { path: "about", Component: AboutPage },
      { path: "user", Component: UserPage },
      { path: "*", Component: () => <Navigate to="my-tasks" replace /> },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "16px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
