import { ToastEvent } from '@/shared/events';

const toastEvent = ToastEvent.getInstance();

export const toast = {
  success: (text: string) => {
    toastEvent.emit('success', text);
  },
  error: (text: string) => {
    toastEvent.emit('error', text);
  },
  warning: (text: string) => {
    toastEvent.emit('warning', text);
  },
};
