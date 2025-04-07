import { useBeforeUnload, useBlocker } from 'react-router-dom';

type UsePreventLeaveProps = {
  isBlocker?: boolean;
  confirmMessage?: string;
};
const CONFIRM_MESSAGE = '페이지를 이동하시겠습니까? 이동시 선택한 좌석은 취소됩니다.';
export default function usePreventLeave({
  isBlocker = true,
  confirmMessage = CONFIRM_MESSAGE,
}: UsePreventLeaveProps) {
  useBlocker(() => {
    if (!isBlocker) {
      return false;
    }
    const isConfirm = window.confirm(confirmMessage);
    return !isConfirm;
  });
  useBeforeUnload((event) => {
    event.preventDefault();
    event.returnValue = '';
  });
}
