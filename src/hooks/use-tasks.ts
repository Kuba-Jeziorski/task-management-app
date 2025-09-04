import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/api-tasks";
import { useUser } from "./use-user";
import type { GetTasksProps } from "../constants/types";
import { RETRY_ATTEMPTS } from "../constants/constants";

export const useTasks = () => {
  const { user } = useUser();
  const { id: userId } = user!;

  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(userId as unknown as GetTasksProps),
    retry: RETRY_ATTEMPTS,
  });

  return { isLoading, tasks, error };
};
