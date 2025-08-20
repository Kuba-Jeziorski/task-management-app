import { CalendarClock, Grid2X2Check, Trophy } from "lucide-react";

import type { SidebarElements } from "./types";

export const sidebarElements: SidebarElements = [
  {
    icon: <Grid2X2Check size={36} />,
    url: "/my-tasks",
    name: "my tasks",
  },
  {
    icon: <Trophy size={36} />,
    url: "/awards",
    name: "awards",
  },
  {
    icon: <CalendarClock size={36} />,
    url: "/my-day",
    name: "my day",
  },
];
