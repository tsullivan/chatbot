const { sample } = require('lodash');

function oneOf(fnArray) {
  const fn = sample(fnArray);
  return fn();
}

module.exports = { oneOf };
