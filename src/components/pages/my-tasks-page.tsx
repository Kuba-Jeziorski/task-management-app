import { TaskContextProvider } from "../../contexts/task-context";
import { TaskGrid } from "../task/task-grid";

export const MyTasksPage = () => {
  return (
    <TaskContextProvider>
      <TaskGrid />
    </TaskContextProvider>
  );
};
