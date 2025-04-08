export const parseSectionCoList = (stringifiedSectionCoList: string): SectionCoordinate[] => {
  const sectionCoList = JSON.parse(stringifiedSectionCoList);

  return sectionCoList;
};

type SectionCoordinate = {
  id: string;
  points: number[][];
};
