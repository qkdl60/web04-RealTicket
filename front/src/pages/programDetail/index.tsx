import { ResponsiveView } from '@/shared/components';

import { useProgramDetailPage } from './hooks';
import { DesktopView, MobileView } from './ui';

export const ProgramDetailPage = () => {
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
    <ResponsiveView
      desktop={
        <DesktopView
          selected={{
            date: selected.date!,
            time: selected.time!,
          }}
          programDetail={programDetail}
          dateList={dateList}
          timeList={timeList}
          lastDate={lastDate}
          startDate={startDate}
          selectedEvent={selectedEvent!}
          updateDate={updateDate}
          updateTime={updateTime}
          goReadyPage={goReadyPage}
        />
      }
      mobile={
        <MobileView
          selected={{
            date: selected.date!,
            time: selected.time!,
          }}
          programDetail={programDetail}
          dateList={dateList}
          timeList={timeList}
          lastDate={lastDate}
          startDate={startDate}
          selectedEvent={selectedEvent!}
          updateDate={updateDate}
          updateTime={updateTime}
          goReadyPage={goReadyPage}
        />
      }
    />
  );
};
