export function formatting(target) {
  return target < 10 ? "0" + target : target;
}

export function secToTime(ms) {
  const sec = Math.floor(ms / 1000);
  return `${formatting(Math.trunc(sec / 60))}:${formatting(sec % 60)}`;
}

export function formatNumber(number) {
  return (+number).toFixed(2);
}

export function isNullOrWhitespace(input) {
  return !input || !input.trim();
}
