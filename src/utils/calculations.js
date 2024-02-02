export const calculateScore = (trueCount, jokerCount) => {
  const TRUE_POINT = 100 / 26;
  let totalPoint = trueCount * TRUE_POINT;
  totalPoint -= Math.min(jokerCount, totalPoint);
  return totalPoint;
};

export const calculateScoreWithTime = (mills) => {
  let sec = mills / 1000;
  let score = 3.85 - (sec * 3.85) / 11.5;
  return score < 0 ? 0 : score;
};
