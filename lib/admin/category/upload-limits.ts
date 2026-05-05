/**
 * Max image size we allow before the browser sends the Server Action.
 * Keep at or below `serverActions` / `experimental.serverActions.bodySizeLimit`
 * in `next.config.ts` (multipart adds a little overhead).
 */
export const MAX_CATEGORY_IMAGE_BYTES = 25 * 1024 * 1024;

export function formatMaxCategoryImageSizeShort(): string {
  return `${MAX_CATEGORY_IMAGE_BYTES / (1024 * 1024)} MB`;
}

export function formatFileSizeMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getCategoryImageOversizeMessage(file: File): string {
  return `Image must be ${formatMaxCategoryImageSizeShort()} or smaller. This file is ${formatFileSizeMb(file.size)}.`;
}
