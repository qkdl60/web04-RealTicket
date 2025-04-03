export const calcRestCount = (headOrder: number | null, myOrder: number | null) => {
  if (headOrder === null || myOrder === null) return null;
  return headOrder - myOrder + 1;
};
