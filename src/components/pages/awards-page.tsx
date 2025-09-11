import {
  ADD_NEW_REWARD,
  COLLECTED_REWARDS,
  COLLECTED_REWARDS_TITLE,
  NEW_REWARD,
  REWARDS,
  REWARDS_TITLE,
} from "../../constants/constants";
import { tooltipMessages } from "../../constants/tooltip-messages";
import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";
import { CustomTooltip } from "../tooltip/custom-tooltip";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { useState } from "react";
import { Dialog } from "../dialog/dialog";
import { AddNewRow } from "../ui/add-new-row";

export const AwardsPage = () => {
  useBlockedRedirect();

  const [isOpen, setIsOpen] = useState(false);

  const { setDialogType } = useGlobalContext();

  const handleOpen = () => {
    setIsOpen(true);
    setDialogType(NEW_REWARD);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full flex gap-10">
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
              <AddNewRow title={ADD_NEW_REWARD} openFn={handleOpen} />
              {/* <TaskListing tasks={active} /> */}
              Rewards listing
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
          <div className="flex-1 flex flex-col p-3 h-1/2 min-h-0">
            collected rewards listing
          </div>
        </div>
      </div>
      {isOpen && <Dialog closeFn={handleClose}>Adding a new reward</Dialog>}
    </>
  );
};
