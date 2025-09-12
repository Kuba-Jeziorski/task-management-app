import { useRewards } from "../../hooks/use-rewards";
import { Spinner } from "../spinner/the-spinner";
import { RewardListingElement } from "./reward-listing-element";

export const RewardsListing = () => {
  const { rewards = [], isLoading } = useRewards();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="flex flex-col pr-3">
          {rewards.map((reward) => (
            <RewardListingElement reward={reward} key={reward.id} />
          ))}
        </ul>
      )}
    </>
  );
};
