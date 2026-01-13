import type { Rewards } from "../../constants/types";
import { useRewards } from "../../hooks/use-rewards";
import { Spinner } from "../spinner/the-spinner";
import { RewardsListingElement } from "./rewards-listing-element";

type Props = {
  isActive: boolean;
};

export const RewardsListing = ({ isActive }: Props) => {
  const { rewards: data = [], isLoading } = useRewards();

  const activeRewards: Rewards = [];
  const inactiveRewards: Rewards = [];

  data.forEach((reward) => {
    if (reward.active) {
      activeRewards.push(reward);
    } else {
      inactiveRewards.push(reward);
    }
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className="flex flex-col pr-3">
      {isActive
        ? activeRewards.map((reward) => (
            <RewardsListingElement reward={reward} key={reward.id} />
          ))
        : inactiveRewards.map((reward) => (
            <RewardsListingElement reward={reward} key={reward.id} />
          ))}
    </ul>
  );
};
