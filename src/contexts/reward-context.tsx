import { useState } from "react";
import { RewardContext } from "./reward";

type Props = {
  children: React.ReactNode;
};

export const RewardContextProvider = ({ children }: Props) => {
  const [currentReward, setCurrentReward] = useState<number | null>(null);

  return (
    <RewardContext.Provider
      value={{
        currentReward,
        setCurrentReward,
      }}
    >
      {children}
    </RewardContext.Provider>
  );
};
