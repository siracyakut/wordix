export const calculateScore = (trueCount, jokerCount) => {
  const TRUE_POINT = 100 / 26;
  let totalPoint = trueCount * TRUE_POINT;
  totalPoint -= Math.min(jokerCount, totalPoint);
  return totalPoint;
};
