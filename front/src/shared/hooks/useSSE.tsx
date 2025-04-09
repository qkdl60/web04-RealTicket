import { useEffect, useRef } from 'react';

interface useSSEProps<T> {
  sseURL: string;
  onMessage?: (data: T) => void;
}
//에러 핸들링 필요, axios 레벨에서 가능?
export function useSSE<T>({ sseURL, onMessage }: useSSEProps<T>) {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (eventSourceRef.current === null) {
      eventSourceRef.current = new EventSource(`${sseURL}`, {
        withCredentials: true,
      });
      eventSourceRef.current.onmessage = (event) => {
        const parsed = JSON.parse(event.data);

        if (parsed) {
          onMessage?.(parsed);
        }
      };
    }
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [sseURL, onMessage]);
}
