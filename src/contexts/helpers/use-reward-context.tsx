import { useContext } from "react";

import { RewardContext } from "../reward";
import { REWARD_CONTEXT_ERROR } from "../../constants/constants";

export const useRewardContext = () => {
  const context = useContext(RewardContext);

  if (context === undefined) {
    throw new Error(REWARD_CONTEXT_ERROR);
  }

  return context;
};
