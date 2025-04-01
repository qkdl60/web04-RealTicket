import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { CustomError } from '@/api/axios.ts';
import { getProgramsDetail } from '@/api/program.ts';

import { getDateList } from '@/pages/ProgramDetailPage/getDateList.ts';
import { getSelectedEvent } from '@/pages/ProgramDetailPage/getSelectedEvent.ts';
import { getTimeList } from '@/pages/ProgramDetailPage/getTimeList';

import { ROUTE_URL } from '@/constants/index.ts';
import type { ProgramDetail } from '@/type/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';

type SelectedState = {
  date: Date | null;
  time: string | null;
};

export default function useProgramDetailPage() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { data: programDetail } = useSuspenseQuery<ProgramDetail, CustomError>({
    queryKey: [`program`, programId],
    queryFn: getProgramsDetail(Number(programId)),
  });
  const { events: eventList } = programDetail;
  const [selected, setSelected] = useState<SelectedState>({
    date: null,
    time: null,
  });

  const dateList = getDateList(eventList);
  const timeList = getTimeList(eventList, selected.date);
  const selectedEvent = getSelectedEvent(eventList, selected.date, selected.time);

  const startDate = dateList[0];
  const lastDate = dateList[dateList.length - 1];

  const goReadyPage = () => {
    if (selectedEvent) {
      navigate(ROUTE_URL.EVENT.BOOKING_READY(selectedEvent.id));
    }
  };
  const updateDate = (date: Date) => {
    if (date === selected.date) return;
    setSelected({ time: null, date });
  };
  const updateTime = (value: string) => {
    if (value === selected.time) return;
    setSelected((prev) => ({ ...prev, time: value }));
  };

  return {
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
  };
}
