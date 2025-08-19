import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AppLayout } from "./ui/app-layout";
import { AwardsPage } from "./pages/AwardsPage";
import { MyDayPage } from "./pages/MyDayPage";
import { MyTasksPage } from "./pages/MyTasksPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: () => <Navigate to="my-day" replace /> },
      { path: "my-tasks", Component: MyTasksPage },
      { path: "awards", Component: AwardsPage },
      { path: "my-day", Component: MyDayPage },
      { path: "*", Component: () => <Navigate to="my-day" replace /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
