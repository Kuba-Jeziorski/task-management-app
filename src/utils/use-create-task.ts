import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask as createTaskDb } from "../services/api-tasks";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending: isUpdating } = useMutation({
    mutationFn: createTaskDb,
    onSuccess: () => {
      console.log(`Successfully created task - toast`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) =>
      console.log(`Failed with creating - toast: ${err.message}`),
  });

  return { createTask, isUpdating };
};
