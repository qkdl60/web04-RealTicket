import { EventInfo, Layout, SeatCount, Section } from '@/shared/types';

export type ViewProps = {
  eventId: number;
  eventInfo: EventInfo;
  isChangingSeatCount: boolean;
  isSelectedSection: boolean;
  selectedSection: Section;
  layout: Layout;
  changeSeatCount: (seatCount: SeatCount) => Promise<void>;
};
