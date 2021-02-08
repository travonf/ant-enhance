import { eqProps } from 'ramda';

function shouldUpdate<P extends keyof T, T extends Record<string, any>>(prop: P) {
  return (prev: T, curr: T) => eqProps(prop as string, prev, curr);
}

export default shouldUpdate;
