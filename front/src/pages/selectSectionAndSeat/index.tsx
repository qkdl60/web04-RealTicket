import { useParams } from 'react-router-dom';

import { useEventAndPlaceDate } from '@/pages/reservationWaiting/hooks/useEventAndPlaceDate.tsx';
import { formatEventInfo } from '@/pages/reservationWaiting/utils/formatEventInfo.ts';
import { DemoSeatSelectorMap } from '@/pages/selectSectionAndSeat/ui/seatSelectorMap/DemoSeatSelectorMap.tsx';

import { usePreventLeave } from '@/feature/reservation/hooks';
import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { Dimmed, Loading, Separator } from '@/shared/components';

import { useChangeSeatCountMutation } from './hooks';
import {
  CompleteButton,
  EventInfoSection,
  SeatCountSelectorSection,
  SeatStateGuideSection,
  SectionSelectorMap,
  SelectedSeatInfo,
} from './ui';

export const SelectSectionAndSeatPage = () => {
  const { eventId } = useParams();

  const selectedSectionIndex = useReservationStore((s) => s.section.selectedSectionIndex);
  const isCompleteReservation = useReservationStore((s) => s.flag.isCompleteReservation);
  usePreventLeave({ isBlocker: isCompleteReservation });

  const { event, placeInfo } = useEventAndPlaceDate(Number(eventId));
  const { changeSeatCount, isChangingSeatCount } = useChangeSeatCountMutation();
  const eventInfo = formatEventInfo(event);
  const layout = placeInfo.layout;
  const sections = layout.sections;

  const selectedSection = selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;
  const isSelectedSection = selectedSection !== null;

  return (
    <div className="flex w-full gap-4">
      <div className="m-auto flex h-full w-[70%] flex-col gap-8 px-4 py-2">
        {isChangingSeatCount && <Dimmed />}
        <EventInfoSection eventInfo={eventInfo} />
        {isSelectedSection ? (
          <>
            <SeatStateGuideSection />
            {/* <SeatSelectorMap section={selectedSection} /> */}
            <DemoSeatSelectorMap section={selectedSection} />
          </>
        ) : (
          <SectionSelectorMap layout={layout} />
        )}
      </div>
      <Separator direction="col" />
      <div className="flex flex-col gap-6">
        <SectionSelectorMap className="flex-grow-0" layout={layout} />
        <Separator direction="row" />
        <SeatCountSelectorSection changeSeatCount={changeSeatCount} />
        <Separator direction="row" />
        <div className="relative flex-grow">
          {isChangingSeatCount && <Loading className="z-10 bg-black/30" />}
          <SelectedSeatInfo />
        </div>
        <Separator direction="row" />
        <CompleteButton eventId={eventId!} />
      </div>
    </div>
  );
};
