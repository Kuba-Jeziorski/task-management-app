import { useContext } from "react";

import { TaskContext } from "../task";
import { TASK_CONTEXT_ERROR } from "../../constants/constants";

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error(TASK_CONTEXT_ERROR);
  }

  return context;
};
