import { GuestLoginButton, LoginButton, SignupButton } from '@/feature/auth/ui';
import { UserInfoButton, UserInfoSection } from '@/feature/user/ui';
import { Button, Icon, LogoButton, Popover, ResponsiveView, Sheet } from '@/shared/components';
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
                <Button onClick={toggle} size="fit" intent="ghost">
                  <Icon iconName="Menu" />
                </Button>
              )}
            />
            <Sheet.Content
              position="right"
              className={`h-full ${isLogin ? 'w-[460px]' : `w-[200px]`}`}
              isOverlay
              renderCloseButton={(closePopover) => (
                <Button className="absolute right-8 top-4" onClick={closePopover} size="fit" intent="ghost">
                  <Icon iconName="X" />
                </Button>
              )}>
              {isLogin ? (
                <UserInfoSection />
              ) : (
                <nav className="flex flex-col gap-4">
                  <GuestLoginButton size="full" />
                  <SignupButton size="full" />
                  <LoginButton size="full" />
                </nav>
              )}
            </Sheet.Content>
          </Popover.Root>
        </header>
      }
    />
  );
}
