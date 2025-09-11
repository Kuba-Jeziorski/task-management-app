import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updatePoints as updatePointsApi } from "../services/api-profile";
import type { PointsUpdateProps } from "../constants/types";
import { POINTS_CHANGED_ERROR } from "../constants/constants";

export const useCurrentPoints = () => {
  const queryClient = useQueryClient();

  const { mutate: updatePoints, isPending: isUpdating } = useMutation({
    mutationFn: ({ taskValue, pointsType }: PointsUpdateProps) =>
      updatePointsApi({ taskValue, pointsType }),
    onSuccess: () => {
      // toast.success(POINTS_CHANGED_SUCCESSFULLY);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(POINTS_CHANGED_ERROR);
    },
  });

  return { updatePoints, isUpdating };
};
