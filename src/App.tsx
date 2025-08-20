import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AwardsPage } from "./pages/awards-page";
import { MyDayPage } from "./pages/my-day-page";
import { MyTasksPage } from "./pages/my-tasks-page";
import { AppLayout } from "./ui/components/app-layout";

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
  return <RouterProvider router={router} />;
}

export default App;
