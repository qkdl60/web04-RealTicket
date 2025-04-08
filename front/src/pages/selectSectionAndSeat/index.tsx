import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import usePreventLeave from '@/hooks/usePreventLeave.tsx';

import { useEventAndPlaceDate } from '@/pages/reservationWaiting/hooks/useEventAndPlaceDate.tsx';
import { formatEventInfo } from '@/pages/reservationWaiting/utils/formatEventInfo.ts';

import { ROUTE_URL } from '@/constants/index.ts';
import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { Dimmed, Separator } from '@/shared/components';

import { useChangeSeatCountMutation, useCompleteReservationMutation } from './hooks';
import {
  CompleteButton,
  EventInfoSection,
  SeatCountSelectorSection,
  SeatSelectorMap,
  SeatStateGuideSection,
  SectionSelectorMap,
  SelectedSeatInfo,
} from './ui';

export const SelectSectionAndSeatPage = () => {
  const { eventId } = useParams();
  const {
    seatCount,
    seat: { selectedSeatList },
    section: { selectedSectionIndex },
    flag: { isCompleteReservation },
    seatAction: { initSeatList },
    seatCountAction: { setSeatCount },
    flagAction: { setIsCompleteReservation },
  } = useReservationStore();

  usePreventLeave({ isBlocker: isCompleteReservation });

  const navigate = useNavigate();
  const { event, placeInfo } = useEventAndPlaceDate(Number(eventId));
  const { changeSeatCount, isChangingSeatCount } = useChangeSeatCountMutation(setSeatCount, initSeatList);
  const completeReservation = useCompleteReservationMutation();

  const eventInfo = formatEventInfo(event);
  const layout = placeInfo.layout;
  const sections = layout.sections;
  const isCompleteSelectSeat = seatCount === selectedSeatList.length;
  const selectedSection = selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;
  const isSelectedSection = selectedSection !== null;

  const goNextStep = useCallback(() => {
    setIsCompleteReservation(true);
    setTimeout(() => {
      navigate(`${ROUTE_URL.EVENT.DETAIL(Number(eventId))}/reservation/result`);
    }, 0);
  }, [navigate, eventId, setIsCompleteReservation]);

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
            <SeatStateGuideSection />
            <SeatSelectorMap section={selectedSection} />
          </>
        ) : (
          <SectionSelectorMap layout={layout} />
        )}
      </div>
      <Separator direction="col" />
      <div className="flex flex-col gap-6">
        <SectionSelectorMap className="flex-grow-0" layout={layout!} />
        <Separator direction="row" />
        <SeatCountSelectorSection seatCount={seatCount} changeSeatCount={changeSeatCount} />
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
};
