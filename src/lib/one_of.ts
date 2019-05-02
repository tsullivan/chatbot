import { sample } from 'lodash';

type AnyFunction = () => any;

export function oneOf(fnArray: AnyFunction[]) {
  const fn = sample(fnArray);
  return fn();
}
