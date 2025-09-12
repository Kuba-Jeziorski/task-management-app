import { Gem } from "lucide-react";
import { cn } from "../../utils/css";

import type { Reward } from "../../constants/types";
import {
  CURRENT_POINTS,
  DROPDOWN_REWARD,
  GET_IT_NOW,
} from "../../constants/constants";
import { useProfile } from "../../hooks/use-profile";
import { useRewards } from "../../hooks/use-rewards";
import { useUpdateReward } from "../../hooks/use-update-reward";
import { usePoints } from "../../hooks/use-current-points";
import { Dropdown } from "../dropdown/dropdown";

type Props = {
  reward: Reward;
};

export const RewardListingElement = ({ reward }: Props) => {
  const {
    profile: { current_points },
  } = useProfile();

  const { rewards = [], isLoading } = useRewards();
  const { updateReward } = useUpdateReward();
  const { updatePoints, isUpdating } = usePoints();

  const handleChangeActive = async () => {
    const rewardToUpdate = rewards.find((element) => element.id === reward.id);

    if (rewardToUpdate) {
      const updatedReward: Reward = {
        ...rewardToUpdate,
        active: false,
      };

      updateReward(updatedReward);

      const pointsValue = reward.points * -1;

      updatePoints({ pointsValue, pointsType: CURRENT_POINTS });
    }
  };

  const isActive = reward.active;
  const isDisabled = current_points < reward.points;

  return (
    <div
      className={cn(
        "w-full group rounded-md flex h-[52px] px-2",
        "hover:bg-tma-light-200 "
      )}
    >
      <div className="flex h-full w-full border-b border-b-tma-light-300 items-center justify-between gap-3 py-2">
        <p
          className={cn(
            "text-[18px] leading-none line-clamp-1",
            isActive
              ? "text-tma-blue-200 font-extrabold"
              : "text-tma-light-600 font-semibold"
          )}
        >
          {reward.name}
        </p>
        <div className="flex items-center gap-3 min-w-50 justify-end">
          <div className="flex items-center gap-[6px]">
            <p className="text-[18px] text-tma-blue-200 font-semibold leading-none">
              {reward.points}
            </p>
            <span
              className={cn(
                isActive ? "text-tma-blue-200" : "text-tma-light-600"
              )}
            >
              <Gem size={24} />
            </span>
          </div>
          {isActive && (
            <button
              className={cn(
                "h-8 px-4 rounded-full bg-tma-blue-200 cursor-pointer text-[18px] text-tma-light-100 font-semibold leading-none transition-all duration-300",
                "not-disabled:hover:bg-tma-blue-100",
                "disabled:opacity-50 disabled:cursor-no-drop"
              )}
              onClick={() => handleChangeActive()}
              disabled={isDisabled || isLoading || isUpdating}
            >
              {GET_IT_NOW}
            </button>
          )}
          <Dropdown dropdownRecordType={DROPDOWN_REWARD} recordId={reward.id} />
        </div>
      </div>
    </div>
  );
};
