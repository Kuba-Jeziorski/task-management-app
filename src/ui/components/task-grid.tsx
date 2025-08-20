import { TaskGroup } from "./task-group";
import {
  GROUP_DECIDE,
  GROUP_DECIDE_DESCRIPTION,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DELETE_DESCRIPTION,
  GROUP_DO,
  GROUP_DO_DESCRIPTION,
} from "../../constants/constants";
import { useTaskContext } from "../../contexts/helpers/use-task-context";

export const TaskGrid = () => {
  const { data } = useTaskContext();

  const doTasks = data.filter((task) => task.group === GROUP_DO);
  const decideTasks = data.filter((task) => task.group === GROUP_DECIDE);
  const delegateTasks = data.filter((task) => task.group === GROUP_DELEGATE);
  const deleteTasks = data.filter((task) => task.group === GROUP_DELETE);

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-10">
      <TaskGroup
        title={GROUP_DO}
        description={GROUP_DO_DESCRIPTION}
        tasks={doTasks}
      />
      <TaskGroup
        title={GROUP_DECIDE}
        description={GROUP_DECIDE_DESCRIPTION}
        tasks={decideTasks}
      />
      <TaskGroup
        title={GROUP_DELEGATE}
        description={GROUP_DELETE_DESCRIPTION}
        tasks={delegateTasks}
      />
      <TaskGroup
        title={GROUP_DELETE}
        description={GROUP_DELETE_DESCRIPTION}
        tasks={deleteTasks}
      />
    </div>
  );
};
