import { useState } from "react";
import { USER_FORM_LOGIN } from "../../constants/constants";
import type { UserFormType } from "../../constants/types";
import { LoginForm } from "../form/login-form";
import { LoginFormTabs } from "../form/login-form-tabs";
import { SignUpForm } from "../form/sign-up-form";

export const LoginPage = () => {
  const [formType, setFormType] = useState<UserFormType>(USER_FORM_LOGIN);

  const handleToggle = (type: UserFormType) => {
    setFormType(type);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="min-w-xl  overflow-hidden bg-tma-light-100 shadow-xl text-base text-tma-blue-200 shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg">
        <div className="flex flex-col">
          <LoginFormTabs currentTab={formType} setCurrentTab={handleToggle} />
          <div className="flex flex-col gap-3  px-6 py-3">
            {formType === USER_FORM_LOGIN ? <LoginForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  );
};
