import type {
  CONFIRMATION,
  EDIT,
  GROUP_DECIDE,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DO,
  NEW,
  REMOVE,
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
