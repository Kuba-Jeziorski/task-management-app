import { useContext } from "react";
import { GlobalContext } from "../global";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("Global context error");
  }

  return context;
};
