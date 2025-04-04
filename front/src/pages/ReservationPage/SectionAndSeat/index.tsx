import { useState } from 'react';

import { postSeatCount } from '@/api/booking.ts';

import usePreventLeave from '@/hooks/usePreventLeave.tsx';

import { toast } from '@/components/Toast/index.ts';
import Dimmed from '@/components/common/Dimmed.tsx';
import Separator from '@/components/common/Separator.tsx';

import SeatCountSelector from '@/pages/ReservationPage/SectionAndSeat/SeatCountSelector.tsx';
import SeatSelectorMap from '@/pages/ReservationPage/SectionAndSeat/SeatSelectorMap.tsx';
import SectionSelectorMap from '@/pages/ReservationPage/SectionAndSeat/SectionSelectorMap';
import SelectedSeatInfo from '@/pages/ReservationPage/SectionAndSeat/SelectedSeatInfo.tsx';
import useConfirmMutation from '@/pages/ReservationPage/SectionAndSeat/useConfirmMutation.tsx';
import { formatEventInfo } from '@/pages/ReservationWaitingPage/formatEventInfo.ts';

import { changeSeatCountDebounce } from '@/utils/debounce.ts';

import type { EventDetail, PlaceInformation } from '@/type/index.ts';
import type { SeatCount } from '@/type/reservation.ts';
import { useMutation } from '@tanstack/react-query';

import CompleteButton from './CompleteButton';
import EventInfoSection from './EventInfoSection';
import SeatStatusGuide from './SeatStatusGuide';

export interface SelectedSeat {
  sectionIndex: number;
  seatIndex: number;
  name: string;
}

type SectionAndSeatProps = {
  seatCount: SeatCount;

  goNextStep: () => void;
  setReservationResult: (result: SelectedSeat[]) => void;
  event: EventDetail;
  placeInformation: PlaceInformation;
  setSeatCount: (count: SeatCount) => void;
};

export default function SectionAndSeat({
  seatCount,
  event,
  placeInformation,
  setReservationResult,
  setSeatCount,
  goNextStep,
}: SectionAndSeatProps) {
  usePreventLeave();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [selectedSeatList, setSelectedSeatList] = useState<SelectedSeat[]>([]);
  const [isChangingSeatCount, setIsChangingSeatCount] = useState<boolean>(false);
  const confirmReservation = useConfirmMutation();
  const { mutate: postSeatCountMutate } = useMutation({ mutationFn: postSeatCount });
  const { layout } = placeInformation;
  const { sections } = layout;
  const { id: eventId } = event;

  const isCompleteSelectSeat = seatCount === selectedSeatList.length;
  const selectedSection = selectedSectionIndex !== null && sections[selectedSectionIndex];
  const beSelectedSection = selectedSectionIndex !== null && selectedSection;
  const eventInfo = formatEventInfo(event);

  const changeSeatCount = (count: SeatCount) => {
    setIsChangingSeatCount(true);
    toast.warning('예매 매수 변경 중입니다.\n잠시만 기다려 주세요.');
    changeSeatCountDebounce(() => {
      postSeatCountMutate(count, {
        onSuccess: () => {
          setSelectedSeatList([]);
          setSeatCount(count);
        },
        onSettled: () => {
          setIsChangingSeatCount(false);
        },
      });
    });
  };

  const completeReservation = () => {
    confirmReservation({
      eventId,
      selectedSeatList,
      onSuccess: () => {
        setReservationResult(selectedSeatList);
        goNextStep();
      },
    });
  };
  return (
    <div className="flex w-full gap-4">
      <div className="m-auto flex w-[70%] flex-col gap-8 px-4 py-2">
        {isChangingSeatCount && <Dimmed />}
        <EventInfoSection eventInfo={eventInfo} />
        {beSelectedSection ? (
          <>
            <SeatStatusGuide />
            <SeatSelectorMap
              selectedSeatList={selectedSeatList}
              setSelectedSeatList={setSelectedSeatList}
              selectedSectionIndex={selectedSectionIndex}
              selectedSection={selectedSection}
              maxSelectCount={seatCount}
            />
          </>
        ) : (
          <SectionSelectorMap
            layout={layout}
            selectedSectionIndex={selectedSectionIndex}
            setSelectedSectionIndex={setSelectedSectionIndex}
          />
        )}
      </div>
      <Separator direction="col" />
      <div className="flex flex-col gap-6">
        <SectionSelectorMap
          className="flex-grow-0"
          layout={layout}
          selectedSectionIndex={selectedSectionIndex}
          setSelectedSectionIndex={setSelectedSectionIndex}
        />
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
        <CompleteButton isCompleteSelectSeat={isCompleteSelectSeat} onClick={completeReservation} />
      </div>
    </div>
  );
}
