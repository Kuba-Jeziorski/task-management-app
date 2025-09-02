import {
  GROUP_DECIDE,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DO,
  TOOLTIP_DECIDE,
  TOOLTIP_DELEGATE,
  TOOLTIP_DELETE,
  TOOLTIP_DO,
} from "./constants";
import type { GroupName } from "./types";

export const tooltipMessages: Record<GroupName, string> = {
  [GROUP_DO]: TOOLTIP_DO,
  [GROUP_DECIDE]: TOOLTIP_DECIDE,
  [GROUP_DELEGATE]: TOOLTIP_DELEGATE,
  [GROUP_DELETE]: TOOLTIP_DELETE,
};
