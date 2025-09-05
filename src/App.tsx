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
import {
  TOAST_ERROR_DURATION,
  TOAST_SUCCESS_DURATION,
  URL_ABOUT_PAGE,
  URL_AWARDS_PAGE,
  URL_MY_DAY_PAGE,
  URL_MY_TASKS_PAGE,
  URL_USER_PAGE,
} from "./constants/constants";

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
      {
        index: true,
        Component: () => <Navigate to={URL_MY_TASKS_PAGE} replace />,
      },
      { path: URL_MY_TASKS_PAGE, Component: MyTasksPage },
      { path: URL_AWARDS_PAGE, Component: AwardsPage },
      { path: URL_MY_DAY_PAGE, Component: MyDayPage },
      { path: URL_ABOUT_PAGE, Component: AboutPage },
      { path: URL_USER_PAGE, Component: UserPage },
      {
        path: "*",
        Component: () => <Navigate to={URL_MY_TASKS_PAGE} replace />,
      },
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
            duration: TOAST_SUCCESS_DURATION,
          },
          error: {
            duration: TOAST_ERROR_DURATION,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
