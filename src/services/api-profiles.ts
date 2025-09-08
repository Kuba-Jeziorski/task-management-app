import supabase from "./supabase-config";

import {
  BASE_ALL_POINTS,
  BASE_CURRENT_POINTS,
  EXPECTED_LOGGED_IN_USER,
  USER_NAME_PLACEHOLDER,
} from "../constants/constants";
import type { ProfileProps } from "../constants/types";
import { getCurrentUser } from "../hooks/get-current-user";

export const createProfile = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error(EXPECTED_LOGGED_IN_USER);
  }

  const newProfile: ProfileProps = {
    user_id: user.id,
    name: user.user_metadata.fullName ?? USER_NAME_PLACEHOLDER,
    all_points: BASE_ALL_POINTS,
    current_points: BASE_CURRENT_POINTS,
  };

  try {
    const { error } = await supabase
      .from("profiles")
      .insert([newProfile])
      .select();
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

// use this for profile's name change
export const updateProfileName = async (fullName: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error(EXPECTED_LOGGED_IN_USER);
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ name: fullName })
      .eq("user_id", user.id)
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
