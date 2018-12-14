export function roll(numSides) {
  const { floor, random } = Math;
  const result = floor(random() * numSides) + 1;

  return {
    result,
    is(checkNum) {
      return result === checkNum;
    },
    atLeast(checkNum) {
      return result >= checkNum;
    },
  };
}
