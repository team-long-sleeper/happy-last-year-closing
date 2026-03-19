import { PresignResponse } from '@/types/uploads.type';

export async function putUploads(
  presigned: PresignResponse,
  images: { file: File; order: number }[],
) {
  if (presigned.uploads.length !== images.length) throw new Error('count mismatch');

  const result = await Promise.all(
    presigned.uploads.map(async (u, i) => {
      const r = await fetch(u.uploadUrl, {
        method: 'PUT',
        body: images[i].file,
        headers: { 'Content-Type': u.mimeType },
      });
      if (!r.ok) throw new Error(`upload failed ${r.status}`);

      return { key: u.key, order: images[i].order };
    }),
  );

  return result;
}
