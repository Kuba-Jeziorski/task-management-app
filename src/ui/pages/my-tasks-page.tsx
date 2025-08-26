import { TaskContextProvider } from "../../contexts/providers/task-context";
import { TaskGrid } from "../components/task-grid";

export const MyTasksPage = () => {
  return (
    <TaskContextProvider>
      <TaskGrid />
    </TaskContextProvider>
  );
};
