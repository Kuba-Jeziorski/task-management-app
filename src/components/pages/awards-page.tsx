import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";

export const AwardsPage = () => {
  useBlockedRedirect();

  return <h1>awards</h1>;
};
