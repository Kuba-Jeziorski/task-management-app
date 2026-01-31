import { useNavigate } from "react-router";
import { useEffect } from "react";

import { useUser } from "../../hooks/use-user";
import {
  GET_BACK_TO_LOGIN_PAGE,
  URL_MY_TASKS_PAGE,
} from "../../constants/constants";
import { Spinner } from "../spinner/the-spinner";
import { Button } from "../button/button";
import { ForgotPasswordForm } from "../form/forgot-password-form";

export const ForgotPasswordPage = () => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(`/${URL_MY_TASKS_PAGE}`, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3 max-custom-600:px-5">
      <div className="w-full max-w-xl">
        <Button
          variant={"primary"}
          onClick={() => navigate(-1)}
          className="uppercase"
        >
          {GET_BACK_TO_LOGIN_PAGE}
        </Button>
      </div>
      <div className="w-full max-w-xl overflow-hidden bg-tma-light-100 shadow-xl text-base text-tma-blue-200 shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg mx-5">
        <div className="flex flex-col gap-3 p-6">
          <div className="flex flex-col gap-3">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};
