import type { ReactNode } from "react";
import React from "react";

type TitleProps = {
  children: ReactNode;
  as: string;
};

const titleClasses =
  "text-tma-blue-200 text-2xl uppercase font-black text-center";

export const Title = ({ as, children }: TitleProps) => {
  return <>{React.createElement(as, { className: titleClasses }, children)}</>;
};
