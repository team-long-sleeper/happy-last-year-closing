import z from 'zod';

export const User = z.object({
  id: z.string(),
  name: z.string(),
  profileImage: z.url(),
});

export type UserDataResponse = z.infer<typeof User>;
