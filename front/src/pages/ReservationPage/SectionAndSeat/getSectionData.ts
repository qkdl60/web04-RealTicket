import { calculatePolygonCentroid } from '@/utils/svg.ts';
import { getPathD } from '@/utils/svg.ts';

import type { SectionCoordinate } from '@/type';

export const getSectionData = (section: SectionCoordinate) => {
  const { id, points } = section;
  const [textX, textY] = calculatePolygonCentroid(points);
  const d = getPathD(...points);
  return { id, textX, textY, pathD: d };
};
