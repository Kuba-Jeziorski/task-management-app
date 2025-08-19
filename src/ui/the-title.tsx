import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
  as: string;
};

const titleClasses =
  "text-tma-blue-200 text-2xl uppercase font-black text-center";

export const Title = ({ as, children }: Props) => {
  return <>{React.createElement(as, { className: titleClasses }, children)}</>;
};
