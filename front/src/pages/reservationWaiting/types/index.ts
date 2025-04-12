import { EventInfo } from '@/shared/types';

export type ReservationWaitingPageViewProps = {
  overviewImageURL: string | undefined;
  eventInfo: EventInfo;
  restTime: number;
  canGoNextPage: boolean;
  isReservationOpen: boolean;
  permissionAndGoNextPage: () => void;
};
