import z from 'zod';

export const Tag = z.object({
  id: z.number(),
  label: z.string().min(1),
  color: z.string(),
});

export interface PostTagBody {
  label: string;
  color?: string;
}

export interface PostTagResponse {
  id: number;
  label: string;
  color: string;
  ownerUserId: string;
  createdAt: Date;
}

export type TagType = Omit<z.infer<typeof Tag>, 'id'>;
export type GetTagResponseType = TagType[];
