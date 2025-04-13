import { memo } from 'react';

import { getSectionData } from '@/pages/selectSectionAndSeat/utils/getSectionData';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { Layout, SectionCoordinate } from '@/shared/types/data';
import { twMerge } from 'tailwind-merge';
import { shallow } from 'zustand/shallow';

import { parseSectionCoList } from '../../utils';

interface SectionSelectorMapProps {
  className?: string;
  layout: Layout;
}
export const SectionSelectorMap = memo(
  ({ className, layout }: SectionSelectorMapProps) => {
    const { overview: overviewURL, overviewWidth, overviewHeight, overviewPoints } = layout;
    const viewBoxData = `0 0 ${overviewWidth} ${overviewHeight}`;
    const sectionCoList = parseSectionCoList(overviewPoints);

    const setSelectedSectionIndex = useReservationStore((s) => s.sectionAction.setSelectedSectionIndex);

    return (
      <svg role="radiogroup" viewBox={viewBoxData} className={twMerge('w-full', className)}>
        <image href={overviewURL} className="h-full w-full"></image>
        {sectionCoList.map((section, index) => (
          <G section={section} index={index} setSelectedSectionIndex={setSelectedSectionIndex} />
        ))}
      </svg>
    );
  },
  (prev, next) => shallow(prev.layout, next.layout),
);

const G = memo(
  ({
    section,
    index,
    setSelectedSectionIndex,
  }: {
    section: SectionCoordinate;
    index: number;
    setSelectedSectionIndex: (index: number) => void;
  }) => {
    const { id, textX, textY, pathD } = getSectionData(section);
    const isActive = useReservationStore((s) => s.section.selectedSectionIndex === index);

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
  },
  (prev, next) => shallow(prev.section, next.section),
);
