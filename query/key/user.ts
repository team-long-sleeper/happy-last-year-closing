export const profileKeys = {
  base: [{ scope: 'profile' }] as const,
};

export type UserProfileKeyType = typeof profileKeys.base;
