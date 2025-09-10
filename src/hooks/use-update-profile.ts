import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateProfileName as updateProfileNameApi } from "../services/api-profile";
import {
  FULL_NAME_CHANGED_ERROR,
  FULL_NAME_CHANGED_SUCCESSFULLY,
} from "../constants/constants";

export const useUpdateProfileName = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfileName, isPending: isUpdating } = useMutation({
    mutationFn: (newName: string) => updateProfileNameApi(newName),
    onSuccess: () => {
      toast.success(FULL_NAME_CHANGED_SUCCESSFULLY);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(FULL_NAME_CHANGED_ERROR);
    },
  });

  return { updateProfileName, isUpdating };
};
