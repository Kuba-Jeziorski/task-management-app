import {
  ADD_NEW_REWARD,
  COLLECTED_REWARDS,
  COLLECTED_REWARDS_TITLE,
  CONFIRMATION,
  EDIT_REWARD,
  EDITING,
  LOG_REMOVE_REWARD,
  NEW_REWARD,
  REMOVE_NO,
  REMOVE_YES,
  REMOVING,
  REWARD_REMOVING,
  REWARD_TITLE,
  REWARDS,
  REWARDS_TITLE,
} from "../../constants/constants";
import { tooltipMessages } from "../../constants/tooltip-messages";
import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";
import { CustomTooltip } from "../tooltip/custom-tooltip";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { Dialog } from "../dialog/dialog";
import { useRewardContext } from "../../contexts/helpers/use-reward-context";
import { AddNewRow } from "../ui/add-new-row";
import { lazy, Suspense } from "react";
import { Spinner } from "../spinner/the-spinner";
import { useRewards } from "../../hooks/use-rewards";
import type { Reward, UpdateLog } from "../../constants/types";
import { Button } from "../button/button";
import { useRemoveReward } from "../../hooks/use-remove-reward";
import { useUpdateLog } from "../../hooks/use-update-log";
import { useLogs } from "../../hooks/use-logs";
import type { Log_RemoveReward } from "../../constants/log-action-variants";

const RewardsListing = lazy(() =>
  import("../rewards/rewards-listing").then((module) => ({
    default: module.RewardsListing,
  }))
);
const RewardForm = lazy(() =>
  import("../form/reward-form").then((module) => ({
    default: module.RewardForm,
  }))
);

export const AwardsPage = () => {
  useBlockedRedirect();

  const { dialogType, setDialogType, setIsDropdownOpen } = useGlobalContext();
  const { currentRewardId, setCurrentRewardId } = useRewardContext();
  const { rewards = [] } = useRewards();
  const { removeReward } = useRemoveReward();

  const { updateLog } = useUpdateLog();
  const { latestLog } = useLogs();

  const handleCloseDialog = () => {
    setDialogType(null);
    setCurrentRewardId(null);
  };

  const handleNewRow = () => {
    setIsDropdownOpen(false);
    setDialogType(NEW_REWARD);
  };

  const selectedReward: Reward | null = currentRewardId
    ? rewards.find((r) => r.id === currentRewardId) ?? null
    : null;

  const lastActionId = latestLog?.actions.at(-1)?.id ?? 0;
  const newActions: UpdateLog["actions"] = [];

  const handleRemoveReward = async (id: number) => {
    if (currentRewardId) {
      if (latestLog !== undefined) {
        newActions.push({
          id: lastActionId + 1,
          type: LOG_REMOVE_REWARD,
          name: selectedReward?.name,
          points: selectedReward?.points,
        } as Log_RemoveReward);
      }

      removeReward(id);
    }

    if (latestLog && newActions.length > 0) {
      updateLog({
        ...latestLog,
        actions: [...latestLog.actions, ...newActions],
      });
    }

    handleCloseDialog();
  };

  const isDialogOpen =
    dialogType === NEW_REWARD ||
    (dialogType === EDIT_REWARD && currentRewardId) ||
    (dialogType === CONFIRMATION && currentRewardId);

  return (
    <>
      <div className="w-full flex gap-10 h-full">
        <div className="w-3/5 h-full bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
          <div className="bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center px-5 py-4">
            <CustomTooltip title={tooltipMessages[REWARDS]}>
              <div className="flex flex-col text-tma-blue-200 uppercase">
                <p className="font-black text-2xl">{REWARDS_TITLE}</p>
              </div>
            </CustomTooltip>
          </div>
          <div className="flex-1 flex flex-col p-3 h-1/2 min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <AddNewRow title={ADD_NEW_REWARD} openFn={handleNewRow} />
              <Suspense fallback={<Spinner />}>
                <RewardsListing isActive={true} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
          <div className="bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center px-5 py-4">
            <CustomTooltip title={tooltipMessages[COLLECTED_REWARDS]}>
              <div className="flex flex-col text-tma-blue-200 uppercase">
                <p className="font-black text-2xl">{COLLECTED_REWARDS_TITLE}</p>
              </div>
            </CustomTooltip>
          </div>
          <div className="flex-1 flex flex-col p-3 h-1/2 min-h-0 overflow-auto">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <Suspense fallback={<Spinner />}>
                <RewardsListing isActive={false} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <Dialog closeFn={handleCloseDialog}>
          <div className="flex gap-3 flex-col">
            {dialogType === NEW_REWARD && (
              <>
                <p className="title text-lg text-tma-blue-200">
                  {REWARD_TITLE}
                </p>
                <Suspense fallback={<Spinner />}>
                  <RewardForm />
                </Suspense>
              </>
            )}
            {dialogType === EDIT_REWARD && (
              <>
                <p className="title text-lg text-tma-blue-200">
                  {EDITING}{" "}
                  <span className="font-black uppercase">
                    {selectedReward?.name}
                  </span>
                </p>
                <Suspense fallback={<Spinner />}>
                  <RewardForm />
                </Suspense>
              </>
            )}
            {dialogType === CONFIRMATION && (
              <div className="flex flex-col gap-4">
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {`${REMOVING}: `}
                  <span className="font-black">{selectedReward?.name}</span>
                </p>
                <p>{REWARD_REMOVING}</p>
                <div className="flex gap-4">
                  {selectedReward && (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveReward(selectedReward.id)}
                    >
                      {REMOVE_YES}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={handleCloseDialog}
                    className="uppercase"
                  >
                    {REMOVE_NO}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
};
