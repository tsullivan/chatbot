import { sample } from 'lodash';

export function oneOf(fnArray) {
  const fn = sample(fnArray);
  return fn();
}
