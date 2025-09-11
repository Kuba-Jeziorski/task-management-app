import { useState } from "react";

import { GlobalContext } from "./global";
import type { NewDialogType } from "../constants/types";

type Props = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [dialogType, setDialogType] = useState<NewDialogType | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        dialogType,
        setDialogType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
