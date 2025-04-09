import { getDate, getTime } from '@/shared/libs';
import type { ProgramEvent } from '@/shared/types/data';

type SelectionSummaryProps = {
  selectedEvent: ProgramEvent | undefined;
};
export const SelectionSummary = ({ selectedEvent }: SelectionSummaryProps) => {
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
};
