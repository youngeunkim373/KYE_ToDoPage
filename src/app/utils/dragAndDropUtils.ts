export const reorderInSameList = <T>({ list, startIndex, endIndex }: {
  list: T[];
  startIndex: number;
  endIndex: number;
}): T[] => {
  const newList = Array.from(list);
  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);
  return newList;
};