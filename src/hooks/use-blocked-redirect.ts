import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { sidebarElements } from "../constants/sidebar-elements";
import { URL_MY_TASKS_PAGE } from "../constants/constants";

export const useBlockedRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;

  useEffect(() => {
    const isPathDisabled = sidebarElements.find(
      (element) => element.url === currentPathname
    )?.disabled;
    if (isPathDisabled) {
      navigate(`/${URL_MY_TASKS_PAGE}`);
    }
  }, [currentPathname, navigate]);
};
