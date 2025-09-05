import {
  USER_FORM_LOGIN,
  USER_FORM_SIGNUP,
  type CONFIRMATION,
  type EDIT,
  type GROUP_DECIDE,
  type GROUP_DELEGATE,
  type GROUP_DELETE,
  type GROUP_DO,
  type NEW,
  type REMOVE,
} from "./constants";

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

type DropdownName = typeof EDIT | typeof REMOVE;

export type DropdownOptionElement = {
  icon: React.ReactNode;
  name: DropdownName;
  className: string;
};

export type DropdownOptionElements = DropdownOptionElement[];

export type DialogType = typeof NEW | typeof EDIT | typeof CONFIRMATION;

export type UserFormType = typeof USER_FORM_LOGIN | typeof USER_FORM_SIGNUP;

export type SignupProps = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type PartialSignupProps = Omit<SignupProps, "passwordConfirm">;

export type LoginProps = Omit<SignupProps, "fullName" | "passwordConfirm">;

export type UpdateUserPayload =
  | { password: string }
  | { data: { fullName: string } };

export type GetTasksProps = {
  userId: string;
};
