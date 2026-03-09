import { PresignResponse } from '@/types/uploads.type';

export async function putUploads(presigned: PresignResponse, files: File[]) {
  if (presigned.uploads.length !== files.length) throw new Error('count mismatch');

  await Promise.all(
    presigned.uploads.map(async (u, i) => {
      const r = await fetch(u.uploadUrl, {
        method: 'PUT',
        body: files[i],
        headers: { 'Content-Type': u.mimeType },
      });
      if (!r.ok) throw new Error(`upload failed ${r.status}`);
    }),
  );

  return presigned.uploads.map((u) => u.key);
}
