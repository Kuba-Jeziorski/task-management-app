import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import {
  CANCEL,
  EDIT_REWARD,
  LOG_ADD_REWARD,
  LOG_EDIT_REWARD_NAME,
  LOG_EDIT_REWARD_POINTS,
  NEW_REWARD,
  REQUIRED_FIELD,
} from "../../constants/constants";
import type { NewReward, Reward, UpdateLog } from "../../constants/types";
import { useProfile } from "../../hooks/use-profile";
import { useCreateReward } from "../../hooks/use-create-reward";
import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import { useUpdateReward } from "../../hooks/use-update-reward";
import { useRewards } from "../../hooks/use-rewards";
import { useRewardContext } from "../../contexts/helpers/use-reward-context";
import { useUpdateLog } from "../../hooks/use-update-log";
import { useLogs } from "../../hooks/use-logs";
import type {
  Log_AddReward,
  Log_EditRewardName,
  Log_EditRewardPoints,
} from "../../constants/log-action-variants";

type FormValues = {
  rewardName: string;
  points: number;
};

export const RewardForm = () => {
  const { profile } = useProfile();
  const userId = profile?.user_id;

  const { dialogType, setDialogType } = useGlobalContext();

  const { rewards = [] } = useRewards();
  const { createReward, isPending: isCreating } = useCreateReward();
  const { updateReward, isPending: isEditing } = useUpdateReward();
  const { currentRewardId } = useRewardContext();

  const { updateLog } = useUpdateLog();
  const { latestLog } = useLogs();

  const isNewForm = dialogType === NEW_REWARD;
  const isEditForm = dialogType === EDIT_REWARD;

  const rewardToEdit: Reward =
    isEditForm && currentRewardId
      ? rewards.find((element) => element.id === currentRewardId)
      : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      rewardName: rewardToEdit?.name ?? "",
      points: rewardToEdit?.points ?? 0,
    },
  });

  useEffect(() => {
    if (isEditForm && rewardToEdit) {
      reset({ rewardName: rewardToEdit.name, points: rewardToEdit.points });
    }
  }, [isEditForm, rewardToEdit, reset]);

  const closeForm = useCallback(() => {
    reset();
    setDialogType(null);
  }, [reset, setDialogType]);

  const onSubmit = (data: FormValues) => {
    if (isNewForm) {
      const newReward: NewReward = {
        user_id: userId,
        name: data.rewardName,
        points: data.points,
        active: true,
      };

      if (latestLog !== undefined) {
        const lastId = latestLog.actions.at(-1)?.id ?? 0;
        const newRewardAction: Log_AddReward = {
          id: lastId + 1,
          name: LOG_ADD_REWARD,
          title: data.rewardName,
          points: data.points,
        };

        const updatedLog: UpdateLog = {
          ...latestLog,
          actions: [...latestLog.actions, newRewardAction],
        };

        updateLog(updatedLog);
      }

      createReward(newReward);
    }

    if (isEditForm && currentRewardId != null) {
      if (rewardToEdit) {
        const updatedReward: Reward = {
          ...rewardToEdit,
          name: data.rewardName,
          points: data.points,
        };

        if (latestLog !== undefined) {
          if (
            data.rewardName !== rewardToEdit.name &&
            data.points === rewardToEdit.points
          ) {
            const lastId = latestLog.actions.at(-1)?.id ?? 0;
            const rewardNameChangeAction: Log_EditRewardName = {
              id: lastId + 1,
              name: LOG_EDIT_REWARD_NAME,
              prevName: rewardToEdit.name,
              newName: data.rewardName,
            };

            const updatedLog: UpdateLog = {
              ...latestLog,
              actions: [...latestLog.actions, rewardNameChangeAction],
            };

            updateLog(updatedLog);
          }
          if (
            data.rewardName === rewardToEdit.name &&
            data.points !== rewardToEdit.points
          ) {
            const lastId = latestLog.actions.at(-1)?.id ?? 0;
            const rewardPointsChangeAction: Log_EditRewardPoints = {
              id: lastId + 1,
              name: LOG_EDIT_REWARD_POINTS,
              title: rewardToEdit.name,
              prevPoints: rewardToEdit.points,
              newPoints: data.points,
            };

            const updatedLog: UpdateLog = {
              ...latestLog,
              actions: [...latestLog.actions, rewardPointsChangeAction],
            };

            updateLog(updatedLog);
          }
          if (
            data.rewardName !== rewardToEdit.name &&
            data.points !== rewardToEdit.points
          ) {
            const lastId = latestLog.actions.at(-1)?.id ?? 0;
            const rewardNameChangeAction: Log_EditRewardName = {
              id: lastId + 1,
              name: LOG_EDIT_REWARD_NAME,
              prevName: rewardToEdit.name,
              newName: data.rewardName,
            };
            const rewardPointsChangeAction: Log_EditRewardPoints = {
              id: lastId + 2,
              name: LOG_EDIT_REWARD_POINTS,
              title: data.rewardName,
              prevPoints: rewardToEdit.points,
              newPoints: data.points,
            };

            const updatedLog: UpdateLog = {
              ...latestLog,
              actions: [
                ...latestLog.actions,
                rewardNameChangeAction,
                rewardPointsChangeAction,
              ],
            };

            updateLog(updatedLog);
          }
        }

        updateReward(updatedReward);
      }
    }

    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <InputWrapper
            label="New reward name"
            error={errors?.rewardName?.message}
          >
            <Input
              type="text"
              id="rewardName"
              placeholder="placeholder"
              {...register("rewardName", {
                required: REQUIRED_FIELD,
              })}
            />
          </InputWrapper>
          <InputWrapper
            label="Reward value"
            error={errors?.rewardName?.message}
          >
            <Input
              type="number"
              id="points"
              placeholder="placeholder"
              {...register("points", {
                required: REQUIRED_FIELD,
              })}
            />
          </InputWrapper>
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            variant={"secondary"}
            type="reset"
            onClick={closeForm}
            className="uppercase"
            disabled={isCreating || isEditing}
          >
            {CANCEL}
          </Button>
          <Button
            variant={"primary"}
            type="submit"
            className="uppercase"
            disabled={isCreating || isEditing}
          >
            SAVE REWARD
          </Button>
        </div>
      </div>
    </form>
  );
};
