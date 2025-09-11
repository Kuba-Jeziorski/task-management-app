import { createContext } from "react";

import type { NewDialogType } from "../constants/types";

type GlobalContextProps = {
  dialogType: NewDialogType | null;
  setDialogType: React.Dispatch<React.SetStateAction<NewDialogType | null>>;
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);
