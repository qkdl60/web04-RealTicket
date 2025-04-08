import { getSectionData } from '@/pages/selectSectionAndSeat/utils/getSectionData';

import { useReservationStore } from '@/stores/reservation/reservationStore.ts';
import { Layout } from '@/type/index.ts';
import { twMerge } from 'tailwind-merge';

import { parseSectionCoList } from '../../utils';

interface SectionSelectorMapProps {
  className?: string;
  layout: Layout;
}
export const SectionSelectorMap = ({ className, layout }: SectionSelectorMapProps) => {
  const { overview: overviewURL, overviewWidth, overviewHeight, overviewPoints } = layout;
  const viewBoxData = `0 0 ${overviewWidth} ${overviewHeight}`;
  const sectionCoList = parseSectionCoList(overviewPoints);
  const {
    section: { selectedSectionIndex },
    sectionAction: { setSelectedSectionIndex },
  } = useReservationStore();

  return (
    <svg role="radiogroup" viewBox={viewBoxData} className={twMerge('w-full', className)}>
      <image href={overviewURL} className="h-full w-full"></image>
      {sectionCoList.map((section, index) => {
        const { id, textX, textY, pathD } = getSectionData(section);
        const isActive = selectedSectionIndex === index || selectedSectionIndex === null;
        return (
          <g
            key={id}
            className="hover:cursor-pointer"
            onClick={() => setSelectedSectionIndex(index)}
            role="radio"
            aria-label={`${id} 섹션 선택`}>
            <path className={isActive ? 'fill-primary' : 'fill-surface-sub'} d={pathD} />
            <text
              className="fill-typo text-[200px]"
              fontWeight={'bold'}
              textAnchor="middle"
              dominantBaseline="middle"
              x={textX}
              y={textY}>{`${id}`}</text>
          </g>
        );
      })}
    </svg>
  );
};
