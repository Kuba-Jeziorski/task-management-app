import { useNavigate } from "react-router";

import { Button } from "../button/button";
import {
  NOT_FOUND_PAGE_DESCRIPTION,
  NOT_FOUND_PAGE_TITLE,
  TAKE_ME_BACK,
  URL_LOGIN_PAGE,
} from "../../constants/constants";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-2/3 p-4 bg-tma-light-100 rounded-xl">
      <div className="flex flex-col gap-3 p-2 pr-4 w-full overflow-auto text-tma-blue-100 text-lg">
        <h1 className="font-black text-tma-blue-200 text-3xl">
          {NOT_FOUND_PAGE_TITLE}
        </h1>
        <p>{NOT_FOUND_PAGE_DESCRIPTION}</p>
        <div className="flex">
          <Button
            variant={"primary"}
            onClick={() => navigate(`/${URL_LOGIN_PAGE}`)}
            className="uppercase mt-3"
          >
            {TAKE_ME_BACK}
          </Button>
        </div>
      </div>
    </div>
  );
};
