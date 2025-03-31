import Radio from '@/components/common/Radio.tsx';
import Separator from '@/components/common/Separator';

import GoReadyPageButton from '@/pages/ProgramDetailPage/GoReadyPageButton';
import OptionContainer from '@/pages/ProgramDetailPage/OptionContainer.tsx';
import ProgramInformation from '@/pages/ProgramDetailPage/ProgramInformation.tsx';
import SelectionSummary from '@/pages/ProgramDetailPage/SelectionSummary.tsx';
import useProgramDetailPage from '@/pages/ProgramDetailPage/useProgramDetailPage.tsx';

import { getDate, getDay } from '@/utils/date.ts';

export default function ProgramDetailPage() {
  const {
    programDetail,
    selected,
    dateList,
    startDate,
    lastDate,
    timeList,
    selectedEvent,
    updateDate,
    updateTime,
    goReadyPage,
  } = useProgramDetailPage();
  return (
    <div className="flex min-w-[720px] flex-col gap-8">
      <ProgramInformation {...programDetail} lastDate={getDate(lastDate)} startDate={getDate(startDate)} />
      <div className="flex w-full gap-2">
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
        <Separator direction="col" />
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
      </div>
      <div className="flex items-center justify-between">
        <SelectionSummary selectedEvent={selectedEvent} />
        <GoReadyPageButton selectedEvent={selectedEvent} goReadyPage={goReadyPage} />
      </div>
    </div>
  );
}
