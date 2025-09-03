import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateTask as updateTaskDb } from "../services/api-tasks";
import { SUCCESSFUL_TASK_UPDATE } from "../constants/constants";
import type { Task } from "../constants/types";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTask } = useMutation<Task | null, Error, Task>({
    mutationFn: updateTaskDb,
    onSuccess: () => {
      toast.success(SUCCESSFUL_TASK_UPDATE);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateTask };
};
