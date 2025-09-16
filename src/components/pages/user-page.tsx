import {
  CHANGE_YOUR_NAME,
  CHANGE_YOUR_PASSWORD,
  LOG_ADD_REWARD,
  LOG_ADD_TASK,
  LOG_EDIT_REWARD_ACTIVITY,
  LOG_EDIT_REWARD_NAME,
  LOG_EDIT_REWARD_POINTS,
  LOG_EDIT_TASK_ACTIVITY,
  LOG_EDIT_TASK_NAME,
  LOG_LOGIN,
  LOG_NAME_UPDATE,
  LOG_OUT,
  LOG_PASSWORD_UPDATE,
  LOG_REMOVE_REWARD,
  LOG_REMOVE_TASK,
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
          {/* log component */}
          <div className="flex flex-1 flex-col gap-8 min-h-0 overflow-y-auto pr-3">
            {data?.map((log) => (
              <div key={log.id} className="flex flex-col gap-3">
                <p className="text-tma-light-500 font-semibold text-lg pb-2 border-b border-b-tma-light-500">
                  {dataFormat(log.created_at)}
                </p>
                <ul className="flex flex-col gap-1">
                  {log.actions.map((single) => (
                    <li key={single.id}>
                      <p className="text-tma-light-500 text-sm">
                        {/* login */}
                        {single.name === LOG_LOGIN &&
                          "[USER] You have logged in"}
                        {/* name updated */}
                        {single.name === LOG_NAME_UPDATE &&
                          `[USER] You have changed your name from ${single.prevName} to ${single.newName}`}
                        {/* password updated */}
                        {single.name === LOG_PASSWORD_UPDATE &&
                          "[USER] You have changed your password"}
                        {/* added task */}
                        {single.name === LOG_ADD_TASK &&
                          `[TASK] You have added a ${single.title} (${single.group} group)`}
                        {/* edited task name */}
                        {single.name === LOG_EDIT_TASK_NAME &&
                          `[TASK] You have changed ${single.prevName} to ${single.newName} (${single.group} group)`}
                        {/* edited task activity */}
                        {single.name === LOG_EDIT_TASK_ACTIVITY &&
                          `[TASK] You have changed ${single.title} to ${
                            single.newActivity ? "active" : "completed"
                          } (${single.group} group)`}
                        {/* removed task */}
                        {single.name === LOG_REMOVE_TASK &&
                          `[TASK] You have removed ${single.title} (${single.group} group)`}
                        {/* added reward */}
                        {single.name === LOG_ADD_REWARD &&
                          `[REWARD] You have added a ${single.title} (${single.points} points)`}
                        {/* edited reward name */}
                        {single.name === LOG_EDIT_REWARD_NAME &&
                          `[REWARD] You have changed ${single.prevName} to ${single.newName}`}
                        {/* edited reward points */}
                        {single.name === LOG_EDIT_REWARD_POINTS &&
                          `[REWARD] You have changed ${single.title} from ${single.prevPoints} points to ${single.newPoints} points`}
                        {/* edited reward activity */}
                        {single.name === LOG_EDIT_REWARD_ACTIVITY &&
                          `[REWARD] You have claimed ${single.title} (${single.points} points)`}
                        {/* removed reward */}
                        {single.name === LOG_REMOVE_REWARD &&
                          `[REWARD] You have removed ${single.title} (${single.points} points)`}
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
