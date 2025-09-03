import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeTask as removeTaskDb } from "../services/api-tasks";
import toast from "react-hot-toast";
import { SUCCESSFUL_TASK_REMOVE } from "../constants/constants";

export const useRemoveTask = () => {
  const queryClient = useQueryClient();

  const { mutate: removeTask } = useMutation<void, Error, number>({
    mutationFn: removeTaskDb,
    onSuccess: () => {
      toast.success(SUCCESSFUL_TASK_REMOVE);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { removeTask };
};
