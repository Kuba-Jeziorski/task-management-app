import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import {
  logout,
  passwordChange as passwordChangeApi,
} from "../services/api-user";
import {
  PASSWORD_CHANGED_SUCCESSFULLY,
  URL_LOGIN_PAGE,
  USER_INFO_CHANGED_ERROR,
} from "../constants/constants";
import type { UpdateUserPassword } from "../constants/types";

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: passwordChange, isPending } = useMutation({
    mutationFn: (newPassword: UpdateUserPassword) =>
      passwordChangeApi(newPassword),
    onSuccess: async () => {
      toast.success(PASSWORD_CHANGED_SUCCESSFULLY);
      queryClient.removeQueries();
      logout();
      navigate(`/${URL_LOGIN_PAGE}`, { replace: true });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(USER_INFO_CHANGED_ERROR);
    },
  });

  return { passwordChange, isPending };
};
