import { createContext } from "react";

type RewardContextProps = {
  currentReward: number | null;
  setCurrentReward: React.Dispatch<React.SetStateAction<number | null>>;
};

export const RewardContext = createContext<RewardContextProps | undefined>(
  undefined
);
