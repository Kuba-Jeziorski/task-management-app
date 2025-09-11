import { useQuery } from "@tanstack/react-query";
import { useProfile } from "./use-profile";
import { FETCH_RETRY_ATTEMPTS } from "../constants/constants";
import { getRewards } from "../services/api-rewards";
import type { GetUserIdProps } from "../constants/types";

export const useRewards = () => {
  const { profile } = useProfile();
  const userId = profile?.user_id;

  const {
    isLoading,
    data: rewards,
    error,
  } = useQuery({
    queryKey: ["rewards", userId],
    queryFn: () => getRewards(userId as unknown as GetUserIdProps),
    retry: FETCH_RETRY_ATTEMPTS,
  });

  return { isLoading, rewards, error };
};
