import { ViewProps } from '@/pages/selectSectionAndSeat/types';
import { DemoSeatSelectorMap } from '@/pages/selectSectionAndSeat/ui/seatSelectorMap/DemoSeatSelectorMap.tsx';

import { Button, Dimmed, Icon, MobileBottomContainer, Popover, Sheet } from '@/shared/components';

import {
  CompleteButton,
  EventInfoSection,
  SeatCountSelectorSection,
  SeatStateGuideSection,
  SectionSelectorMap,
  SelectedSeatInfo,
} from '../../ui';

export function MobileSelectSectionAndSeatView({
  eventId,
  eventInfo,
  isChangingSeatCount,
  isSelectedSection,
  selectedSection,
  layout,
  changeSeatCount,
}: ViewProps) {
  return (
    <>
      <div className="relative w-full">
        <div className="flex w-full flex-col gap-4 px-8">
          {isChangingSeatCount && <Dimmed />}
          {isChangingSeatCount && <Dimmed />}
          <EventInfoSection eventInfo={eventInfo} />
          <SeatCountSelectorSection changeSeatCount={changeSeatCount} />
          <SectionSelectorMap layout={layout} />
          {isSelectedSection && (
            <>
              <SeatStateGuideSection direction="column" />
              <DemoSeatSelectorMap section={selectedSection} />
            </>
          )}
        </div>
        <div className="space h-[500px] w-full"></div>
      </div>
      <MobileBottomContainer>
        <div className="flex flex-col gap-4">
          <Popover.Root>
            <Popover.Trigger
              render={(togglePopover) => (
                <Button onClick={togglePopover} size={'fit'} intent="ghost">
                  선택한 좌석
                  <Icon iconName="DownArrow" className="rotate-180" />
                </Button>
              )}
            />
            <Sheet.Content
              position="bottom"
              className="fixed bottom-14 w-full px-8"
              renderCloseButton={(closePopover) => (
                <Button className="absolute left-6 top-4" size="fit" intent="ghost" onClick={closePopover}>
                  <Icon iconName="X" />
                </Button>
              )}>
              <SelectedSeatInfo />
            </Sheet.Content>
          </Popover.Root>
          <CompleteButton eventId={eventId} />
        </div>
      </MobileBottomContainer>
    </>
  );
}
