import type { Log_Action } from "../../constants/log-action-variants";
import { formatLogMessage } from "../../utils/log-formatter";

type Props = {
  record: Log_Action;
};

export const LogListingDayRecord = ({ record }: Props) => {
  return (
    <li>
      <p className="text-tma-light-500 text-sm">{formatLogMessage(record)}</p>
    </li>
  );
};
