import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReward as updateRewardApi } from "../services/api-rewards";
import toast from "react-hot-toast";

export const useUpdateReward = () => {
  const queryClient = useQueryClient();

  const { mutate: updateReward, isPending } = useMutation({
    mutationFn: updateRewardApi,
    onSuccess: () => {
      toast.success("Updated reward placeholder");
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateReward, isPending };
};
