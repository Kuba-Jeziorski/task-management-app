import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as loginApi } from "../services/api-user";
import toast from "react-hot-toast";
import {
  LOGGED_IN_ERROR,
  LOGGED_IN_SUCCESSFULLY,
} from "../constants/constants";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success(LOGGED_IN_SUCCESSFULLY);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(`Error while logging in: ${err}`);
      toast.error(LOGGED_IN_ERROR);
    },
  });

  return { login, isPending };
};
