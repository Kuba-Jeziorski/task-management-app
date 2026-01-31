import { ResetPasswordForm } from "../form/reset-password-form";

export const ResetPasswordPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <div className="w-full max-w-xl overflow-hidden bg-tma-light-100 shadow-xl text-base text-tma-blue-200 shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg mx-5">
        <div className="flex flex-col gap-3 px-6 pt-3 pb-6">
          <div className="flex flex-col gap-3">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};
