import type {
  Log_Login,
  Log_NameUpdate,
  Log_PasswordUpdate,
  Log_AddTask,
  Log_EditTaskName,
  Log_EditTaskActivity,
  Log_RemoveTask,
  Log_AddReward,
  Log_EditRewardName,
  Log_EditRewardPoints,
  Log_EditRewardActivity,
  Log_RemoveReward,
  Log_Action,
} from "../constants/log-action-variants";

import {
  LOG_LOGIN,
  LOG_NAME_UPDATE,
  LOG_PASSWORD_UPDATE,
  LOG_ADD_TASK,
  LOG_EDIT_TASK_NAME,
  LOG_EDIT_TASK_ACTIVITY,
  LOG_REMOVE_TASK,
  LOG_ADD_REWARD,
  LOG_EDIT_REWARD_NAME,
  LOG_EDIT_REWARD_POINTS,
  LOG_EDIT_REWARD_ACTIVITY,
  LOG_REMOVE_REWARD,
} from "../constants/constants";

type LogFormatterMap = {
  [LOG_LOGIN]: (record: Log_Login) => string;
  [LOG_NAME_UPDATE]: (record: Log_NameUpdate) => string;
  [LOG_PASSWORD_UPDATE]: (record: Log_PasswordUpdate) => string;
  [LOG_ADD_TASK]: (record: Log_AddTask) => string;
  [LOG_EDIT_TASK_NAME]: (record: Log_EditTaskName) => string;
  [LOG_EDIT_TASK_ACTIVITY]: (record: Log_EditTaskActivity) => string;
  [LOG_REMOVE_TASK]: (record: Log_RemoveTask) => string;
  [LOG_ADD_REWARD]: (record: Log_AddReward) => string;
  [LOG_EDIT_REWARD_NAME]: (record: Log_EditRewardName) => string;
  [LOG_EDIT_REWARD_POINTS]: (record: Log_EditRewardPoints) => string;
  [LOG_EDIT_REWARD_ACTIVITY]: (record: Log_EditRewardActivity) => string;
  [LOG_REMOVE_REWARD]: (record: Log_RemoveReward) => string;
};

const logFormatters: LogFormatterMap = {
  [LOG_LOGIN]: () => "[USER] You have logged in",
  [LOG_NAME_UPDATE]: (record) =>
    `[USER] You have changed your name from ${record.prevName} to ${record.newName}`,
  [LOG_PASSWORD_UPDATE]: () => "[USER] You have changed your password",
  [LOG_ADD_TASK]: (record) =>
    `[TASK] You have added ${record.title} (${record.group} group)`,
  [LOG_EDIT_TASK_NAME]: (record) =>
    `[TASK] You have changed ${record.prevName} to ${record.newName} (${record.group} group)`,
  [LOG_EDIT_TASK_ACTIVITY]: (record) =>
    `[TASK] You have changed ${record.title} to ${
      record.newActivity ? "active" : "completed"
    } (${record.group} group)`,
  [LOG_REMOVE_TASK]: (record) =>
    `[TASK] You have removed ${record.title} (${record.group} group)`,
  [LOG_ADD_REWARD]: (record) =>
    `[REWARD] You have added ${record.title} (${record.points} points)`,
  [LOG_EDIT_REWARD_NAME]: (record) =>
    `[REWARD] You have changed ${record.prevName} to ${record.newName}`,
  [LOG_EDIT_REWARD_POINTS]: (record) =>
    `[REWARD] You have changed ${record.title} from ${record.prevPoints} points to ${record.newPoints} points`,
  [LOG_EDIT_REWARD_ACTIVITY]: (record) =>
    `[REWARD] You have claimed ${record.title} (${record.points} points)`,
  [LOG_REMOVE_REWARD]: (record) =>
    `[REWARD] You have removed ${record.title} (${record.points} points)`,
};

export const formatLogMessage = (record: Log_Action): string => {
  const formatter = logFormatters[record.name as keyof LogFormatterMap];
  return formatter
    ? formatter(record as any)
    : "[UNKNOWN] Unrecognized log entry";
};
