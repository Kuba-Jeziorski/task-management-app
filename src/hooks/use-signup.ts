import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../services/api-user";
import { SIGN_UP_SUCCESS } from "../constants/constants";
import { createProfile } from "../services/api-profile";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: async () => {
      toast.success(SIGN_UP_SUCCESS);
      await createProfile();
    },
  });

  return { signUp, isPending };
};
