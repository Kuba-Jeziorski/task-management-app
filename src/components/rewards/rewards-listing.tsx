import { Gem } from "lucide-react";
import { useRewards } from "../../hooks/use-rewards";
import { Spinner } from "../spinner/the-spinner";
import { GET_IT_NOW } from "../../constants/constants";
import { cn } from "../../utils/css";

export const RewardsListing = () => {
  const { rewards = [], isLoading } = useRewards();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="flex flex-col pr-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="w-full flex items-center justify-between gap-3 h-[52px] p-2 border-b border-b-tma-light-300 border-tma-light-200"
            >
              <p className="text-[18px] text-tma-blue-200 font-extrabold leading-none line-clamp-1">
                {reward.name}
              </p>
              <div className="flex items-center gap-3 min-w-50">
                <div className="flex items-center gap-[6px]">
                  <p className="text-[18px] text-tma-blue-200 font-semibold leading-none">
                    {reward.points}
                  </p>
                  <span className="text-tma-blue-200">
                    <Gem size={24} />
                  </span>
                </div>
                <button
                  className={cn(
                    "h-8 px-4 rounded-full bg-tma-blue-200 cursor-pointer text-[18px] text-tma-light-100 font-semibold leading-none transition-all duration-300",
                    "hover:bg-tma-blue-100"
                  )}
                >
                  {GET_IT_NOW}
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};
