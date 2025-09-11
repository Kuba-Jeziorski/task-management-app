import { EXPECTED_LOGGED_IN_USER } from "../constants/constants";
import { getCurrentUser } from "../hooks/get-current-user";
import supabase from "./supabase-config";

export const getRewards = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error(EXPECTED_LOGGED_IN_USER);
  }

  try {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("user_id", user.id);
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
type Reward = {
  id: number; // from db
  user_id: string;
  name: string;
  points: number;
  active: boolean;
};
export const createReward = async (
  reward: Omit<Reward, "id">
): Promise<void> => {
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

export const updateReward = async (reward: Reward): Promise<Reward | null> => {
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
