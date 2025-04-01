import { eventHandlers } from './events';
import { placeHandlers } from './place';
import { programHandlers } from './program';
import { reservationHandlers } from './reservations';

export const handlers = [...reservationHandlers, ...programHandlers, ...eventHandlers, ...placeHandlers];
