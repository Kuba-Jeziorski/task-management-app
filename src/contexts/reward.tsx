import { createContext } from "react";

type RewardContextProps = {
  currentRewardId: number | null;
  setCurrentRewardId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const RewardContext = createContext<RewardContextProps | undefined>(
  undefined
);
