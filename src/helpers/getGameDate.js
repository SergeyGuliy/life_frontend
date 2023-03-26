export const getGameDate = (date) => {
  const { monthCode, year } = date;
  return `${monthCode} ${year}`;
};
