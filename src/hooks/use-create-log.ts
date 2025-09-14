import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLog as createLogApi } from "../services/api-logs";

// executed while user is log in for the first time in a particular day
export const useCreateLog = () => {
  const queryClient = useQueryClient();

  const { mutate: createLog } = useMutation({
    mutationFn: createLogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
    onError: (err) => console.error(err.message),
  });

  return { createLog };
};
