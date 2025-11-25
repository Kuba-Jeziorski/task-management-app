import { useQuery } from "@tanstack/react-query";
import { useProfile } from "./use-profile";
import type { GetUserIdProps } from "../constants/types";
import { getLogs } from "../services/api-logs";
import { FETCH_RETRY_ATTEMPTS } from "../constants/constants";

export const useLogs = () => {
  const { profile } = useProfile();
  const userId = profile?.user_id;

  const {
    isLoading,
    data: logs,
    error,
  } = useQuery({
    queryKey: ["logs", userId],
    queryFn: () => getLogs(userId as unknown as GetUserIdProps),
    retry: FETCH_RETRY_ATTEMPTS,
    enabled: !!userId,
  });

  const latestLog = logs?.length
    ? logs.reduce((latest, current) =>
        new Date(current.created_at) > new Date(latest.created_at)
          ? current
          : latest
      )
    : undefined;

  // logs in descending order (newest to oldest)
  logs?.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();

    return dateB - dateA;
  });

  return { isLoading, logs, latestLog, error };
};
