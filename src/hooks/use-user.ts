import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "./get-current-user";
import { AUTHENTICATED } from "../constants/constants";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === AUTHENTICATED };
}
