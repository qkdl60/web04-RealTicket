import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import usePreventLeave from '@/hooks/usePreventLeave.tsx';

import Dimmed from '@/components/common/Dimmed.tsx';
import Separator from '@/components/common/Separator.tsx';

import useCompleteReservationMutation from '@/pages/ReservationPage/SectionAndSeat/useCompleteReservationMutation.tsx';

import { useReservationStore } from '@/stores/reservation/reservationStore.ts';
import { EventInfo, Layout } from '@/type/index.ts';

import {
  CompleteButton,
  EventInfoSection,
  SeatCountSelector,
  SeatSelectorSection,
  SeatStatusGuide,
  SectionSelectorMap,
  SelectedSeatInfo,
} from './components';
import useChangeSeatCountMutation from './useChangeSeatCountMutation.tsx';

export interface SelectedSeat {
  sectionIndex: number;
  seatIndex: number;
  name: string;
}

type SectionAndSeatProps = {
  eventInfo: EventInfo;
  layout: Layout;
  goNextStep: () => void;
};

export default function SectionAndSeat({ goNextStep, layout, eventInfo }: SectionAndSeatProps) {
  usePreventLeave();
  const { eventId } = useParams();
  const {
    seatCount,
    selectedSeatList,
    selectedSectionIndex,
    seatAction: { initSeatList },
    seatCountAction: { setSeatCount },
    reservationAction: { setIsCompleteReservation },
  } = useReservationStore();

  useEffect(() => {
    initSeatList();
  }, [initSeatList]);

  const completeReservation = useCompleteReservationMutation();
  const { sections } = layout;

  const isCompleteSelectSeat = seatCount === selectedSeatList.length;
  const selectedSection = selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;
  const isSelectedSection = selectedSection !== null;

  const { changeSeatCount, isChangingSeatCount } = useChangeSeatCountMutation(setSeatCount, initSeatList);

  const onComplete = useCallback(() => {
    completeReservation({
      eventId: Number(eventId),
      selectedSeatList,
      onSuccess: () => {
        setIsCompleteReservation(true);
        goNextStep();
      },
    });
  }, [completeReservation, eventId, goNextStep, selectedSeatList, setIsCompleteReservation]);

  return (
    <div className="flex w-full gap-4">
      <div className="m-auto flex w-[70%] flex-col gap-8 px-4 py-2">
        {isChangingSeatCount && <Dimmed />}
        <EventInfoSection eventInfo={eventInfo} />
        {isSelectedSection ? (
          <>
            <SeatStatusGuide />
            <SeatSelectorSection selectedSection={selectedSection} />
          </>
        ) : (
          <SectionSelectorMap layout={layout} />
        )}
      </div>
      <Separator direction="col" />
      <div className="flex flex-col gap-6">
        <SectionSelectorMap className="flex-grow-0" layout={layout} />
        <Separator direction="row" />
        <SeatCountSelector seatCount={seatCount} changeSeatCount={changeSeatCount} />
        <Separator direction="row" />
        <SelectedSeatInfo
          className="flex-grow"
          selectedSeatList={selectedSeatList}
          seatCount={seatCount}
          isChangingSeatCount={isChangingSeatCount}
        />
        <Separator direction="row" />
        <CompleteButton isCompleteSelectSeat={isCompleteSelectSeat} onClick={onComplete} />
      </div>
    </div>
  );
}
