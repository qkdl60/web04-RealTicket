import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { CustomError } from '@/api/axios.ts';
import { getProgramsDetail } from '@/api/program.ts';

import { getTime } from '@/utils/date.ts';

import { ROUTE_URL } from '@/constants/index.ts';
import type { ProgramDetail } from '@/type/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useProgramDetailPage() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { data: programDetail } = useSuspenseQuery<ProgramDetail, CustomError>({
    queryKey: ['program/1'],
    queryFn: getProgramsDetail(Number(programId)),
  });

  const { events } = programDetail;
  const [selected, setSelected] = useState<{ date: null | string; time: null | string }>({
    date: null,
    time: null,
  });
  const dateList = [...new Set(events.map((event) => new Date(event.runningDate).toDateString()))].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const startDate = dateList[0];
  const lastDate = dateList[dateList.length - 1];
  const isOneDay = startDate === lastDate;
  const filteredDateEvents = events.filter((event) => {
    const date = new Date(event.runningDate).toDateString();
    return date === selected.date;
  });

  const timeList = [...new Set(filteredDateEvents.map((event) => getTime(event.runningDate)))].sort();
  const selectedEvent = filteredDateEvents.find((event) => getTime(event.runningDate) === selected.time);
  const goReadyPage = () => {
    if (selectedEvent) {
      navigate(ROUTE_URL.EVENT.BOOKING_READY(selectedEvent.id));
    }
  };

  return {
    programDetail,
    selected,
    setSelected,
    dateList,
    startDate,
    lastDate,
    isOneDay,
    timeList,
    selectedEvent,
    goReadyPage,
  };
}
