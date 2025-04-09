import { calculatePolygonCentroid, getPathD } from '@/shared/libs';
import type { SectionCoordinate } from '@/shared/types/data';

export const getSectionData = (section: SectionCoordinate) => {
  const { id, points } = section;
  const [textX, textY] = calculatePolygonCentroid(points);
  const d = getPathD(...points);
  return { id, textX, textY, pathD: d };
};
