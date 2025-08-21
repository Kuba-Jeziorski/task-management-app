import type {
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
};

export type SidebarElements = SidebarElement[];

export type Task = {
  id: number;
  group: string;
  name: string;
  active: boolean;
};

export type Tasks = Task[];

export type GroupName =
  | typeof GROUP_DO
  | typeof GROUP_DECIDE
  | typeof GROUP_DELEGATE
  | typeof GROUP_DELETE;

type DropdownName = typeof EDIT | typeof REMOVE;

export type DropdownOptionElement = {
  icon: React.ReactNode;
  name: DropdownName;
  className: string;
};

export type DropdownOptionElements = DropdownOptionElement[];

export type FormType = typeof NEW | typeof EDIT;
