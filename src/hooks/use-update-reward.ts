import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateReward as updateRewardApi } from "../services/api-rewards";
import { SUCCESSFUL_REWARD_UPDATE } from "../constants/constants";

export const useUpdateReward = () => {
  const queryClient = useQueryClient();

  const { mutate: updateReward, isPending } = useMutation({
    mutationFn: updateRewardApi,
    onSuccess: () => {
      toast.success(SUCCESSFUL_REWARD_UPDATE);
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateReward, isPending };
};
