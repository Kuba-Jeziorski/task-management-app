import { useContext } from "react";
import { TaskContext } from "../task";

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error("TaskContext was used outside of TaskContextProvider");
  }

  return context;
};
