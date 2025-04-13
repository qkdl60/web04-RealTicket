import { DemoSeatSelectorMap } from '@/pages/selectSectionAndSeat/ui/seatSelectorMap/DemoSeatSelectorMap.tsx';

import { Dimmed, Loading, Separator } from '@/shared/components';

import type { ViewProps } from '../../types';
import {
  CompleteButton,
  EventInfoSection,
  SeatCountSelectorSection,
  SeatStateGuideSection,
  SectionSelectorMap,
  SelectedSeatInfo,
} from '../../ui';

export function DesktopSelectSectionAndSeatView({
  eventId,
  eventInfo,
  isChangingSeatCount,
  isSelectedSection,
  selectedSection,
  layout,
  changeSeatCount,
}: ViewProps) {
  return (
    <div className="flex w-full gap-4">
      <div className="m-auto flex h-full w-[70%] flex-col gap-8 px-4 py-2">
        {isChangingSeatCount && <Dimmed />}
        <EventInfoSection eventInfo={eventInfo} />
        {isSelectedSection ? (
          <>
            <SeatStateGuideSection />
            {/* <SeatSelectorMap section={selectedSection} /> */}
            <DemoSeatSelectorMap section={selectedSection} />
          </>
        ) : (
          <SectionSelectorMap layout={layout} />
        )}
      </div>
      <Separator direction="col" />
      <div className="flex flex-col gap-6">
        <SectionSelectorMap className="flex-grow-0" layout={layout} />
        <Separator direction="row" />
        <SeatCountSelectorSection changeSeatCount={changeSeatCount} />
        <Separator direction="row" />
        <div className="relative flex-grow">
          {isChangingSeatCount && <Loading className="z-10 bg-black/30" />}
          <SelectedSeatInfo />
        </div>
        <Separator direction="row" />
        <CompleteButton eventId={eventId} />
      </div>
    </div>
  );
}
