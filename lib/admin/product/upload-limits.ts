/**
 * Keep this <= Server Actions body size limit from next.config.
 */
export const MAX_PRODUCT_IMAGE_BYTES = 25 * 1024 * 1024;

export function formatMaxProductImageSizeShort(): string {
  return `${MAX_PRODUCT_IMAGE_BYTES / (1024 * 1024)} MB`;
}

function formatFileSizeMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getProductImageOversizeMessage(file: File): string {
  return `Image must be ${formatMaxProductImageSizeShort()} or smaller. This file is ${formatFileSizeMb(file.size)}.`;
}
