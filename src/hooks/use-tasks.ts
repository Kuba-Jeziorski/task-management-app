import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/api-tasks";
import type { GetUserIdProps } from "../constants/types";
import { FETCH_RETRY_ATTEMPTS } from "../constants/constants";
import { useProfile } from "./use-profile";

export const useTasks = () => {
  const { profile } = useProfile();
  const userId = profile?.user_id;

  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getTasks(userId as unknown as GetUserIdProps),
    retry: FETCH_RETRY_ATTEMPTS,
  });

  return { isLoading, tasks, error };
};
