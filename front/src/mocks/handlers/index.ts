import { bookingHandler } from './booking';
import { eventHandlers } from './events';
import { placeHandlers } from './place';
import { programHandlers } from './program';
import { reservationHandlers } from './reservations';
import { userHandlers } from './user.ts';

export const handlers = [
  ...bookingHandler,
  ...reservationHandlers,
  ...programHandlers,
  ...eventHandlers,
  ...placeHandlers,
  ...userHandlers,
];
