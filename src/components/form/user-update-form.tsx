import { useForm, type FieldValues } from "react-hook-form";
import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import { useUpdateUser } from "../../hooks/use-update-user";
import {
  APPLY_CHANGES,
  PASSWORD_REPEAT,
  USER_FORM_TYPE_FULLNAME,
  USER_FORM_TYPE_PASSWORD,
} from "../../constants/constants";
import type { UpdateUserPayload } from "../../constants/types";
import { useUser } from "../../hooks/use-user";

type Props = {
  type: typeof USER_FORM_TYPE_FULLNAME | typeof USER_FORM_TYPE_PASSWORD;
};

export const UserUpdateForm = ({ type }: Props) => {
  const { updateUser, isPending } = useUpdateUser();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (values: FieldValues) => {
    if (type === USER_FORM_TYPE_FULLNAME) {
      const payload: UpdateUserPayload = {
        data: { fullName: values.fullName },
      };
      updateUser(payload);
    }

    if (type === USER_FORM_TYPE_PASSWORD) {
      const payload: UpdateUserPayload = { password: values.password };
      updateUser(payload);
    }
  };

  const userEmail = user?.email ?? "placeholder@mail.com";

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
              disabled={isPending}
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
          disabled={isPending}
          className="uppercase"
        >
          {APPLY_CHANGES}
        </Button>
      </div>
    </form>
  );
};
