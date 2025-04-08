import { EVENT_INFO_LABEL } from '@/constants';
import type { EventInfo } from '@/type';

type EventInfoSectionProps = {
  eventInfo: EventInfo;
};
export const EventInfoSection = ({ eventInfo }: EventInfoSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start">
        <h2 className="text-heading1 text-typo">{eventInfo.name}</h2>
      </div>
      <div className="flex justify-between">
        {[
          ['place', 'runningTime'],
          ['date', 'time'],
        ].map((labelList) => (
          <div className="flex flex-col gap-4">
            {labelList.map((label) => (
              <span className="text-display1 text-typo">
                {`${EVENT_INFO_LABEL[label as keyof EventInfo]} : ${eventInfo[label as keyof EventInfo]}`}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
