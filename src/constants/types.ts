import type {
  GROUP_DECIDE,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DO,
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
