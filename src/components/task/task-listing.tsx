import type { Tasks } from "../../constants/types";
import { TaskListingElement } from "./task-listing-element";

type Props = {
  tasks: Tasks;
};

export const TaskListing = ({ tasks }: Props) => {
  return (
    <ul className="flex flex-col pr-3">
      {tasks?.map((task) => (
        <TaskListingElement task={task} key={task.id} />
      ))}
    </ul>
  );
};
