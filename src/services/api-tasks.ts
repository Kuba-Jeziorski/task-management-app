import supabase from "./supabase-config";

import type { Task } from "../constants/types";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error(`Supabase error: ${error.message}`);
      return [];
    }
    return data ?? [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Unexpected fetch error: ${error}`);
    } else {
      throw error;
    }
    return [];
  }
};

export const createTask = async (task: Omit<Task, "id">): Promise<void> => {
  try {
    const { error } = await supabase.from("tasks").insert(task);
    if (error) {
      console.log(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Unexpected fetch error: ${error}`);
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
      console.log(error.message);
      return null;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Unexpected fetch error: ${error}`);
    } else {
      throw error;
    }
    return null;
  }
};

export const removeTask = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.log(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Unexpected fetch error: ${error}`);
    } else {
      throw error;
    }
  }
};
