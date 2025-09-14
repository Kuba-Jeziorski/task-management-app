import {
  CHANGE_YOUR_NAME,
  CHANGE_YOUR_PASSWORD,
  LOG_LOGIN,
  LOG_NAME_UPDATE,
  LOG_OUT,
  LOG_PASSWORD_UPDATE,
} from "../../constants/constants";
import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";
import { useLogout } from "../../hooks/use-logout";
import { useLogs } from "../../hooks/use-logs";
import { dataFormat } from "../../utils/data-format";
import { Button } from "../button/button";
import { UserUpdateForm } from "../form/user-update-form";

export const UserPage = () => {
  const { logout, isPending } = useLogout();

  const { logs: data = [] } = useLogs();
  console.log(data);

  useBlockedRedirect();

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
          <div className="flex flex-1 flex-col gap-8 min-h-0 overflow-y-auto pr-3">
            {data?.map((log) => (
              <div key={log.id} className="flex flex-col gap-3">
                <p className="text-tma-light-500 font-semibold text-lg pb-2 border-b border-b-tma-light-500">
                  {dataFormat(log.date)}
                </p>
                <ul className="flex flex-col gap-1">
                  {log.actions.map((single) => (
                    <li key={single.id}>
                      <p className="text-tma-light-500 text-sm">
                        {/* login case */}
                        {single.name === LOG_LOGIN && "You have logged in"}
                        {/* name update case */}
                        {single.name === LOG_NAME_UPDATE &&
                          `You have changed your name from ${single.prevName} to ${single.newName}`}
                        {/* password update case */}
                        {single.name === LOG_PASSWORD_UPDATE &&
                          "You have changed your password"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
