import { Grid2X2Check, LibraryBig, Trophy, User } from "lucide-react";

import type { SidebarElements } from "./types";
import {
  IS_ABOUT_PAGE_DISABLED,
  IS_AWARDS_PAGE_DISABLED,
  IS_MY_TASK_PAGE_DISABLED,
  IS_USER_PAGE_DISABLED,
  SIDEBAR_ABOUT_PAGE_NAME,
  SIDEBAR_AWARDS_PAGE_NAME,
  SIDEBAR_ICON_SIZE,
  SIDEBAR_MY_TASKS_PAGE_NAME,
  SIDEBAR_USER_PAGE_NAME,
  URL_ABOUT_PAGE,
  URL_AWARDS_PAGE,
  URL_MY_TASKS_PAGE,
  URL_USER_PAGE,
} from "./constants";

export const sidebarElements: SidebarElements = [
  {
    icon: <Grid2X2Check size={SIDEBAR_ICON_SIZE} />,
    url: `/${URL_MY_TASKS_PAGE}`,
    name: SIDEBAR_MY_TASKS_PAGE_NAME,
    disabled: IS_MY_TASK_PAGE_DISABLED,
  },
  {
    icon: <Trophy size={SIDEBAR_ICON_SIZE} />,
    url: `/${URL_AWARDS_PAGE}`,
    name: SIDEBAR_AWARDS_PAGE_NAME,
    disabled: IS_AWARDS_PAGE_DISABLED,
  },
  {
    icon: <LibraryBig size={SIDEBAR_ICON_SIZE} />,
    url: `/${URL_ABOUT_PAGE}`,
    name: SIDEBAR_ABOUT_PAGE_NAME,
    disabled: IS_ABOUT_PAGE_DISABLED,
  },
  {
    icon: <User size={SIDEBAR_ICON_SIZE} />,
    url: `/${URL_USER_PAGE}`,
    name: SIDEBAR_USER_PAGE_NAME,
    disabled: IS_USER_PAGE_DISABLED,
  },
];
