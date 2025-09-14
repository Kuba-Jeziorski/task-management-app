import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateLog as updateLogApi } from "../services/api-logs";

export const useUpdateLog = () => {
  const queryClient = useQueryClient();

  const { mutate: updateLog } = useMutation({
    mutationFn: updateLogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateLog };
};
