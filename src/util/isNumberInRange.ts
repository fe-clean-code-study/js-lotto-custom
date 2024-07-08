export function isNumberInRange({
  number,
  minRange,
  maxRange,
}: {
  number: number;
  minRange: number;
  maxRange?: number;
}): boolean {
  if (number < minRange) return false;

  if (maxRange && number > maxRange) return false;

  return true;
}
