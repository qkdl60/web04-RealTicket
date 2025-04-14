import { ProgramDetail } from '@/shared/types';
import { ProgramEvent } from '@/shared/types';

export type ViewProps = {
  programDetail: ProgramDetail;
  dateList: Date[];
  timeList: string[];
  lastDate: Date;
  startDate: Date;
  selected: {
    date: Date;
    time: string;
  };
  selectedEvent: ProgramEvent;
  updateDate: (date: Date) => void;
  updateTime: (time: string) => void;
  goReadyPage: () => void;
};
