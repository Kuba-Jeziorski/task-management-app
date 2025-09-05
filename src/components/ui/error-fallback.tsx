import type { FallbackProps } from "react-error-boundary";

import { Button } from "../button/button";
import { SOMETHING_WENT_WRONG, TRY_AGAIN } from "../../constants/constants";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <h1>{SOMETHING_WENT_WRONG}</h1>
        <p>{error.message}</p>
        <Button
          variant={"primary"}
          onClick={resetErrorBoundary}
          className="capitalize"
        >
          {TRY_AGAIN}
        </Button>
      </div>
    </div>
  );
};
