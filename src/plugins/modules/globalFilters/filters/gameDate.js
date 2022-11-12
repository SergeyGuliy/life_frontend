export const gameDate = date => {
  const { monthCode, year } = date;
  return `${monthCode} ${year}`;
};
