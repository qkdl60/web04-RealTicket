import { create } from 'zustand';

type userOrder = number | null;
type WaitingInfoAction = {
  setUserOrder: (userOrder: userOrder) => void;
  resetUserOrder: () => void;
};
type WaitingInfoStore = {
  userOrder: userOrder;
  action: WaitingInfoAction;
};
export const useWaitingInfoStore = create<WaitingInfoStore>((set) => ({
  userOrder: null,
  action: {
    setUserOrder: (userOrder: userOrder) => set({ userOrder }),
    resetUserOrder: () => set({ userOrder: null }),
  },
}));
