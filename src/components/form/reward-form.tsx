import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import {
  CANCEL,
  EDIT_REWARD,
  NEW_REWARD,
  REQUIRED_FIELD,
} from "../../constants/constants";
import type { NewReward, Reward } from "../../constants/types";
import { useProfile } from "../../hooks/use-profile";
import { useCreateReward } from "../../hooks/use-create-reward";
import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import { useUpdateReward } from "../../hooks/use-update-reward";
import { useRewards } from "../../hooks/use-rewards";
import { useRewardContext } from "../../contexts/helpers/use-reward-context";

type FormValues = {
  rewardName: string;
  points: number;
};

export const RewardForm = () => {
  const { profile } = useProfile();
  const userId = profile?.user_id;

  const { dialogType, setDialogType } = useGlobalContext();

  const { createReward, isPending: isCreating } = useCreateReward();
  const { updateReward, isPending: isEditing } = useUpdateReward();
  const { rewards = [] } = useRewards();
  const { currentRewardId } = useRewardContext();

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

      createReward(newReward);
    }

    if (isEditForm && currentRewardId != null) {
      if (rewardToEdit) {
        const updatedReward: Reward = {
          ...rewardToEdit,
          name: data.rewardName,
          points: data.points,
        };
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
