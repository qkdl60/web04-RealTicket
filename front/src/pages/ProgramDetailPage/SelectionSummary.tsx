import { getDate, getTime } from '@/utils/date.ts';

import type { ProgramEvent } from '@/type/index.ts';

type SelectionSummaryProps = {
  selectedEvent: ProgramEvent | undefined;
};
export default function SelectionSummary({ selectedEvent }: SelectionSummaryProps) {
  return (
    <div className="flex flex-col py-4">
      <span className="text-heading3 text-typo">선택된 일시 </span>
      {selectedEvent ? (
        <span className="text-caption1 text-success">
          {getDate(selectedEvent.runningDate) + getTime(selectedEvent.runningDate)}
        </span>
      ) : (
        <span className="text-caption1 text-error">없음 </span>
      )}
    </div>
  );
}
