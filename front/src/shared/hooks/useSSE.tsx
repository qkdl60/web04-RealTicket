import { useEffect } from 'react';

type SSEEventHandler = (data: unknown) => void;

type EventSourceData = {
  eventSource: EventSource;
  count: number;
  eventHandler: Map<string, SSEEventHandler>;
  timeoutId: ReturnType<typeof setTimeout> | null;
};
const eventSourceMap = new Map<string, EventSourceData>();

const DELAY_TIME_MS = 5000;

interface useSSEProps<T> {
  sseURL: string;
  componentId: string; //useId를 이용한 컴포넌별 아이디
  onMessage: (data: T) => void;
}

/*
1. useSSE(sseURL, onMessage) 호출 시
  - Connection Map에 sseURL 존재 여부 확인
  - 없으면 새 EventSource 연결
  - 있으면 기존 EventSource 재사용, tmeout clear
  - clientId 기반으로 onMessage 리스너 등록
  - ref count +1

2. unmount 시
  - clientId로 등록된 onMessage 리스너 제거
  - ref count -1
  - ref count == 0 → 일정 시간 대기 후 EventSource close

*/

export function useSSE<T>({ sseURL, componentId, onMessage }: useSSEProps<T>) {
  useEffect(() => {
    if (eventSourceMap.has(sseURL)) {
      //기존 연결 재사용
      const eventSourceData = eventSourceMap.get(sseURL)!;
      if (eventSourceData?.timeoutId !== null) {
        clearTimeout(eventSourceData.timeoutId);
        eventSourceData.timeoutId = null;
      }
      eventSourceData.eventHandler.set(componentId, onMessage as SSEEventHandler);
      eventSourceData.count += 1;
      eventSourceMap.set(sseURL, eventSourceData);
    } else {
      //새연결 생성
      const eventSource = new EventSource(sseURL, { withCredentials: true });
      const eventHandler = new Map<string, SSEEventHandler>();
      eventHandler.set(componentId, onMessage as SSEEventHandler);
      const eventSourceData: EventSourceData = {
        eventSource,
        count: 1,
        eventHandler,
        timeoutId: null,
      };
      eventSource.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        if (parsed) {
          eventSourceData.eventHandler.forEach((handler) => {
            handler(parsed);
          });
        }
      };
      eventSourceMap.set(sseURL, eventSourceData);
    }

    return () => {
      const eventSourceData = eventSourceMap.get(sseURL)!;
      if (!eventSourceData) return;
      eventSourceData.eventHandler.delete(componentId);
      eventSourceData.count -= 1;
      if (eventSourceData.count === 0) {
        const timeoutId = setTimeout(() => {
          eventSourceData.eventSource.close();
          eventSourceMap.delete(sseURL);
        }, DELAY_TIME_MS);
        eventSourceData.timeoutId = timeoutId;
      }
    };
  }, [sseURL, componentId, onMessage]);
}
