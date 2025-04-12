import { GuestLoginButton, LoginButton, SignupButton } from '@/feature/auth/ui';
import { UserInfoButton } from '@/feature/user/ui';
import { Button, Icon, LogoButton, Popover, ResponsiveView, Sidebar } from '@/shared/components';
import { useAuthStore } from '@/shared/stores';

const headerStyleClass = 'm-auto flex w-full max-w-[1080px] justify-between bg-white px-8 py-4';
export function Header() {
  const { isLogin } = useAuthStore((state) => state.auth);
  return (
    <ResponsiveView
      desktop={
        <header className={headerStyleClass}>
          <LogoButton />
          {isLogin ? (
            <UserInfoButton />
          ) : (
            <nav className="flex gap-4">
              <GuestLoginButton />
              <SignupButton />
              <LoginButton />
            </nav>
          )}
        </header>
      }
      mobile={
        <header className={headerStyleClass}>
          <LogoButton />
          <Popover.Root>
            <Popover.Trigger
              render={(toggle) => (
                <Button onClick={toggle} size="middle" intent="ghost">
                  <Icon iconName="Menu" />
                </Button>
              )}
            />
            <Sidebar.Content position="right" widthSize="200px">
              {isLogin ? (
                <div>예매 내역</div>
              ) : (
                <nav className="flex flex-col gap-4">
                  <GuestLoginButton size="full" />
                  <SignupButton size="full" />
                  <LoginButton size="full" />
                </nav>
              )}
            </Sidebar.Content>
          </Popover.Root>
        </header>
      }
    />
  );
}
