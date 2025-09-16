import { useForm, type FieldValues } from "react-hook-form";
import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import { useChangePassword } from "../../hooks/use-update-user";
import {
  APPLY_CHANGES,
  EMAIL_ADDRESS_PLACEHOLDER,
  LOG_NAME_UPDATE,
  LOG_PASSWORD_UPDATE,
  PASSWORD_REPEAT,
  USER_FORM_TYPE_FULLNAME,
  USER_FORM_TYPE_PASSWORD,
} from "../../constants/constants";
import type { UpdateLog, UpdateUserPassword } from "../../constants/types";
import { useUser } from "../../hooks/use-user";
import { useUpdateProfileName } from "../../hooks/use-update-profile";
import { useProfile } from "../../hooks/use-profile";
import { useLogs } from "../../hooks/use-logs";
import type {
  Log_NameUpdate,
  Log_PasswordUpdate,
} from "../../constants/log-action-variants";
import { useUpdateLog } from "../../hooks/use-update-log";

type Props = {
  type: typeof USER_FORM_TYPE_FULLNAME | typeof USER_FORM_TYPE_PASSWORD;
};

export const UserUpdateForm = ({ type }: Props) => {
  const { passwordChange, isPending } = useChangePassword();
  const { updateProfileName, isUpdating } = useUpdateProfileName();
  const { profile } = useProfile();
  const { user } = useUser();
  const { updateLog } = useUpdateLog();
  const { latestLog } = useLogs();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const lastActionId = latestLog?.actions.at(-1)?.id ?? 0;
  const newActions: UpdateLog["actions"] = [];

  const onSubmit = (values: FieldValues) => {
    if (type === USER_FORM_TYPE_FULLNAME) {
      const newName = values.fullName;
      updateProfileName(newName);

      if (latestLog) {
        newActions.push({
          id: lastActionId + 1,
          type: LOG_NAME_UPDATE,
          prevName: profile.name,
          newName: newName,
        } as Log_NameUpdate);
      }
    }

    if (type === USER_FORM_TYPE_PASSWORD) {
      const newPassword: UpdateUserPassword = { password: values.password };
      passwordChange(newPassword);

      if (latestLog) {
        newActions.push({
          id: lastActionId + 1,
          type: LOG_PASSWORD_UPDATE,
        } as Log_PasswordUpdate);
      }
    }

    if (latestLog && newActions.length > 0) {
      updateLog({
        ...latestLog,
        actions: [...latestLog.actions, ...newActions],
      });
    }
  };

  const userEmail = user?.email ?? EMAIL_ADDRESS_PLACEHOLDER;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {type === USER_FORM_TYPE_FULLNAME && (
        <InputWrapper
          label="Change your name"
          error={errors.fullName?.message as string | undefined}
        >
          <Input
            type="text"
            id="fullName"
            placeholder="Full name"
            autoComplete="username"
            {...register("fullName", { minLength: 2 })}
          />
        </InputWrapper>
      )}

      {type === USER_FORM_TYPE_PASSWORD && (
        <>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={userEmail}
            readOnly
            hidden
          />
          <InputWrapper
            label="New password"
            error={errors.password?.message as string | undefined}
          >
            <Input
              type="password"
              id="password"
              placeholder="New password"
              autoComplete="new-password"
              {...register("password", { minLength: 8 })}
            />
          </InputWrapper>
          <InputWrapper
            label={PASSWORD_REPEAT}
            error={errors?.passwordConfirm?.message as string | undefined}
          >
            <Input
              type="password"
              id="passwordConfirm"
              disabled={isPending || isUpdating}
              placeholder="placeholder"
              autoComplete="current-password"
              {...register("passwordConfirm", {
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </InputWrapper>
        </>
      )}

      <div className="flex">
        <Button
          variant="primary"
          type="submit"
          disabled={isPending || isUpdating}
          className="uppercase"
        >
          {APPLY_CHANGES}
        </Button>
      </div>
    </form>
  );
};
