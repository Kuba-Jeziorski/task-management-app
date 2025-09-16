import type {
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
} from "./constants";

export type Log_Login = {
  id: number;
  type: typeof LOG_LOGIN; // condition for different cases
};

export type Log_NameUpdate = {
  id: number;
  type: typeof LOG_NAME_UPDATE;
  prevName: string;
  newName: string;
};

export type Log_PasswordUpdate = {
  id: number;
  type: typeof LOG_PASSWORD_UPDATE;
};

export type Log_AddTask = {
  id: number;
  type: typeof LOG_ADD_TASK;
  name: string;
  group: string;
};

export type Log_EditTaskName = {
  id: number;
  type: typeof LOG_EDIT_TASK_NAME;
  prevName: string;
  newName: string;
  group: string;
};

export type Log_EditTaskActivity = {
  id: number;
  type: typeof LOG_EDIT_TASK_ACTIVITY;
  name: string;
  newActivity: boolean;
  group: string;
};

export type Log_RemoveTask = {
  id: number;
  type: typeof LOG_REMOVE_TASK;
  name: string;
  group: string;
};

export type Log_AddReward = {
  id: number;
  type: typeof LOG_ADD_REWARD;
  name: string;
  points: number;
};

export type Log_EditRewardName = {
  id: number;
  type: typeof LOG_EDIT_REWARD_NAME;
  prevName: string;
  newName: string;
  points: number;
};

export type Log_EditRewardPoints = {
  id: number;
  type: typeof LOG_EDIT_REWARD_POINTS;
  name: string;
  prevPoints: number;
  newPoints: number;
};

export type Log_EditRewardActivity = {
  id: number;
  type: typeof LOG_EDIT_REWARD_ACTIVITY;
  name: string;
  points: number;
};

export type Log_RemoveReward = {
  id: number;
  type: typeof LOG_REMOVE_REWARD;
  name: string;
  points: number;
};

export type Log_Action =
  | Log_Login
  | Log_NameUpdate
  | Log_PasswordUpdate
  | Log_AddTask
  | Log_EditTaskName
  | Log_EditTaskActivity
  | Log_RemoveTask
  | Log_AddReward
  | Log_EditRewardName
  | Log_EditRewardPoints
  | Log_EditRewardActivity
  | Log_RemoveReward;
