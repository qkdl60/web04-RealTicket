import { useWaitingInfoStore } from '@/feature/reservation/stores';
import { useSSE } from '@/shared/hooks';
import { RePermissionResult } from '@/shared/types/booking';
import { act, renderHook } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { useWaitingData } from './hooks';

vi.mock('@/shared/hooks', () => ({
  useSSE: vi.fn(),
}));
vi.mock(`@/feature/reservation/stores`, () => ({
  useWaitingInfoStore: vi.fn(),
}));

describe('useWaitingData 상황별 return 값 테스트', () => {
  const mockEventId = 1;
  const mockUserOrder = 8;
  let onMessageCallback: (data: RePermissionResult) => void = () => {};
  beforeEach(() => {
    act(() => {
      (useSSE as unknown as ReturnType<typeof vi.fn>).mockImplementation(({ onMessage }) => {
        onMessageCallback = onMessage;
      });
    });
    vi.clearAllMocks();
    (useWaitingInfoStore as unknown as Mock<typeof useWaitingInfoStore>).mockImplementation((selector) =>
      selector({ userOrder: mockUserOrder, action: { resetUserOrder: vi.fn(), setUserOrder: vi.fn() } }),
    );
  });
  it('첫번째 sse 호출, 패스 x,  대기 시간 계산, 대기 시간 텍스트 형식 반환', () => {
    const mockWaitingData: RePermissionResult = {
      totalWaiting: 10,
      throughputRate: 2,
      headOrder: 1,
    };
    const { result } = renderHook(() => useWaitingData(mockEventId));
    act(() => {
      onMessageCallback?.(mockWaitingData);
    });
    expect(result.current).toEqual({
      isLoadingWaitingData: false,
      myOrder: mockUserOrder,
      waitingTimeText: '1분 내외',
      progressValue: 0,
      totalWaiting: 10,
      isMyTurn: false,
      restCount: 8,
    });
  });

  it('연속 호출, pass, 대기 시간 텍스트 형식 반환', () => {
    const initialData: RePermissionResult = {
      totalWaiting: 10,
      throughputRate: 2,
      headOrder: 1,
    };

    const { result, rerender } = renderHook(() => useWaitingData(mockEventId));

    act(() => {
      onMessageCallback(initialData);
    });

    const initialResult = { ...result.current };

    const secondData: RePermissionResult = {
      totalWaiting: 10,
      throughputRate: 2,
      headOrder: 9,
    };

    act(() => {
      rerender();
      onMessageCallback(secondData);
    });

    const secondResult = { ...result.current };
    expect(initialResult).toEqual({
      isLoadingWaitingData: false,
      myOrder: mockUserOrder,
      waitingTimeText: '1분 내외',
      progressValue: 0,
      totalWaiting: 10,
      isMyTurn: false,
      restCount: 8,
    });
    expect(secondResult).toEqual({
      isLoadingWaitingData: false,
      myOrder: mockUserOrder,
      waitingTimeText: '1분 내외',
      progressValue: 100,
      totalWaiting: 10,
      isMyTurn: true,
      restCount: 0,
    });
  });
});
