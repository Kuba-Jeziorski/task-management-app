import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  FORGOT_PASSWORD,
  URL_FORGET_PASSWORD,
  URL_MY_TASKS_PAGE,
  USER_FORM_LOGIN,
} from "../../constants/constants";
import type { UserFormType } from "../../constants/types";
import { LoginForm } from "../form/login-form";
import { LoginFormTabs } from "../form/login-form-tabs";
import { SignUpForm } from "../form/sign-up-form";
import { useUser } from "../../hooks/use-user";
import { Spinner } from "../spinner/the-spinner";
import { cn } from "../../utils/css";

export const LoginPage = () => {
  const [formType, setFormType] = useState<UserFormType>(USER_FORM_LOGIN);

  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(`/${URL_MY_TASKS_PAGE}`, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleToggle = (type: UserFormType) => {
    setFormType(type);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center max-custom-600:px-5">
      <div className="w-full max-w-xl overflow-hidden bg-tma-light-100 shadow-xl text-base text-tma-blue-200 shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg mx-5">
        <div className="flex flex-col">
          <LoginFormTabs currentTab={formType} setCurrentTab={handleToggle} />
          <div className="flex flex-col gap-3 px-6 pt-3 pb-6">
            {formType === USER_FORM_LOGIN ? (
              <LoginForm />
            ) : (
              <SignUpForm handleFormTypeChange={setFormType} />
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full max-w-xl mx-5 flex pl-6 text-tma-blue-200 transition-all duration-300",
          "hover:text-tma-blue-100 hover:underline",
        )}
      >
        <Link to={`/${URL_FORGET_PASSWORD}`}>{FORGOT_PASSWORD}</Link>
      </div>
    </div>
  );
};
