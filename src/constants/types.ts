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
