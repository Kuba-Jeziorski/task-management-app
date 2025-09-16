import type { Log } from "../../constants/types";
import { LogListingDayRecord } from "./log-listing-day-record";

type Props = {
  log: Log;
};

export const LogListingDay = ({ log }: Props) => {
  return (
    <>
      <ul className="flex flex-col gap-1">
        {log.actions.map((record) => (
          <LogListingDayRecord record={record} />
        ))}
      </ul>
    </>
  );
};
