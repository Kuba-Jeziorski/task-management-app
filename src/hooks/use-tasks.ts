import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/api-tasks";

export const useTasks = () => {
  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    retry: 5,
  });

  return { isLoading, tasks, error };
};
