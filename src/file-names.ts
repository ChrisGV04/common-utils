import slug from 'slug';

/**
 * Remove the extension from a string.
 *
 * @example
 * removeFilenameExt("my-file.txt")
 * // Output: "my-file"
 */
export function removeFilenameExt(name: string) {
  return `${name.substring(0, name.lastIndexOf('.'))}`;
}

/**
 * Utility that adds a suffix to a file name before the extension
 *
 * @example
 * addFilenameSuffix("my-file.txt", "-1")
 * // Output: "my-file-1.txt"
 */
export function addFilenameSuffix(name: string, suffix: string) {
  const extension = name.split('.').pop();
  return `${removeFilenameExt(name)}${suffix}.${extension}`;
}

/**
 * Utility to replace a file name extension
 *
 * @example
 * replaceExtension("my-file.png", "webp")
 * // Output: "my-file.webp"
 */
export function replaceFilenameExt(name: string, newExtension: string) {
  return `${removeFilenameExt(name)}.${newExtension}`;
}

/**
 * Utility function to sanitize a file name into a URL-safe version
 *
 * @example
 * sanitizeFilename("Welcome, This is a file.txt")
 * // Output: "welcome-this-is-a-file.txt"
 *
 * @throws When filename doesn't follow [char].[char] format
 */
export function sanitizeFilename(filename: string) {
  const parts = filename.split('.');
  const name = parts.slice(0, -1).join('-');
  const extension = parts.at(-1);

  if (!name || !extension) throw new Error(`(sanitizeFilename): Invalid file name: ${filename}`);

  return `${slug(name)}.${extension}`;
}

/**
 * Adds a -n with the next number to a name
 *
 * @example
 * incrementFilename("my-file.txt")
 * // Output: "my-file-1.txt"
 *
 * incrementFilename("my-file-1.txt")
 * // Output: "my-file-2.txt"
 */
export function incrementFilename(name: string) {
  const extension = name.split('.').pop();
  const baseFilename = removeFilenameExt(name);
  let incrementedName = baseFilename;
  const regex = /(.*)-(\d+)$/; // Finds -n at the end of the string
  const found = baseFilename.match(regex);
  if (found === null) {
    incrementedName += '-1';
  } else {
    const matchedName = found[1];
    const matchedNumber = found[2];
    const incremented = Number(matchedNumber) + 1;
    incrementedName = `${matchedName}-${incremented}`;
  }
  return `${incrementedName}.${extension}`;
}
