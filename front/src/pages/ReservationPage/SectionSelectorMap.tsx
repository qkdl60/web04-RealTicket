import { parseSectionCoList } from '@/pages/ReservationPage/parseSectionCoList.ts';

import { calculatePolygonCentroid, getPathD } from '@/utils/svg.ts';

import { Layout } from '@/type/index.ts';
import { twMerge } from 'tailwind-merge';

interface SectionSelectorMapProps {
  className?: string;
  layout: Layout;

  setSelectedSectionIndex: (id: number) => void;
  selectedSectionIndex: number | null;
}
export default function SectionSelectorMap({
  className,
  layout,
  setSelectedSectionIndex,
  selectedSectionIndex,
}: SectionSelectorMapProps) {
  const { overview: overviewURL, overviewWidth, overviewHeight, overviewPoints } = layout;
  const viewBoxData = `0 0 ${overviewWidth} ${overviewHeight}`;
  const sectionCoList = parseSectionCoList(overviewPoints);

  return (
    <svg viewBox={viewBoxData} className={twMerge('w-full', className)}>
      <image href={overviewURL} className="h-full w-full"></image>
      {sectionCoList.map((section, index) => {
        const { id, points } = section;
        const [textX, textY] = calculatePolygonCentroid(points);
        const d = getPathD(...points);
        const isActive = selectedSectionIndex === index || selectedSectionIndex === null;
        return (
          <g key={id} className="hover:cursor-pointer" onClick={() => setSelectedSectionIndex(index)}>
            <path className={isActive ? 'fill-primary' : 'fill-surface-sub'} d={d} />
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
}
