import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/use-login";
import { Button } from "../button/button";
import { InputWrapper } from "./input-wrapper";
import { LOG_IN, LOG_IN_MESSAGE } from "../../constants/constants";
import { Input } from "./the-input";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <>
      <h1 className="text-tma-blue-200 text-2xl font-semibold text-center">
        {LOG_IN_MESSAGE}
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
            disabled={isPending}
          />
        </InputWrapper>
        <InputWrapper label="Password">
          <Input
            type="password"
            id="password"
            placeholder="placeholder"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </InputWrapper>
        <div className="flex">
          <Button variant={"primary"} type="submit" className="uppercase">
            {LOG_IN}
          </Button>
        </div>
      </form>
    </>
  );
};
