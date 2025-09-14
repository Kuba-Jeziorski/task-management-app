import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createReward as createRewardApi } from "../services/api-rewards";
import { SUCCESSFUL_REWARD_CREATE } from "../constants/constants";

export const useCreateReward = () => {
  const queryClient = useQueryClient();

  const { mutate: createReward, isPending } = useMutation({
    mutationFn: createRewardApi,
    onSuccess: () => {
      toast.success(SUCCESSFUL_REWARD_CREATE);
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createReward, isPending };
};
