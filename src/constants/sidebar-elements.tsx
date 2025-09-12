import { Grid2X2Check, LibraryBig, Trophy, User } from "lucide-react";

import type { SidebarElements } from "./types";
import {
  SIDEBAR_ABOUT_PAGE_NAME,
  SIDEBAR_AWARDS_PAGE_NAME,
  SIDEBAR_MY_TASKS_PAGE_NAME,
  SIDEBAR_USER_PAGE_NAME,
  URL_ABOUT_PAGE,
  URL_AWARDS_PAGE,
  URL_MY_TASKS_PAGE,
  URL_USER_PAGE,
} from "./constants";

export const sidebarElements: SidebarElements = [
  {
    icon: <Grid2X2Check size={36} />,
    url: `/${URL_MY_TASKS_PAGE}`,
    name: SIDEBAR_MY_TASKS_PAGE_NAME,
    disabled: false,
  },
  {
    icon: <Trophy size={36} />,
    url: `/${URL_AWARDS_PAGE}`,
    name: SIDEBAR_AWARDS_PAGE_NAME,
    disabled: false,
  },
  {
    icon: <LibraryBig size={36} />,
    url: `/${URL_ABOUT_PAGE}`,
    name: SIDEBAR_ABOUT_PAGE_NAME,
    disabled: false,
  },
  {
    icon: <User size={36} />,
    url: `/${URL_USER_PAGE}`,
    name: SIDEBAR_USER_PAGE_NAME,
    disabled: false,
  },
];
