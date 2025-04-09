import { useEffect, useState, useTransition } from 'react';

import { Toast } from '@/shared/components';
import { ToastEvent } from '@/shared/events';
import { ToastType } from '@/shared/types';

interface ToastData {
  type: ToastType;
  text: string;
  id: number;
}

export function ToastContainer() {
  const [toastList, setToastList] = useState<ToastData[]>([]);
  const [, startTransition] = useTransition();
  const getId = () => Date.now();

  useEffect(() => {
    const toastEvent = ToastEvent.getInstance();

    const setSuccessToast = (text: string) =>
      startTransition(() => setToastList((prev) => [{ type: 'success', text, id: getId() }, ...prev]));
    const setWarningToast = (text: string) =>
      startTransition(() => setToastList((prev) => [{ type: 'warning', text, id: getId() }, ...prev]));
    const setErrorToast = (text: string) =>
      startTransition(() => setToastList((prev) => [{ type: 'error', text, id: getId() }, ...prev]));
    toastEvent.on('success', setSuccessToast);
    toastEvent.on('warning', setWarningToast);
    toastEvent.on('error', setErrorToast);

    return () => {
      toastEvent.off('success', setSuccessToast);
      toastEvent.off('warning', setWarningToast);
      toastEvent.off('error', setErrorToast);
    };
  }, []);
  return (
    <div className="fixed left-8 top-20 z-20 flex flex-col gap-5 overflow-visible transition-all">
      {toastList.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          close={() => {
            setToastList((prevList) => prevList.filter((prev) => toast.id !== prev.id));
          }}
        />
      ))}
    </div>
  );
}
