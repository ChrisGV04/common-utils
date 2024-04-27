import clone from 'just-clone';
import { isRecord } from './is-record';

/** Merge two objects deeply into the target */
export function deepMerge<T extends object, R extends object>(target: T, overrides?: R): T {
  const output = clone(target);

  if (isRecord(target) && isRecord(overrides)) {
    for (const key in overrides) {
      if (!Object.prototype.hasOwnProperty.call(overrides, key)) continue;

      if (isRecord(overrides[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: overrides[key] });
        } else {
          // @ts-ignore
          output[key] = deepMerge(target[key], overrides[key]);
        }
      } else {
        Object.assign(output, { [key]: overrides[key] });
      }
    }
  }

  return output;
}
