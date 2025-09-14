import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { removeReward as removeRewardApi } from "../services/api-rewards";
import { SUCCESSFUL_REWARD_REMOVE } from "../constants/constants";

export const useRemoveReward = () => {
  const queryClient = useQueryClient();

  const { mutate: removeReward } = useMutation({
    mutationFn: removeRewardApi,
    onSuccess: () => {
      toast.success(SUCCESSFUL_REWARD_REMOVE);
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { removeReward };
};
