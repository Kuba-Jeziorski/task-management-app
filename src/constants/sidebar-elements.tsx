import {
  CalendarClock,
  Grid2X2Check,
  LibraryBig,
  Trophy,
  User,
} from "lucide-react";

import type { SidebarElements } from "./types";

export const sidebarElements: SidebarElements = [
  {
    icon: <Grid2X2Check size={36} />,
    url: "/my-tasks",
    name: "my tasks",
    disabled: false,
  },
  {
    icon: <Trophy size={36} />,
    url: "/awards",
    name: "awards",
    disabled: true,
  },
  {
    icon: <CalendarClock size={36} />,
    url: "/my-day",
    name: "my day",
    disabled: true,
  },
  {
    icon: <LibraryBig size={36} />,
    url: "/about",
    name: "about",
    disabled: true,
  },
  {
    icon: <User size={36} />,
    url: "/user",
    name: "user",
    disabled: false,
  },
];
