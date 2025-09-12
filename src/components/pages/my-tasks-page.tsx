import { lazy, Suspense } from "react";
import { Spinner } from "../spinner/the-spinner";

const TaskGrid = lazy(() =>
  import("../task/task-grid").then((module) => ({ default: module.TaskGrid }))
);

export const MyTasksPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TaskGrid />
    </Suspense>
  );
};
