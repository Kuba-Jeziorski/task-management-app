import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTask as updateTaskDb } from "../services/api-tasks";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: updateTaskDb,
    onSuccess: () => {
      console.log(`Successfully updated task - toast`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) =>
      console.log(`Failed with updating - toast: ${err.message}`),
  });

  return { updateTask, isUpdating };
};
