import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeReward as removeRewardApi } from "../services/api-rewards";
import toast from "react-hot-toast";

export const useRemoveReward = () => {
  const queryClient = useQueryClient();

  const { mutate: removeReward } = useMutation({
    mutationFn: removeRewardApi,
    onSuccess: () => {
      toast.success("Removed reward toast");
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { removeReward };
};
