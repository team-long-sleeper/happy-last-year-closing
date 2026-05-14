import { bffClient } from '@/lib/axios/instances';
import { UploadPicturesRes } from '@/types/uploads.type';

class UploadsService {
  // 백엔드는 `files` 배열로 multipart 를 받는 구조 → 1장만 보낼 때도 같은 키 사용.
  // 백엔드 인터페이스 변경 없이 클라이언트에서만 장당 호출로 쪼갠다.
  private async uploadOne(file: File): Promise<{ key: string; iv: string }> {
    const formData = new FormData();
    formData.append('files', file);

    const response = await bffClient.post<UploadPicturesRes>('/uploads/pictures', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const item = response.data.uploads[0];
    if (!item) throw new Error('서버가 업로드 결과를 반환하지 않았어요.');
    return item;
  }

  // 장당 개별 POST 로 병렬 업로드.
  // Netlify Functions 10s 타임아웃 안에 들어오도록 한 요청 = 한 장 (압축 후 200~400KB) 만 처리.
  // Promise.allSettled 로 부분 실패를 잡고, 하나라도 실패하면 throw 해서
  // 기존 호출자 동작(전체 실패 시 throw)을 보존한다. 부분 성공 UX 는 후속 작업.
  async uploadPictures(files: { file: File; order: number }[]): Promise<UploadPicturesRes> {
    const results = await Promise.allSettled(files.map(({ file }) => this.uploadOne(file)));

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length > 0) {
      throw new Error(`${files.length}장 중 ${failed.length}장 업로드에 실패했어요.`);
    }

    const uploads = results
      .filter(
        (r): r is PromiseFulfilledResult<{ key: string; iv: string }> => r.status === 'fulfilled',
      )
      .map((r) => r.value);

    return { uploads };
  }
}

const uploadsService = new UploadsService();

export default uploadsService;
