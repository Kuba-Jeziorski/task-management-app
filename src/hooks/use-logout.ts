import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout as logoutApi } from "../services/api-user";
import {
  LOGGED_OUT_ERROR,
  LOGGED_OUT_SUCCESSFULLY,
} from "../constants/constants";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success(LOGGED_OUT_SUCCESSFULLY);
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(LOGGED_OUT_ERROR);
    },
  });

  return { logout, isPending };
};
