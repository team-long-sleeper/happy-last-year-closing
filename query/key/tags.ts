export const tagsKeys = {
  base: [{ scope: 'tags' }] as const,
};

export type TagsKeyType = (typeof tagsKeys.base)[number];
