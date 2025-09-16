import { useLogs } from "../../hooks/use-logs";
import { dataFormat } from "../../utils/data-format";
import { LogListingDay } from "./log-listing-day";

export const LogListing = () => {
  const { logs: data = [] } = useLogs();
  return (
    <div className="flex flex-1 flex-col gap-8 min-h-0 overflow-y-auto pr-3">
      {data?.map((log) => (
        <div key={log.id} className="flex flex-col gap-3">
          <p className="text-tma-light-500 font-semibold text-lg pb-2 border-b border-b-tma-light-500">
            {dataFormat(log.created_at)}
          </p>
          <LogListingDay log={log} />
        </div>
      ))}
    </div>
  );
};
