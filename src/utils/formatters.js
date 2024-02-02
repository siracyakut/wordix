export function formatting(target) {
  return target < 10 ? "0" + target : target;
}

export function secToTime(ms) {
  const sec = Math.floor(ms / 1000);
  return `${formatting(Math.trunc(sec / 60))}:${formatting(sec % 60)}`;
}

export function calculateScore(mills) {
  let sec = mills / 1000;
  let score = 3.85 - (sec * 3.85) / 11.5;
  return score < 0 ? 0 : score;
}

export function formatNumber(number) {
  return (+number).toFixed(2);
}

export function isNullOrWhitespace(input) {
  return !input || !input.trim();
}

export const findOrdinalNumber = (number, onlySuffix = false) => {
  if (typeof number !== "number" || isNaN(number)) {
    return null;
  }

  const lastDigit = number % 10;
  let suffix;

  if (number >= 11 && number <= 13) {
    suffix = "th";
  } else {
    switch (lastDigit) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
  }

  return onlySuffix ? suffix : number + suffix;
};
