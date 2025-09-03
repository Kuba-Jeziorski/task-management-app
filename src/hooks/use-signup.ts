import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/api-user";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("SUCCESS - SIGN UP");
    },
  });

  return { signUp, isPending };
};
