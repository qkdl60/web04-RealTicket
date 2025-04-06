import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProgramDetailSuspenseQuery } from '@/pages/programDetail/hooks/useProgramDetailSuspenseQuery';
import { getDateList } from '@/pages/programDetail/utils/getDateList';
import { getSelectedEvent } from '@/pages/programDetail/utils/getSelectedEvent';
import { getTimeList } from '@/pages/programDetail/utils/getTimeList';

import { ROUTE_URL } from '@/constants/index.ts';

type SelectedState = {
  date: Date | null;
  time: string | null;
};

export const useProgramDetailPage = () => {
  const [selected, setSelected] = useState<SelectedState>({
    date: null,
    time: null,
  });
  const navigate = useNavigate();
  const { programDetail } = useProgramDetailSuspenseQuery();
  const { events: eventList } = programDetail;

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
};
