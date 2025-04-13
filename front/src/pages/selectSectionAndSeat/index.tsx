import { useParams } from 'react-router-dom';

import { useEventAndPlaceDate } from '@/pages/reservationWaiting/hooks/useEventAndPlaceDate.tsx';

import { formatEventInfo } from '@/feature/event/utils';
import { usePreventLeave } from '@/feature/reservation/hooks';
import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { ResponsiveView } from '@/shared/components';

import { useChangeSeatCountMutation } from './hooks';
import { DesktopSelectSectionAndSeatView, MobileSelectSectionAndSeatView } from './ui';

export const SelectSectionAndSeatPage = () => {
  const { eventId } = useParams();

  const selectedSectionIndex = useReservationStore((s) => s.section.selectedSectionIndex);
  const isCompleteReservation = useReservationStore((s) => s.flag.isCompleteReservation);
  usePreventLeave({ isBlocker: !isCompleteReservation });

  const { event, placeInfo } = useEventAndPlaceDate(Number(eventId));
  const { changeSeatCount, isChangingSeatCount } = useChangeSeatCountMutation();
  const eventInfo = formatEventInfo(event);
  const layout = placeInfo.layout;
  const sections = layout.sections;

  const selectedSection = selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;
  const isSelectedSection = selectedSection !== null;

  return (
    <ResponsiveView
      mobile={
        <MobileSelectSectionAndSeatView
          eventId={Number(eventId)}
          eventInfo={eventInfo}
          isChangingSeatCount={isChangingSeatCount}
          isSelectedSection={isSelectedSection}
          selectedSection={selectedSection!}
          layout={layout}
          changeSeatCount={changeSeatCount}
        />
      }
      desktop={
        <DesktopSelectSectionAndSeatView
          eventId={Number(eventId)}
          eventInfo={eventInfo}
          isChangingSeatCount={isChangingSeatCount}
          isSelectedSection={isSelectedSection}
          selectedSection={selectedSection!}
          layout={layout}
          changeSeatCount={changeSeatCount}
        />
      }
    />
  );
};
