import {
  ALL_POINTS,
  COLLECTED_REWARDS,
  CONFIRMATION,
  CURRENT_POINTS,
  DROPDOWN_NAME_REWARD_EDIT,
  DROPDOWN_NAME_REWARD_REMOVE,
  DROPDOWN_NAME_TASK_EDIT,
  DROPDOWN_NAME_TASK_REMOVE,
  DROPDOWN_REWARD,
  DROPDOWN_TASK,
  EDIT_REWARD,
  EDIT_TASK,
  NEW_REWARD,
  NEW_TASK,
  REWARDS,
  USER_FORM_LOGIN,
  USER_FORM_SIGNUP,
  type GROUP_DECIDE,
  type GROUP_DELEGATE,
  type GROUP_DELETE,
  type GROUP_DO,
} from "./constants";
import type { Log_Action } from "./log-action-variants";

export type SidebarElement = {
  icon: React.ReactNode;
  url: string;
  name: string;
  disabled: boolean;
};

export type SidebarElements = SidebarElement[];

export type GroupName =
  | typeof GROUP_DO
  | typeof GROUP_DECIDE
  | typeof GROUP_DELEGATE
  | typeof GROUP_DELETE;

export type Task = {
  id: number;
  user_id: string;
  group: GroupName;
  name: string;
  active: boolean;
  created_at?: string;
};

export type NewTask = Omit<Task, "id">;

export type Tasks = Task[];

export type TaskGroupPoints = Record<GroupName, number>;

type DropdownName =
  | typeof DROPDOWN_NAME_TASK_EDIT
  | typeof DROPDOWN_NAME_TASK_REMOVE
  | typeof DROPDOWN_NAME_REWARD_EDIT
  | typeof DROPDOWN_NAME_REWARD_REMOVE;

export type DropdownRecordType = typeof DROPDOWN_TASK | typeof DROPDOWN_REWARD;

export type DropdownOptionElement = {
  icon: React.ReactNode;
  name: DropdownName;
  className: string;
};

export type DropdownOptionElements = DropdownOptionElement[];

type TaskDialogType = typeof NEW_TASK | typeof EDIT_TASK;
type RewardDialogType = typeof NEW_REWARD | typeof EDIT_REWARD;
type ConfirmationDialogType = typeof CONFIRMATION;

export type NewDialogType =
  | TaskDialogType
  | RewardDialogType
  | ConfirmationDialogType;

export type UserFormType = typeof USER_FORM_LOGIN | typeof USER_FORM_SIGNUP;

export type SignupProps = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type PartialSignupProps = Omit<SignupProps, "passwordConfirm">;

export type LoginProps = Omit<SignupProps, "fullName" | "passwordConfirm">;

export type UpdateUserPassword = { password: string };

export type GetUserIdProps = {
  userId: string;
};

export type GetProfileProps = {
  userId: string;
};

export type ProfileProps = {
  user_id: string;
  name: string;
  current_points: number;
  all_points: number;
};

export type ProfilePoints = {
  current_points?: number;
  all_points?: number;
};

type PointsType = typeof CURRENT_POINTS | typeof ALL_POINTS;

export type PointsUpdateProps = {
  pointsValue: number;
  pointsType: PointsType;
};

type Awards = typeof REWARDS | typeof COLLECTED_REWARDS;

export type TooltipMessageName = GroupName | Awards;
export type TooltipMessages = Record<TooltipMessageName, string>;

export type Reward = {
  id: number;
  user_id: string;
  name: string;
  points: number;
  active: boolean;
};

export type NewReward = Omit<Reward, "id">;

export type Rewards = Reward[];

export type Log = {
  id: string;
  created_at: string;
  user_id: string;
  actions: Log_Action[];
};

export type Logs = Log[];

export type CreateLog = Omit<Log, "id" | "created_at">;

export type UpdateLog = Omit<Log, "created_at">;
