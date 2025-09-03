import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createTask as createTaskDb } from "../services/api-tasks";
import { SUCCESSFUL_TASK_CREATE } from "../constants/constants";
import type { NewTask } from "../constants/types";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation<void, Error, NewTask>({
    mutationFn: createTaskDb,
    onSuccess: () => {
      toast.success(SUCCESSFUL_TASK_CREATE);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createTask };
};
