import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../services/api-user";
import { SIGN_UP_SUCCESS } from "../constants/constants";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(SIGN_UP_SUCCESS);
    },
  });

  return { signUp, isPending };
};
