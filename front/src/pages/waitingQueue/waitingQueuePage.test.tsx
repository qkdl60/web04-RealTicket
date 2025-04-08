import { useWaitingInfoStore } from '@/feature/reservation/stores';
import { useSSE } from '@/shared/hooks';
import { RePermissionResult } from '@/type/booking.ts';
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
