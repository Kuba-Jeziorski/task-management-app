import { useForm } from "react-hook-form";
import {
  CANCEL,
  EMAIL_ADDRESS,
  FULL_NAME,
  NON_VALID_EMAIL,
  PASSWORD,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REPEAT,
  REQUIRED_FIELD,
  SIGN_UP_MESSAGE,
  USER_FORM_LOGIN,
  USER_FORM_SIGNUP,
} from "../../constants/constants";
import { useSignUp } from "../../hooks/use-signup";
import type { SignupProps, UserFormType } from "../../constants/types";
import { InputWrapper } from "./input-wrapper";
import { Button } from "../button/button";
import { Input } from "./the-input";

type SignUpFormProps = {
  handleFormTypeChange: React.Dispatch<React.SetStateAction<UserFormType>>;
};

export const SignUpForm = ({ handleFormTypeChange }: SignUpFormProps) => {
  const { signUp, isPending } = useSignUp();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<SignupProps>();

  const onSubmit = ({ fullName, email, password }: SignupProps) => {
    signUp(
      { fullName, email, password },
      {
        onSettled: () => {
          handleFormTypeChange(USER_FORM_LOGIN);
          reset();
        },
      }
    );
  };

  return (
    <>
      <h1 className="text-tma-blue-200 text-2xl font-semibold text-center">
        {SIGN_UP_MESSAGE}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputWrapper label={FULL_NAME} error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            disabled={isPending}
            placeholder="placeholder"
            autoComplete="username"
            {...register("fullName", {
              required: REQUIRED_FIELD,
            })}
          />
        </InputWrapper>
        <InputWrapper label={EMAIL_ADDRESS} error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isPending}
            placeholder="placeholder"
            autoComplete="username"
            {...register("email", {
              required: REQUIRED_FIELD,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: NON_VALID_EMAIL,
              },
            })}
          />
        </InputWrapper>
        <InputWrapper label={PASSWORD} error={errors?.fullName?.message}>
          <Input
            type="password"
            id="password"
            disabled={isPending}
            placeholder="placeholder"
            autoComplete="current-password"
            {...register("password", {
              required: REQUIRED_FIELD,
              minLength: {
                value: 8,
                message: PASSWORD_MIN_LENGTH,
              },
            })}
          />
        </InputWrapper>
        <InputWrapper
          label={PASSWORD_REPEAT}
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            disabled={isPending}
            placeholder="placeholder"
            autoComplete="current-password"
            {...register("passwordConfirm", {
              required: REQUIRED_FIELD,
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </InputWrapper>
        <div className="flex gap-3">
          <Button
            variant="primary"
            disabled={isPending}
            type="submit"
            className="uppercase"
          >
            {USER_FORM_SIGNUP}
          </Button>
          <Button
            variant="secondary"
            disabled={isPending}
            type="reset"
            className="uppercase"
          >
            {CANCEL}
          </Button>
        </div>
      </form>
    </>
  );
};
