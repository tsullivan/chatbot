function roll(sides) {
  let effective = sides;
  if (typeof effective === 'string') {
    effective = effective.replace(/[^\d]/g, '');
  }

  const { floor, random } = Math;
  const result = floor(random() * effective) + 1;

  return {
    result,
    atLeast(checkNum) {
      return result >= checkNum;
    }
  };
}

module.exports = {
  roll
};
