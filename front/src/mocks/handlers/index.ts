import { programHandlers } from './program';
import { reservationHandlers } from './reservations';

export const handlers = [...reservationHandlers, ...programHandlers];
