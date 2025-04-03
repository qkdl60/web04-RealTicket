import useSSE from '@/hooks/useSSE.tsx';

import useWaitingData from '@/pages/WaitingQueuePage/useWaitingData.tsx';

import { useWaitingInfoStore } from '@/stores/booking/waitingInfoStore.ts';
import { RePermissionResult } from '@/type/booking.ts';
import { act, renderHook } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 각 상황에 따라서 페이지 작동 확인 
  함수 유닛 테스트 

  useWaitingData에 대해서 sse를 여러번 받았을떄 각 상황별 return 값 확인
 */

vi.mock('@/hooks/useSSE', () => ({
  default: vi.fn(),
}));
vi.mock(`@/stores/booking/waitingInfoStore.ts`, () => ({
  useWaitingInfoStore: vi.fn(),
}));

describe('useWaitingData 상황별 return 값 테스트', () => {
  const mockEventId = 1;
  const mockUserOrder = 8;
  beforeEach(() => {
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
    (useSSE as ReturnType<typeof vi.fn>).mockReturnValue({ data: mockWaitingData, isLoading: false });

    const { result } = renderHook(() => useWaitingData(mockEventId));
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
    (useSSE as ReturnType<typeof vi.fn>).mockReturnValue({
      data: initialData,
      isLoading: false,
    });
    const { result, rerender } = renderHook(() => useWaitingData(mockEventId));
    const initialResult = result.current;

    const secondData: RePermissionResult = {
      totalWaiting: 10,
      throughputRate: 2,
      headOrder: 9,
    };
    (useSSE as ReturnType<typeof vi.fn>).mockReturnValue({
      data: secondData,
      isLoading: false,
    });
    act(() => {
      rerender();
    });
    const secondResult = result.current;
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
