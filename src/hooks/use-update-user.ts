import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { logout, updateUser as updateUserApi } from "../services/api-user";
import {
  FULL_NAME_CHANGED_SUCCESSFULLY,
  PASSWORD_CHANGED_SUCCESSFULLY,
  URL_LOGIN_PAGE,
  USER_INFO_CHANGED_ERROR,
} from "../constants/constants";
import type { UpdateUserPayload } from "../constants/types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUserApi(payload),
    onSuccess: async (_, variables) => {
      if ("password" in variables) {
        toast.success(PASSWORD_CHANGED_SUCCESSFULLY);
        queryClient.removeQueries();
        logout();
        navigate(`/${URL_LOGIN_PAGE}`, { replace: true });
      }

      if ("data" in variables && variables.data.fullName) {
        toast.success(FULL_NAME_CHANGED_SUCCESSFULLY);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(USER_INFO_CHANGED_ERROR);
    },
  });

  return { updateUser, isPending };
};
