import { useNavigate } from "react-router";
import { useUser } from "../../hooks/use-user";
import { useEffect } from "react";
import { Spinner } from "../spinner/the-spinner";
import { URL_LOGIN_PAGE } from "../../constants/constants";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate(`/${URL_LOGIN_PAGE}`);
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return children;
  }
};
