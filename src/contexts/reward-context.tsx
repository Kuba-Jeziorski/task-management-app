import { useState } from "react";
import { RewardContext } from "./reward";

type Props = {
  children: React.ReactNode;
};

export const RewardContextProvider = ({ children }: Props) => {
  const [currentRewardId, setCurrentRewardId] = useState<number | null>(null);

  return (
    <RewardContext.Provider
      value={{
        currentRewardId,
        setCurrentRewardId,
      }}
    >
      {children}
    </RewardContext.Provider>
  );
};
