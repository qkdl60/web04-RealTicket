import { SelectedSeat } from '@/pages/ReservationPage/SectionAndSeat/index.tsx';

import { SeatCount } from '@/type/reservation.ts';
import { create } from 'zustand';

type ReservationStore = {
  flag: {
    isCompleteReservation: boolean;
    isCheckCaptcha: boolean;
    isCompleteSelectSeatCount: boolean;
  };
  seat: {
    selectedSeatList: SelectedSeat[];
  };
  seatCount: SeatCount;

  section: {
    selectedSectionIndex: number | null;
  };
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
  };
  flagAction: {
    setIsCompleteReservation: (isCompleteReservation: boolean) => void;
    setIsCheckCaptcha: (isCheckCaptcha: boolean) => void;
    setIsCompleteSelectSeatCount: (isCompleteSelectSeatCount: boolean) => void;
  };
  initReservation: () => void;
};

export const useReservationStore = create<ReservationStore>((set) => ({
  seat: {
    selectedSeatList: [],
  },

  seatCount: 1,

  section: {
    selectedSectionIndex: null,
  },
  flag: {
    isCompleteReservation: false,
    isCheckCaptcha: false,
    isCompleteSelectSeatCount: false,
  },

  seatAction: {
    clearSeatList: () => set({ seat: { selectedSeatList: [] } }),
    setSeatList: (seatList: SelectedSeat[]) => set({ seat: { selectedSeatList: seatList } }),
    addSeat: (selectedSeat: SelectedSeat) =>
      set((state) => ({ seat: { selectedSeatList: [...state.seat.selectedSeatList, selectedSeat] } })),
    removeSeat: (targetSeatName: string) =>
      set((state) => ({
        seat: {
          selectedSeatList: state.seat.selectedSeatList.filter((seat) => seat.name !== targetSeatName),
        },
      })),
    initSeatList: () => set({ seat: { selectedSeatList: [] } }),
  },
  seatCountAction: {
    setSeatCount: (seatCount: SeatCount) => set({ seatCount }),
  },
  sectionAction: {
    setSelectedSectionIndex: (selectedSectionIndex: number) => set({ section: { selectedSectionIndex } }),
  },
  flagAction: {
    setIsCompleteReservation: (isCompleteReservation: boolean) =>
      set((state) => ({ flag: { ...state.flag, isCompleteReservation } })),
    setIsCheckCaptcha: (isCheckCaptcha: boolean) =>
      set((state) => ({ flag: { ...state.flag, isCheckCaptcha } })),
    setIsCompleteSelectSeatCount: (isCompleteSelectSeatCount: boolean) =>
      set((state) => ({ flag: { ...state.flag, isCompleteSelectSeatCount } })),
  },
  initReservation: () =>
    set({
      seat: { selectedSeatList: [] },
      seatCount: 1,
      section: { selectedSectionIndex: null },
      flag: {
        isCompleteReservation: false,
        isCheckCaptcha: false,
        isCompleteSelectSeatCount: false,
      },
    }),
}));
