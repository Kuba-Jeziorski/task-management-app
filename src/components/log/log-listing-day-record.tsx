import type { Log_Action } from "../../constants/log-action-variants";
import {
  LOG_ADD_REWARD,
  LOG_ADD_TASK,
  LOG_EDIT_REWARD_ACTIVITY,
  LOG_EDIT_REWARD_NAME,
  LOG_EDIT_REWARD_POINTS,
  LOG_EDIT_TASK_ACTIVITY,
  LOG_EDIT_TASK_NAME,
  LOG_LOGIN,
  LOG_NAME_UPDATE,
  LOG_PASSWORD_UPDATE,
  LOG_REMOVE_REWARD,
  LOG_REMOVE_TASK,
} from "../../constants/constants";

type Props = {
  record: Log_Action;
};

export const LogListingDayRecord = ({ record }: Props) => {
  return (
    <li key={record.id}>
      <p className="text-tma-light-500 text-sm">
        {/* login */}
        {record.name === LOG_LOGIN && "[USER] You have logged in"}
        {/* name updated */}
        {record.name === LOG_NAME_UPDATE &&
          `[USER] You have changed your name from ${record.prevName} to ${record.newName}`}
        {/* password updated */}
        {record.name === LOG_PASSWORD_UPDATE &&
          "[USER] You have changed your password"}
        {/* added task */}
        {record.name === LOG_ADD_TASK &&
          `[TASK] You have added a ${record.title} (${record.group} group)`}
        {/* edited task name */}
        {record.name === LOG_EDIT_TASK_NAME &&
          `[TASK] You have changed ${record.prevName} to ${record.newName} (${record.group} group)`}
        {/* edited task activity */}
        {record.name === LOG_EDIT_TASK_ACTIVITY &&
          `[TASK] You have changed ${record.title} to ${
            record.newActivity ? "active" : "completed"
          } (${record.group} group)`}
        {/* removed task */}
        {record.name === LOG_REMOVE_TASK &&
          `[TASK] You have removed ${record.title} (${record.group} group)`}
        {/* added reward */}
        {record.name === LOG_ADD_REWARD &&
          `[REWARD] You have added a ${record.title} (${record.points} points)`}
        {/* edited reward name */}
        {record.name === LOG_EDIT_REWARD_NAME &&
          `[REWARD] You have changed ${record.prevName} to ${record.newName}`}
        {/* edited reward points */}
        {record.name === LOG_EDIT_REWARD_POINTS &&
          `[REWARD] You have changed ${record.title} from ${record.prevPoints} points to ${record.newPoints} points`}
        {/* edited reward activity */}
        {record.name === LOG_EDIT_REWARD_ACTIVITY &&
          `[REWARD] You have claimed ${record.title} (${record.points} points)`}
        {/* removed reward */}
        {record.name === LOG_REMOVE_REWARD &&
          `[REWARD] You have removed ${record.title} (${record.points} points)`}
      </p>
    </li>
  );
};
