import { SelectedSeat } from '@/pages/ReservationPage/SectionAndSeat/index.tsx';

import { SeatCount } from '@/type/reservation.ts';
import { create } from 'zustand';

type ReservationStore = {
  selectedSeatList: SelectedSeat[];
  isCompleteReservation: boolean;
  seatCount: SeatCount;
  selectedSectionIndex: number | null;
  seatAction: {
    clearSeatList: () => void;
    addSeat: (selectedSeat: SelectedSeat) => void;
    removeSeat: (targetSeatName: string) => void;
    initSeatList: () => void;
    setSeatList: (seatList: SelectedSeat[]) => void;
  };
  sectionAction: {
    setSelectedSectionIndex: (selectedSectionIndex: number) => void;
  };
  seatCountAction: {
    setSeatCount: (seatCount: SeatCount) => void;
    initSeatCount: () => void;
  };
  reservationAction: {
    setIsCompleteReservation: (isCompleteReservation: boolean) => void;
  };
};

export const useReservationStore = create<ReservationStore>((set) => ({
  selectedSeatList: [],
  isCompleteReservation: false,
  seatCount: 1,
  selectedSectionIndex: null,
  seatAction: {
    clearSeatList: () => set({ selectedSeatList: [] }),
    setSeatList: (seatList: SelectedSeat[]) => set({ selectedSeatList: seatList }),
    addSeat: (selectedSeat: SelectedSeat) =>
      set((state) => ({ selectedSeatList: [...state.selectedSeatList, selectedSeat] })),
    removeSeat: (targetSeatName: string) =>
      set((state) => ({
        selectedSeatList: state.selectedSeatList.filter((seat) => seat.name !== targetSeatName),
      })),
    initSeatList: () => set({ selectedSeatList: [], isCompleteReservation: false }),
  },
  seatCountAction: {
    setSeatCount: (seatCount: SeatCount) => set({ seatCount }),
    initSeatCount: () => set({ seatCount: 1 }),
  },
  sectionAction: {
    setSelectedSectionIndex: (selectedSectionIndex: number) => set({ selectedSectionIndex }),
  },
  reservationAction: {
    setIsCompleteReservation: (isCompleteReservation: boolean) => set({ isCompleteReservation }),
  },
}));
