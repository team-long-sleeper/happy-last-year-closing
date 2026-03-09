import { bffClient } from '@/lib/axios/instances';
import { GetPresignedURLReq, GetPresignedURLRes } from '@/types/uploads.type';

class UploadsService {
  async getPresignedURL(mimeType: GetPresignedURLReq): Promise<GetPresignedURLRes> {
    return await bffClient
      .post('/uploads/presign', { ...mimeType })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  }
}

const uploadsService = new UploadsService();

export default uploadsService;
