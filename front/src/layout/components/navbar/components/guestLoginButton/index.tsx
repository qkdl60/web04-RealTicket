import { getGuestLogin } from '@/api/user.ts';

import useConfirm from '@/hooks/useConfirm.tsx';

import { Button, Icon } from '@/shared/components';
import { toast } from '@/shared/libs';
import { useAuthStore } from '@/shared/stores';
import type { Guest } from '@/type/user.ts';
import { useIsFetching } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

const GUEST_LOGIN_QUERY_KEY = ['guest'];
export default function GuestLoginButton() {
  const { login } = useAuthStore((state) => state.action);
  const isGuestLoginPending = !!useIsFetching({ queryKey: GUEST_LOGIN_QUERY_KEY });
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();

  const loginAsGuest = async () => {
    const isConfirm = await confirm({
      title: '게스트로 입장하기',
      description: '게스트 계정은 로그아웃하시면 다시 사용 할 수 없습니다.\n 그래도 입장하시겠습니까?',
      buttons: {
        ok: {
          title: '확인',
          color: 'success',
        },
        cancel: {
          title: '취소',
        },
      },
    });

    if (isConfirm) {
      await queryClient
        .fetchQuery<Guest>({
          queryKey: GUEST_LOGIN_QUERY_KEY,
          queryFn: getGuestLogin,
        })
        .then((data) => {
          const sliced = data.loginId.slice(0, 12);
          if (login) {
            login(sliced);
            toast.success('guest로 로그인 되었습니다');
          }
        })
        .catch(() => {
          toast.error('로그인에 실패했습니다\n잠시 후 다시 시도해주세요.');
        });
      return;
    }
  };

  return (
    <Button
      size={'middle'}
      color={'primary'}
      intent={'outline'}
      onClick={loginAsGuest}
      disabled={isGuestLoginPending}>
      {isGuestLoginPending ? (
        <>
          <Icon iconName="Loading" className="animate-spin" />
          <span className="text-label2 text-typo-disable">로그인중..</span>
        </>
      ) : (
        <span className="text-label2 text-primary">게스트로 입장하기</span>
      )}
    </Button>
  );
}
