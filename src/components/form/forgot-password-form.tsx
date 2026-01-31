import { useState, type FormEvent } from "react";

import { InputWrapper } from "./input-wrapper";
import { Input } from "./the-input";
import { Button } from "../button/button";
import { REMIND, WHATS_YOUR_EMAIL_ADDRESS } from "../../constants/constants";
import { useForgotPassword } from "../../hooks/use-forgot-password";

export const ForgotPasswordForm = () => {
  const { forgotPassword, isPending } = useForgotPassword();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    forgotPassword(email);
  };

  return (
    <>
      <h1 className="text-tma-blue-200 text-2xl font-semibold text-center">
        {WHATS_YOUR_EMAIL_ADDRESS}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputWrapper label="Email">
          <Input
            type="email"
            id="email"
            placeholder="placeholder"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <div className="flex max-custom-375:w-full">
          <Button
            variant={"primary"}
            type="submit"
            className="uppercase max-custom-375:w-full"
            disabled={isPending}
          >
            {REMIND}
          </Button>
        </div>
      </form>
    </>
  );
};
