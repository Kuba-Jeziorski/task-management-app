import type { Task, Tasks } from "../constants/types";
import { getTasks, updateTask } from "../services/api-tasks";

type UpdateTask = {
  task: Task;
  setData: React.Dispatch<React.SetStateAction<Tasks>>;
};

export const handleUpdateTask = async ({ task, setData }: UpdateTask) => {
  await updateTask(task);
  // TODO swap with tanStack - invalidate queries
  const freshTasks = await getTasks();
  setData(freshTasks);
};
