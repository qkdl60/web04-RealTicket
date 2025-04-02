import { postSeat } from '@/api/booking.ts';

import { toast } from '@/components/Toast/index.ts';

import { useMutation } from '@tanstack/react-query';

import type { SelectedSeat } from './index.ts';

const useSelectSeatMutation = (
  mutationKey: string[],
  eventId: number,
  selectedSeatList: SelectedSeat[],
  setSelectedSeatList: (seats: SelectedSeat[]) => void,
  selectedSectionIndex: number,
) => {
  const { mutate: selectSeat } = useMutation({
    mutationFn: postSeat,
    mutationKey,
    onError: (_, data) => {
      const { seatIndex, sectionIndex } = data;
      const filtered = selectedSeatList.filter(
        (seat) => seat.seatIndex !== seatIndex || seat.sectionIndex !== sectionIndex,
      );
      setSelectedSeatList([...filtered]);
      toast.error('좌석 선택/취소에 실패했습니다');
    },
    throwOnError: false,
  });
  const requestCancelSeat = async (seatIndex: number, seatName: string) => {
    const filteredSeatList = selectedSeatList.filter((seat) => seatName !== seat.name);
    await selectSeat(
      {
        sectionIndex: selectedSectionIndex,
        seatIndex: seatIndex,
        expectedStatus: 'deleted',
        eventId: Number(eventId),
      },
      {
        onSuccess: () => {
          setSelectedSeatList(filteredSeatList);
          toast.warning(`${seatName!} 좌석을 취소했습니다`);
        },
      },
    );
    return filteredSeatList;
  };

  const requestReserveSeat = async (seatIndex: number, seatName: string) => {
    await selectSeat(
      {
        sectionIndex: selectedSectionIndex,
        seatIndex: seatIndex,
        expectedStatus: 'reserved',
        eventId: Number(eventId),
      },
      {
        onSuccess: () => {
          toast.success(`${seatName!} 좌석 선택에\n성공했습니다`);
          setSelectedSeatList([
            ...selectedSeatList,
            { seatIndex: seatIndex, sectionIndex: selectedSectionIndex, name: seatName! },
          ]);
        },
      },
    );
  };
  return { requestCancelSeat, requestReserveSeat };
};

export default useSelectSeatMutation;
