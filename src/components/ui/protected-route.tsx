import { useNavigate } from "react-router";
import { useEffect } from "react";

import { useUser } from "../../hooks/use-user";
import { Spinner } from "../spinner/the-spinner";
import { LOG_LOGIN, URL_LOGIN_PAGE } from "../../constants/constants";
import { useCreateLog } from "../../hooks/use-create-log";
import type { Logs } from "../../constants/types";
import { useLogs } from "../../hooks/use-logs";
import type { Log_Login } from "../../constants/log-action-variants";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const isFirstLogOfDay = (logs: Logs, userId: string) => {
  const today = new Date().toISOString().split("T")[0];
  return !logs.some((log) => {
    const date = new Date(log.created_at);
    const formattedDate = date.toISOString().split("T")[0];

    return log.user_id === userId && formattedDate.startsWith(today);
  });
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useUser();
  const { createLog } = useCreateLog();
  const { logs } = useLogs();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate(`/${URL_LOGIN_PAGE}`);
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!user || !isAuthenticated || !logs) return;

    if (isFirstLogOfDay(logs, user.id)) {
      const loginAction: Log_Login = {
        id: 0,
        name: LOG_LOGIN,
      };

      createLog({
        user_id: user.id,
        actions: [loginAction],
      });
    }
  }, [user, isAuthenticated, logs, createLog]);

  if (isLoading) {
    return <Spinner />;
  }

  if (user && isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};
