import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppLayout } from "./ui/components/app-layout";
import { MyTasksPage } from "./ui/pages/my-tasks-page";
import { AwardsPage } from "./ui/pages/awards-page";
import { MyDayPage } from "./ui/pages/my-day-page";

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
    Component: AppLayout,
    children: [
      { index: true, Component: () => <Navigate to="my-tasks" replace /> },
      { path: "my-tasks", Component: MyTasksPage },
      { path: "awards", Component: AwardsPage },
      { path: "my-day", Component: MyDayPage },
      { path: "*", Component: () => <Navigate to="my-tasks" replace /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
