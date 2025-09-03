import supabase from "./supabase-config";

import type { NewTask, Task } from "../constants/types";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const createTask = async (task: NewTask): Promise<void> => {
  try {
    const { error } = await supabase.from("tasks").insert(task);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const updateTask = async (task: Task): Promise<Task | null> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(task)
      .eq("id", task.id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const removeTask = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
