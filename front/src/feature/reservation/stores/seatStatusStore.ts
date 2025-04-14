import { create } from 'zustand';

type SeatStatusStore = {
  seatInfo: Record<string, SeatInfo>;
  seatStatus: boolean[][];
  isStatusReady: boolean;
  seatAction: {
    initSeatInfo: () => void;
    setSeatStatus: (seatStatus: boolean[][]) => void;
    setSeatInfo: (seatName: string, seatInfo: SeatInfo) => void;
    removeSeatInfo: (seatName: string) => void;
    setIsStatusReady: (isStatusReady: boolean) => void;
  };
};
type SeatStatus = 'mine' | 'reserving';
type SeatInfo = {
  seatName: string;
  seatIndex: number;
  seatStatus: SeatStatus;
  sectionIndex: number;
};

export const useSeatStatusStore = create<SeatStatusStore>((set, get) => ({
  seatInfo: {},
  seatStatus: [],
  isStatusReady: false,
  seatAction: {
    initSeatInfo: () => {
      set({ seatInfo: {} });
    },
    setSeatStatus: (seatStatus: boolean[][]) => set({ seatStatus }),
    setSeatInfo: (seatName: string, seatInfo: SeatInfo) =>
      set({ seatInfo: { ...get().seatInfo, [seatName]: seatInfo } }),
    removeSeatInfo: (seatName: string) => {
      const nextSeatInfo = { ...get().seatInfo };
      delete nextSeatInfo[seatName];
      return set({ seatInfo: nextSeatInfo });
    },
    setIsStatusReady: (isStatusReady: boolean) => set({ isStatusReady }),
  },
}));
