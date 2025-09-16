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
    <div className="w-full flex gap-10 h-full">
      <div className="w-2/3 p-4 pr-1 bg-tma-light-100 rounded-[20px]">
        <div className="flex p-2 w-full h-full min-h-0 overflow-auto text-tma-blue-100 text-lg">
          <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-y-auto pr-3">
            <div className="flex flex-col gap-3 bg-tma-light-200 p-4 rounded-xl">
              <h2 className="font-black text-tma-blue-200 text-2xl">
                {CHANGE_YOUR_NAME}
              </h2>
              <UserUpdateForm type="fullName" />
            </div>
            <div className="flex flex-col gap-3 bg-tma-light-200 p-4 rounded-xl">
              <h2 className="font-black text-tma-blue-200 text-2xl">
                {CHANGE_YOUR_PASSWORD}
              </h2>
              <UserUpdateForm type="password" />
            </div>
            <div className="flex flex-col gap-3 bg-tma-light-200 p-4 rounded-xl">
              <h2 className="font-black text-tma-blue-200 text-2xl">
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
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full p-4 pr-1 bg-tma-light-100 rounded-[20px]">
        <div className="flex p-2 w-full h-full min-h-0 overflow-auto text-tma-blue-100 text-lg">
          <Suspense fallback={<Spinner />}>
            <LogListing />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
