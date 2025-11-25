import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

import { AppLayout } from "./components/ui/app-layout";
import { ProtectedRoute } from "./components/ui/protected-route";
import { Spinner } from "./components/spinner/the-spinner";

import {
  STALE_TIME,
  TOAST_ERROR_DURATION,
  TOAST_SUCCESS_DURATION,
  URL_ABOUT_PAGE,
  URL_AWARDS_PAGE,
  URL_LOGIN_PAGE,
  URL_MY_TASKS_PAGE,
  URL_USER_PAGE,
} from "./constants/constants";
import { GlobalContextProvider } from "./contexts/global-context";
import { RewardContextProvider } from "./contexts/reward-context";
import { TaskContextProvider } from "./contexts/task-context";

const MyTasksPage = lazy(() =>
  import("./components/pages/my-tasks-page").then((module) => ({
    default: module.MyTasksPage,
  }))
);
const AwardsPage = lazy(() =>
  import("./components/pages/awards-page").then((module) => ({
    default: module.AwardsPage,
  }))
);
const LoginPage = lazy(() =>
  import("./components/pages/login-page").then((module) => ({
    default: module.LoginPage,
  }))
);
const UserPage = lazy(() =>
  import("./components/pages/user-page").then((module) => ({
    default: module.UserPage,
  }))
);
const AboutPage = lazy(() =>
  import("./components/pages/about-page").then((module) => ({
    default: module.AboutPage,
  }))
);
const NotFoundPage = lazy(() =>
  import("./components/pages/not-found-page").then((module) => ({
    default: module.NotFoundPage,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
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
        Component: () => <Navigate to={`/${URL_MY_TASKS_PAGE}`} replace />,
      },
      {
        path: `/${URL_MY_TASKS_PAGE}`,
        Component: () => (
          <Suspense fallback={<Spinner />}>
            <MyTasksPage />
          </Suspense>
        ),
      },
      {
        path: `/${URL_AWARDS_PAGE}`,
        Component: () => (
          <Suspense fallback={<Spinner />}>
            <AwardsPage />
          </Suspense>
        ),
      },
      {
        path: `/${URL_ABOUT_PAGE}`,
        Component: () => (
          <Suspense fallback={<Spinner />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: `/${URL_USER_PAGE}`,
        Component: () => (
          <Suspense fallback={<Spinner />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        Component: () => (
          <Suspense fallback={<Spinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: `/${URL_LOGIN_PAGE}`,
    Component: () => (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <TaskContextProvider>
          <RewardContextProvider>
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
          </RewardContextProvider>
        </TaskContextProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}

export default App;
