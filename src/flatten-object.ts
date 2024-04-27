import { isRecord } from './is-record';

/**
 * Converts any object with nested objects into a flat object.
 *
 * @example
 * ```
 * {
 *  a: 1,
 *  b: {
 *    c: 1,
 *    d: [
 *      { e: 1, f: 1 },
 *      { g: 1, h: 1 },
 *    ],
 *  },
 * }
 * ```
 *
 * Gets converted into:
 * ```
 * {
 *  a: 1,
 *  'b.c': 1,
 *  'b.d.0.e': 1,
 *  'b.d.0.f': 1,
 *  'b.d.1.g': 1,
 *  'b.d.1.h': 1,
 * }
 * ```
 */
export function flattenObject(input: unknown, prefix = '', skipArrays = false): Record<string, any> {
  if (!isRecord(input)) throw new Error(`(flattenObject): Not an object: ${input}`);

  return Object.keys(input).reduce(
    (acc, key) => {
      const _prefix = prefix.length ? `${prefix}.${key}` : key;
      const value = input[key];

      if (Array.isArray(value)) {
        if (skipArrays) {
          acc[_prefix] = value;
          return acc;
        }

        // Flatten the array
        Object.assign(acc, flattenArray(value, _prefix, skipArrays));
        return acc;
      }

      // Object is already a primitive. Asign it
      if (!isRecord(value)) {
        acc[_prefix] = value;
        return acc;
      }

      // Flatten deeply nested objects
      Object.assign(acc, flattenObject(value, _prefix, skipArrays));

      return acc;
    },
    {} as Record<string, any>,
  );
}

/**
 * Converts an array into a flat record.
 *
 * @example
 * ["foo", 2024, null, undefined]
 * // Output: {"0": "foo", "1": 2024, "2": null }
 */
export function flattenArray(input: unknown, prefix = '', skipNestedArrays = false): Record<string, any> {
  if (!Array.isArray(input)) throw new Error(`(flattenArray): Not an array: ${input}`);

  const acc: Record<string, any> = {};

  // Also flatten the array
  for (let idx = 0; idx < input.length; idx++) {
    const value = input[idx];
    const _prefix = prefix.length ? `${prefix}.${idx}` : `${idx}`;

    if (Array.isArray(value) || isRecord(value)) {
      Object.assign(acc, flattenObject(value, _prefix, skipNestedArrays));
      continue;
    }

    acc[_prefix] = value;
  }

  return acc;
}
