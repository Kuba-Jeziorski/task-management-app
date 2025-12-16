import type {
  GetUserIdProps,
  NewReward,
  Reward,
  Rewards,
} from "../constants/types";
import supabase from "./supabase-config";

export const getRewards = async (userId: GetUserIdProps): Promise<Rewards> => {
  try {
    const { data, error } = await supabase
      .from("rewards")
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

export const createReward = async (reward: NewReward): Promise<void> => {
  try {
    const { error } = await supabase.from("rewards").insert(reward);
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

export const updateReward = async (reward: Reward): Promise<Reward> => {
  try {
    const { data, error } = await supabase
      .from("rewards")
      .update(reward)
      .eq("id", reward.id)
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

export const removeReward = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from("rewards").delete().eq("id", id);
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
