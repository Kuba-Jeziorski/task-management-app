import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";

export const MyDayPage = () => {
  useBlockedRedirect();
  return <h1>my day</h1>;
};
