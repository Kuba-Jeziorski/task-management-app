import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeTask as removeTaskDb } from "../services/api-tasks";

export const useRemoveTask = () => {
  const queryClient = useQueryClient();

  const { mutate: removeTask, isPending: isRemoving } = useMutation({
    mutationFn: removeTaskDb,
    onSuccess: () => {
      console.log(`Successfully removed task - toast`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) =>
      console.log(`Failed with removing - toast: ${err.message}`),
  });

  return { removeTask, isRemoving };
};
