import Button from '@/components/common/Button.tsx';

type CompleteButtonProps = {
  isCompleteSelectSeat: boolean;
  onClick: () => void;
};
export const CompleteButton = ({ isCompleteSelectSeat, onClick }: CompleteButtonProps) => {
  return (
    <Button disabled={!isCompleteSelectSeat} onClick={onClick}>
      {isCompleteSelectSeat ? (
        <span className="text-label1 text-typo-display">예매하기</span>
      ) : (
        <span className="text-label1 text-typo-disable">좌석을 모두 선택해주세요</span>
      )}
    </Button>
  );
};
