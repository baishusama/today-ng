export const getTodayTime = function(): number {
  return floorToDate(new Date());
};

export const floorToDate = function(time: any): number {
  const t = new Date(time);
  t.setHours(0, 0, 0, 0);
  return t.getTime();
};
