import { useQuery } from "@tanstack/react-query";

import { FETCH_RETRY_ATTEMPTS } from "../constants/constants";
import { getProfile } from "../services/api-profile";

export const useProfile = () => {
  const {
    isLoading,
    data: profile,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    retry: FETCH_RETRY_ATTEMPTS,
  });

  return { isLoading, profile, error };
};
