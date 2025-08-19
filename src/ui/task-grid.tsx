import { useEffect, useState } from "react";
import { TaskElement } from "./task-element";
import type { Tasks } from "../constants/types";

const dummyData: Tasks = [
  { id: 1, group: "do", name: "Task name 1", active: true },
  { id: 2, group: "do", name: "Task name 2", active: true },
  { id: 3, group: "do", name: "Task name 3", active: false },
  { id: 4, group: "do", name: "Task name 4", active: true },

  { id: 5, group: "decide", name: "Task name 5", active: true },
  { id: 6, group: "decide", name: "Task name 6", active: false },
  { id: 7, group: "decide", name: "Task name 7", active: true },
  { id: 8, group: "decide", name: "Task name 8", active: true },
  { id: 9, group: "decide", name: "Task name 9", active: false },

  { id: 10, group: "delegate", name: "Task name 10", active: true },
  { id: 11, group: "delegate", name: "Task name 11", active: true },
  { id: 12, group: "delegate", name: "Task name 12", active: false },
  { id: 13, group: "delegate", name: "Task name 13", active: true },
  { id: 14, group: "delegate", name: "Task name 14", active: true },
  { id: 15, group: "delegate", name: "Task name 15", active: false },

  { id: 16, group: "delete", name: "Task name 16", active: true },
  { id: 17, group: "delete", name: "Task name 17", active: false },
  { id: 18, group: "delete", name: "Task name 18", active: true },
  { id: 19, group: "delete", name: "Task name 19", active: true },
  { id: 20, group: "delete", name: "Task name 20", active: false },
  { id: 21, group: "delete", name: "Task name 21", active: true },
  { id: 22, group: "delete", name: "Task name 22", active: true },
  { id: 23, group: "delete", name: "Task name 23", active: false },
  { id: 24, group: "delete", name: "Task name 24", active: true },
];

export const TaskGrid = () => {
  const [data, setData] = useState<Tasks>([]);

  useEffect(() => {
    setData(dummyData);
  }, []);

  const doTasks = data.filter((task) => task.group === "do");
  const decideTasks = data.filter((task) => task.group === "decide");
  const delegateTasks = data.filter((task) => task.group === "delegate");
  const deleteTasks = data.filter((task) => task.group === "delete");

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-10">
      <TaskElement title="do" description="it now" tasks={doTasks} />
      <TaskElement
        title="decide"
        description="when to do it"
        tasks={decideTasks}
      />
      <TaskElement
        title="delegate"
        description="who can do it for you?"
        tasks={delegateTasks}
      />
      <TaskElement
        title="delete"
        description="don't do it"
        tasks={deleteTasks}
      />
    </div>
  );
};
