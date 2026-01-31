import { useState, type FormEvent } from "react";

import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import {
  BOTH_FIELDS_REQUIRED,
  ENTER_A_NEW_PASSWORD,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MISMATCH,
  UPDATE_PASSWORD,
} from "../../constants/constants";
import { useChangePassword } from "../../hooks/use-update-user";
import type { UpdateUserPassword } from "../../constants/types";

export const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const { passwordChange, isPending } = useChangePassword();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmedPassword) {
      setError(BOTH_FIELDS_REQUIRED);
      return;
    }

    if (newPassword.length < 8) {
      setError(PASSWORD_MIN_LENGTH);
      return;
    }

    if (newPassword !== confirmedPassword) {
      setError(PASSWORD_MISMATCH);
      return;
    }

    const updatedPassword: UpdateUserPassword = { password: newPassword };
    passwordChange(updatedPassword);
  };

  return (
    <>
      <h1 className="text-tma-blue-200 text-2xl font-semibold text-center">
        {ENTER_A_NEW_PASSWORD}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputWrapper label="Password">
          <Input
            type="password"
            id="password"
            placeholder="placeholder"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper label="Confirmed password">
          <Input
            type="password"
            id="confirmedPassword"
            placeholder="placeholder"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </InputWrapper>
        {error && <p className="text-tma-danger text-sm">{error}</p>}
        <div className="flex max-custom-375:w-full">
          <Button
            variant={"primary"}
            type="submit"
            className="uppercase max-custom-375:w-full"
            disabled={isPending}
          >
            {UPDATE_PASSWORD}
          </Button>
        </div>
      </form>
    </>
  );
};
