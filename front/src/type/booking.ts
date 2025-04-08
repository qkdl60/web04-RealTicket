export interface PermissionResult {
  waitingStatus: boolean;
  enteringStatus: boolean;
  userOrder?: number;
}

export interface RePermissionResult {
  headOrder: number;
  totalWaiting: number;
  throughputRate: number;
}

export type SeatStateInfo = {
  state: SeatState;
  description: string;
};

export type SeatState = 'empty' | 'mine' | 'reserving' | 'others' | 'available';

export type SelectedSeat = {
  sectionIndex: number;
  seatIndex: number;
  name: string;
};
