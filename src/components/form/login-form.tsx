import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/use-login";
import { Button } from "../button/button";
import { InputWrapper } from "./input-wrapper";
import { cn } from "../../utils/css";
import { LOG_IN, LOG_IN_MESSAGE } from "../../constants/constants";

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
          <input
            type="email"
            id="email"
            placeholder="placeholder"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className={cn(
              "h-12 px-3 z-1 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
              "placeholder-transparent"
            )}
          />
        </InputWrapper>
        <InputWrapper label="Password">
          <input
            type="password"
            id="password"
            placeholder="placeholder"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className={cn(
              "h-12 px-3 z-1 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
              "placeholder-transparent"
            )}
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
