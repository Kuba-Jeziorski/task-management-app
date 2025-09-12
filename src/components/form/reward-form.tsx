import { useForm } from "react-hook-form";
import { useCallback } from "react";

import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { CANCEL, NEW_REWARD, REQUIRED_FIELD } from "../../constants/constants";
import type { NewReward } from "../../constants/types";
import { useProfile } from "../../hooks/use-profile";
import { useCreateReward } from "../../hooks/use-create-reward";
import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";

type FormValues = {
  rewardName: string;
  points: number;
};

export const RewardForm = () => {
  const { profile } = useProfile();
  const userId = profile?.user_id;

  const { dialogType, setDialogType } = useGlobalContext();

  const { createReward, isPending } = useCreateReward();

  const isNewForm = dialogType === NEW_REWARD;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const closeForm = useCallback(() => {
    reset();
    setDialogType(null);
  }, [reset, setDialogType]);

  const onSubmit = (data: FormValues) => {
    if (isNewForm) {
      const newReward: NewReward = {
        user_id: userId,
        name: data.rewardName, // input
        points: data.points, // input
        active: true,
      };

      createReward(newReward);
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
          >
            {CANCEL}
          </Button>
          <Button
            variant={"primary"}
            type="submit"
            className="uppercase"
            disabled={isPending}
          >
            SAVE REWARD
          </Button>
        </div>
      </div>
    </form>
  );
};
