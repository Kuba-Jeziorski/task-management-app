import { useContext } from "react";

import { RewardContext } from "../reward";

export const useRewardContext = () => {
  const context = useContext(RewardContext);

  if (context === undefined) {
    throw new Error("Reward context error");
  }

  return context;
};
