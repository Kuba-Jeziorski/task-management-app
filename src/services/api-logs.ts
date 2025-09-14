import type {
  CreateLog,
  GetUserIdProps,
  Logs,
  UpdateLog,
} from "../constants/types";
import supabase from "./supabase-config";

export const getLogs = async (userId: GetUserIdProps): Promise<Logs> => {
  try {
    const { data, error } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", userId);
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

export const createLog = async (log: CreateLog) => {
  try {
    const { error } = await supabase.from("logs").insert(log);
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

export const updateLog = async (log: UpdateLog) => {
  try {
    const { data, error } = await supabase
      .from("logs")
      .update(log)
      .eq("id", log.id)
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
