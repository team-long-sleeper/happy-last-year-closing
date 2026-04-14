import { bffClient } from '@/lib/axios/instances';
import { UploadPicturesRes } from '@/types/uploads.type';

class UploadsService {
  async uploadPictures(files: { file: File; order: number }[]): Promise<UploadPicturesRes> {
    const formData = new FormData();
    files.forEach(({ file }) => formData.append('files', file));

    return await bffClient
      .post('/uploads/pictures', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

const uploadsService = new UploadsService();

export default uploadsService;
