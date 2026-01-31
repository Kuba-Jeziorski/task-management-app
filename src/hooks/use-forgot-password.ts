import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgotPassword as forgotPasswordApi } from "../services/api-user";
import { EMAIL_WAS_SENT } from "../constants/constants";

export const useForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: async () => {
      toast.success(`${EMAIL_WAS_SENT}`);
    },
  });

  return { forgotPassword, isPending };
};
