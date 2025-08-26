import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AppLayout } from "./ui/components/app-layout";
import { MyTasksPage } from "./ui/pages/my-tasks-page";
import { AwardsPage } from "./ui/pages/awards-page";
import { MyDayPage } from "./ui/pages/my-day-page";

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
