import {
  CHANGE_YOUR_NAME,
  CHANGE_YOUR_PASSWORD,
  LOG_OUT,
} from "../../constants/constants";
import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";
import { useLogout } from "../../hooks/use-logout";
import { Button } from "../button/button";
import { UserUpdateForm } from "../form/user-update-form";

export const UserPage = () => {
  const { logout, isPending } = useLogout();

  useBlockedRedirect();

  return (
    <div className="w-2/3 p-4 bg-tma-light-100 rounded-xl">
      <div className="flex flex-col gap-3 p-2 pr-4 w-full overflow-auto text-tma-blue-100 text-lg">
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
          <h2 className="font-black text-tma-blue-200 text-2xl">{LOG_OUT}</h2>
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
  );
};
