import { lazy, Suspense } from "react";
import {
  CHANGE_YOUR_NAME,
  CHANGE_YOUR_PASSWORD,
  LOG_OUT,
} from "../../constants/constants";
import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";
import { useLogout } from "../../hooks/use-logout";
import { Button } from "../button/button";
import { UserUpdateForm } from "../form/user-update-form";
import { Spinner } from "../spinner/the-spinner";

const LogListing = lazy(() =>
  import("../log/log-listing").then((module) => ({
    default: module.LogListing,
  }))
);

export const UserPage = () => {
  useBlockedRedirect();

  const { logout, isPending } = useLogout();

  return (
    <div className="w-full flex gap-10 h-full max-custom-1440:gap-6 max-custom-1152:flex-col max-custom-1152:justify-stretch">
      <div className="w-2/3 p-4 pr-1 bg-tma-light-100 rounded-[20px] max-custom-1152:w-full max-custom-1152:flex-1 max-custom-1152:p-0 max-custom-800:h-full">
        <div className="flex p-2 w-full h-full min-h-0 overflow-auto text-tma-blue-100 text-lg">
          <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-y-auto pr-3 max-custom-1152:grid max-custom-1152:grid-cols-2 max-custom-1152:p-1 max-custom-800:grid-cols-1 max-custom-800:pr-2">
            <div className="flex flex-col gap-3 bg-tma-light-200 p-4 rounded-xl">
              <h2 className="font-black text-tma-blue-200 text-2xl max-custom-900:text-xl">
                {CHANGE_YOUR_NAME}
              </h2>
              <UserUpdateForm type="fullName" />
            </div>
            <div className="flex flex-col gap-3 bg-tma-light-200 p-4 rounded-xl">
              <h2 className="font-black text-tma-blue-200 text-2xl max-custom-900:text-xl">
                {CHANGE_YOUR_PASSWORD}
              </h2>
              <UserUpdateForm type="password" />
            </div>
            <div className="flex flex-col gap-3 bg-tma-light-200 p-4 rounded-xl flex-1 max-custom-1152:col-span-2 max-custom-800:col-span-1">
              <h2 className="font-black text-tma-blue-200 text-2xl max-custom-900:text-xl">
                {LOG_OUT}
              </h2>
              <div className="flex">
                <Button
                  variant="danger"
                  onClick={() => logout()}
                  disabled={isPending}
                >
                  {LOG_OUT}
                </Button>
              </div>
            </div>
            <div className="hidden w-full h-56 rounded-xl p-3 bg-tma-light-100 border border-tma-light-200 max-custom-800:flex">
              <LogListing />
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full p-4 pr-1 bg-tma-light-100 rounded-[20px] max-custom-1152:w-full max-custom-1152:h-56 max-custom-800:hidden">
        <div className="flex p-2 w-full h-full min-h-0 overflow-auto text-tma-blue-100 text-lg">
          <Suspense fallback={<Spinner />}>
            <LogListing />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
