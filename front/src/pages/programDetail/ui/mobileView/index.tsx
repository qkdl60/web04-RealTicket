import { ViewProps } from '@/pages/programDetail/type';
import { GoReadyPageButton } from '@/pages/programDetail/ui/goReadyPageButton/index.tsx';
import { OptionContainer } from '@/pages/programDetail/ui/optionContainer/index.tsx';
import { ProgramInformation } from '@/pages/programDetail/ui/programInformation/index.tsx';
import { SelectionSummary } from '@/pages/programDetail/ui/selectionSummary/index.tsx';

import { Radio } from '@/shared/components/radio/index.tsx';
import { Separator } from '@/shared/components/separator/index.tsx';
import { getDate, getDay } from '@/shared/libs/date.ts';

export function MobileView({
  programDetail,
  dateList,
  timeList,
  selected,
  lastDate,
  startDate,
  updateDate,
  updateTime,
  goReadyPage,
  selectedEvent,
}: ViewProps) {
  return (
    <div className="relative w-full px-8">
      <ProgramInformation
        {...programDetail}
        lastDate={getDate(lastDate)}
        startDate={getDate(startDate)}
        direction="column"
      />
      <div className="flex flex-col gap-8">
        <OptionContainer title="날짜" caption="날짜를 선택해주세요">
          {dateList.map((date) => (
            <li key={date.toString()}>
              <Radio
                group="date"
                value={getDate(date)}
                subText={getDay(date)}
                checked={date == selected.date}
                onClick={() => {
                  updateDate(date);
                }}
              />
            </li>
          ))}
        </OptionContainer>
        <Separator direction="row" />
        <OptionContainer title="시간" caption="시간을 선택해주세요">
          {timeList.map((time) => (
            <li key={time}>
              <Radio
                key={time}
                group="time"
                value={time}
                checked={time == selected.time}
                onClick={() => {
                  updateTime(time);
                }}
              />
            </li>
          ))}
        </OptionContainer>
        <div className="space h-[200px] w-full"></div>
        <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-between gap-4 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]">
          <div className="px-8 py-4">
            <SelectionSummary selectedEvent={selectedEvent} />

            <GoReadyPageButton size={'full'} selectedEvent={selectedEvent} goReadyPage={goReadyPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
