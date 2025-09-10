import { useForm, type FieldValues } from "react-hook-form";
import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import { useChangePassword } from "../../hooks/use-update-user";
import {
  APPLY_CHANGES,
  EMAIL_ADDRESS_PLACEHOLDER,
  PASSWORD_REPEAT,
  USER_FORM_TYPE_FULLNAME,
  USER_FORM_TYPE_PASSWORD,
} from "../../constants/constants";
import type { UpdateUserPassword } from "../../constants/types";
import { useUser } from "../../hooks/use-user";
import { useUpdateProfileName } from "../../hooks/use-updated-profile";

type Props = {
  type: typeof USER_FORM_TYPE_FULLNAME | typeof USER_FORM_TYPE_PASSWORD;
};

export const UserUpdateForm = ({ type }: Props) => {
  const { passwordChange, isPending } = useChangePassword();
  const { updateProfileName, isUpdating } = useUpdateProfileName();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (values: FieldValues) => {
    if (type === USER_FORM_TYPE_FULLNAME) {
      const newName = values.fullName;
      updateProfileName(newName);
    }

    if (type === USER_FORM_TYPE_PASSWORD) {
      const newPassword: UpdateUserPassword = { password: values.password };
      passwordChange(newPassword);
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
