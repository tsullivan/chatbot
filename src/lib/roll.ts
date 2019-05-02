export function roll(numSides: number) {
  const { floor, random } = Math;
  const result = floor(random() * numSides) + 1;

  return {
    result,
    is(checkNum: number) {
      return result === checkNum;
    },
    atLeast(checkNum: number) {
      return result >= checkNum;
    },
  };
}
