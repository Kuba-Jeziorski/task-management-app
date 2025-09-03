import { LOG_OUT } from "../../constants/constants";
import { useLogout } from "../../hooks/use-logout";
import { useUser } from "../../hooks/use-user";
import { Button } from "../button/button";

export const UserPage = () => {
  const { logout, isPending } = useLogout();

  const { user } = useUser();

  return (
    <div className="flex flex-col gap-3">
      <h1>Hello there {user?.email}</h1>
      <div className="flex">
        <Button variant="danger" onClick={() => logout()} disabled={isPending}>
          {LOG_OUT}
        </Button>
      </div>
    </div>
  );
};
