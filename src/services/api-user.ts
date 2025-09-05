import type {
  LoginProps,
  PartialSignupProps,
  UpdateUserPayload,
} from "../constants/types";
import supabase from "./supabase-config";

export const signup = async ({
  fullName,
  email,
  password,
}: PartialSignupProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const { data, error } = await supabase.auth.updateUser(payload);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
